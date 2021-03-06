import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { LETTERS, LETTERS_SGF, NUMBERS } from '../constants/Go'
import Piece from '../components/piece'
import Sgf from '../components/sgf'
import Cross from '../components/cross'

import Paper from 'material-ui/Paper'

import getMuiTheme from 'material-ui/styles/getMuiTheme'

export default class Board extends Component {

  constructor(props) {
    super(props)
    this.state = {
      grid: 19,
      sgf: new Sgf({}),
      currentCoord: 'None',
      currentTurn: 1,
      step: 0,
      size: this.props.size
    }
    this.currentTurn = 1
    this._kifuArray = []
    this.step = 1
    this.clearKifuArray()
  }

  //Set default theme to pass the test
  getChildContext() {
    return { muiTheme: getMuiTheme() }
  }

  nextStep(e) {
    this.setState({step: this.state.step + 1}, () => {
      let {x, y, posX, posY, ki} = this.getCoordByStep(this.state.step)
      if (this.state.step > 1) {
        let {posX, posY, ki} = this.getCoordByStep(this.state.step - 1)
        this.drawPiece(posX, posY, ki, false)
      }
      this._liberty = 0
      this._recursionPath = []
      this.move(x, y, posX, posY, ki, true)
    })
  }

  moveTo(step) {
    this.setState({step: step}, () => {
      this.markCurrentPiece()
    })
  }

  move(x, y, posX, posY, ki, isMarked) {
    if (this.canMove(x, y, ki)) {
      this._kifuArray[x][y] = ki
      this.drawPiece(posX, posY, ki, isMarked)
      this.execPonnuki(x, y, -ki)
    }
  }

  markCurrentPiece() {
    if (this.state.step > 0) {
      let {x, y, posX, posY, ki} = this.getCoordByStep(this.state.step)
      this.drawPiece(posX, posY, ki, true)
    }
  }

  getCoordByStep(step) {
    let steps = this.props.kifu.data.steps.split(';')
    let str = steps[step - 1]
    let ki = str[0] === 'B' ? 1 : -1
    let pos = /\[(.*)\]/.exec(str)[1]
    let x = LETTERS_SGF.indexOf(pos[0])
    let y = LETTERS_SGF.indexOf(pos[1])
    let posX = (x + 1) * this.size
    let posY = (y + 1) * this.size
    return {x, y, posX, posY, ki}
  }

  clearKifuArray() {
    this._kifuArray = []
    while(this._kifuArray.push(new Array(19).fill(0)) < 19) { }
  }

  draw() {
    this._boardCtx.beginPath()
    for(let i = 1;i <= this.state.grid; i++) {
      this._boardCtx.moveTo(i * this.size, this.size)
      this._boardCtx.lineTo(i * this.size, this.state.grid * this.size)
      this._boardCtx.moveTo(this.size, i * this.size)
      this._boardCtx.lineTo(this.state.grid * this.size, i * this.size)
    }
    this._boardCtx.stroke()
    let dot_size = 3
    if (this.state.grid == 19) {
      [4, 16, 10].forEach((i) => {
        [4, 16, 10].forEach((j) => {
          this._boardCtx.beginPath()
          this._boardCtx.arc(this.size * i, this.size * j, dot_size, 0, 2 * Math.PI, true)
          this._boardCtx.fill()
        })
      })
    }
  }

  canMove(i, j, ki) {
    if (this._kifuArray[i][j] != 0) {
      return false
    }

    this._kifuArray[i][j] = ki
    let {liberty, recursionPath} = this.calcLiberty(i, j, ki)
    if (this.canPonnuki(i, j, -ki)) {
      this._kifuArray[i][j] = 0
      return true
    }
    if (this.canPonnuki(i, j, ki)) {
      this._kifuArray[i][j] = 0
      return false
    }
    if (liberty === 0) {
      this._kifuArray[i][j] = 0
      //console.log('此位置不能放棋子')
      return false
    }
    this._kifuArray[i][j] = 0
    return true
  }

  drawPiece(x, y, type, isMarked) {
    let realPos = this.convertPosToRealPos(x, y)
    let coord_sgf = this.convertPosToSgfCoord(x, y, this.size)
    let piece = new Piece(
      realPos.x,
      realPos.y,
      this.size / 2 - 2,
      type,
      isMarked,
    )
    piece.draw(this._pieceCtx)

    this.step++
    this.currentTurn = -this.currentTurn
  }

  removePiece(coord) {
    let realPos = this.convertCoordToRealPos(coord)
    let {i, j} = this.convertCoordToIndex(coord)
    this._kifuArray[i][j] = 0
    let piece = new Piece()
    piece.x = realPos.x
    piece.y = realPos.y
    piece.remove(this._pieceCtx, this.size)
  }

  convertPosToCoord(x, y) {
    let letter = LETTERS[Math.round((x - this.size) / this.size)]
    let number = NUMBERS[Math.round((y - this.size) / this.size)]
    return `${letter}${number}`
  }

  convertPosToSgfCoord(x, y, size) {
    let letter = LETTERS_SGF[Math.round((x - size) / size)]
    let number = LETTERS_SGF[Math.round((y - size) / size)]
    return `${letter}${number}`
  }

  convertCoordToPos(coord) {
    let results = []
    let {i, j} = this.convertCoordToIndex(coord)
    results[0] = (i + 1) * this.size
    results[1] = (j + 1) * this.size
    return {
      x: results[0],
      y: results[1]
    }
  }

  convertPosToRealPos(x, y) {
    //console.log(`x: ${x}, y: ${y}`)
    let letter = LETTERS[Math.round((x - this.size) / this.size)]
    let number = NUMBERS[Math.round((y - this.size) / this.size)]

    let results = []
    let {i, j} = this.convertCoordToIndex(`${letter}${number}`)
    //console.log(`rx: ${(i+1) * this.size}, ry: ${(j+1) * this.size}`)
    return {
      x: (i + 1) * this.size,
      y: (j + 1) * this.size
    }
  }

  convertCoordToRealPos(coord) {
    let pos = this.convertCoordToPos(coord)
    let realPos = this.convertPosToRealPos(pos.x, pos.y)
    return realPos
  }

  convertCoordToIndex (coord) {
    let letter = coord.charAt(0)
    let number = coord.slice(1)
    let i = LETTERS.indexOf(letter)
    let j = NUMBERS.indexOf(parseInt(number))
    return {i, j}
  }

  convertIndexToCoord(i, j) {
    return `${LETTERS[i]}${NUMBERS[j]}`
  }

  calcBlackOrWhite(x, y) {
    return this._kifuArray[x][y]
  }

  _calcLibertyCore(x, y, ki) {
    if (x >= 0 && x < this.state.grid && y >= 0 && y < this.state.grid) {
      if (this._kifuArray[x][y] == ki && !this._recursionPath.includes(`${LETTERS[x]}${NUMBERS[y]}`)) {
        this._recursionPath.push(`${LETTERS[x]}${NUMBERS[y]}`)
        this._calcLibertyCore(x - 1, y, ki)
        this._calcLibertyCore(x + 1, y, ki)
        this._calcLibertyCore(x, y - 1, ki)
        this._calcLibertyCore(x, y + 1, ki)
      }
      else if(this._kifuArray[x][y] == 0) {
        this._liberty++
      }
    }
  }

  calcLiberty(x, y, ki) {
    this._liberty = 0
    this._recursionPath = []

    if (x < 0 || y < 0 || x > this.state.grid - 1 || y > this.state.grid - 1) {
      return {
        liberty: 4,
        recursionPath: []
      }
    }

    if (this._kifuArray[x][y] == 0) {
      return {
        liberty: 4,
        recursionPath: []
      }
    }
    this._calcLibertyCore(x, y, ki)
    //console.log(this._liberty)
    //console.log(this._recursionPath)
    return {
      liberty: this._liberty,
      recursionPath: this._recursionPath
    }
  }

  execPonnuki(i, j, ki) {
    let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(i, j - 1, ki)
    let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(i, j + 1, ki)
    let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(i - 1, j, ki)
    let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(i + 1, j, ki)
    //console.log(`up: ${libertyUp}, down: ${libertyDown}, left: ${libertyLeft}, right: ${libertyRight}`)
    if (libertyUp === 0) {
      recursionPathUp.forEach((i) => {
        this.removePiece(i)
      })
    }
    if (libertyDown === 0) {
      recursionPathDown.forEach((i) => {
        this.removePiece(i)
      })
    }
    if (libertyLeft === 0) {
      recursionPathLeft.forEach((i) => {
        this.removePiece(i)
      })
    }
    if (libertyRight === 0) {
      recursionPathRight.forEach((i) => {
        this.removePiece(i)
      })
    }
  }

  canPonnuki(i, j, ki) {
    let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(i, j - 1, ki)
    let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(i, j + 1, ki)
    let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(i - 1, j, ki)
    let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(i + 1, j, ki)
    //console.log(`canup: ${libertyUp}, candown: ${libertyDown}, canleft: ${libertyLeft}, canright: ${libertyRight}`)
    if (libertyUp === 0 && recursionPathUp.length > 0) {
      return true
    }
    if (libertyDown === 0 && recursionPathDown.length > 0) {
      return true
    }
    if (libertyLeft === 0 && recursionPathLeft.length > 0) {
      return true
    }
    if (libertyRight === 0 && recursionPathRight.length > 0) {
      return true
    }
    //let coord = this.convertIndexToCoord(i, j);
    //console.log(`coord: ${coord}`);
    //console.log(`recursionPathUp: ${recursionPathUp}, recursionPathDown: ${recursionPathDown}, recursionPathLeft: ${recursionPathLeft}, recursionPathDown: ${recursionPathDown}`);
    return false
  }

  showCross(coord, color) {
    let results = this.convertCoordToPos(coord, this.size)
    let cross = new Cross()
    cross.x = results.x
    cross.y = results.y
    cross.size = 5
    cross.color = color
    cross.draw(this._crossCtx)
  }

  render() {
    //<canvas id="top_layer" ref="top_layer" ref={(ref) => this.topLayer = ref}></canvas>
    return (
      <Paper>
        <div className="board" ref="board">
          <canvas id="board_layer" ref={(ref) => this.boardLayer = ref }></canvas>
          {(() => {
            if (this.props.editable === 'true') {
              return <canvas id= "cross_layer" ref={(ref) => this.crossLayer = ref}></canvas>
            }
          })()}
          <canvas id="piece_layer" ref="piece_layer" ref={(ref) => this.pieceLayer = ref}></canvas>
          <canvas id="top_layer" onClick={this.nextStep.bind(this)} ref="top_layer" ref={(ref) => this.topLayer = ref }></canvas>
        </div>
      </Paper>
    )
  }


  drawBoardWithResize() {
    //TODO: This is need to refactor
    this.clearKifuArray()
    //let boardWidth = this.refs.board.parentElement.parentElement.offsetHeight / 20 * 18
    setTimeout(() => {
      let boardWidth = 0
      if (screen.width > screen.height) {
        boardWidth = window.innerHeight - 60
      } else {
        boardWidth = window.innerWidth
      }
      this.size =  boardWidth / 20
      this._boardCtx = this.boardLayer.getContext('2d')
      this._pieceCtx = this.pieceLayer.getContext('2d')
      this.refs.board.style.height = boardWidth + 'px'
      this.refs.board.style.width = boardWidth + 'px'
      this.refs.board.parentElement.style.height = boardWidth + 'px'
      this.refs.board.parentElement.style.width = boardWidth + 'px'
      this.boardLayer.width
      = this.boardLayer.height
      = this.pieceLayer.width
      = this.pieceLayer.height
      = boardWidth
      this.boardLayer.style.position
      = this.pieceLayer.style.position
      = 'absolute'
      this.topLayer.width
      = this.topLayer.height
      = boardWidth
      this.topLayer.style.position
      = 'absolute'
      this.drawBoard()
      this.markCurrentPiece()
    }, 0)
  }

  drawBoard() {
    this._pieceCtx.clearRect(0, 0, this.pieceLayer.width, this.pieceLayer.height)
    this._boardCtx.clearRect(0, 0, this.boardLayer.width, this.boardLayer.height)
    this.draw()
    for (let i = 1; i <= this.state.step; i++) {
      let {x, y, posX, posY, ki} = this.getCoordByStep(i)
      this.move(x, y, posX, posY, ki)
    }
  }

  componentDidUpdate() {
    this.drawBoardWithResize()
  }

  componentDidMount() {
    window.addEventListener('resize', this.drawBoardWithResize.bind(this), false)
    this.drawBoardWithResize()
    this.props.setBoard(this)
  }

  componentUnmount() {
    window.removeEventListener('resize', this.drawBoardWithResize.bind(this), false)
  }
}

Board.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}
