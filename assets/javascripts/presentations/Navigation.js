import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

export default class Navigation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isSigned: false,
      isMenuShow: false
    }
  }

  handleUserMenu() {

  }

  render() {
    return (
      <div className="nav-container">
        <header className="nav-header">
          <a className="logo">
            <span style={{float: 'left', marginLeft: '103px', marginTop: '20px'}}>--alpha</span>
          </a>
        </header>

        <section className="nav-body">
          <div className="nav-body-wrap clearfix">
            <Link to="/puzzles" activeClassName="active">
              <FormattedMessage
                id='app.nav.menu.puzzles'
                defaultMessage="Puzzles Library"
              />
            </Link>
            <Link to="/games" activeClassName="active">
              <FormattedMessage
                id="app.nav.menu.games"
                defaultMessage="Games Library(Not Open)"
              />
            </Link>
          </div>
        </section>

        <footer className="nav-footer">
          <div className="nav-footer-wrap">
            <a href="#">
              <i className="fa fa-search"></i>
            </a>
          </div>
          <div className="nav-footer-wrap nav-question">
            <a href="#">
              <i className="fa fa-question-circle"></i>
            </a>
          </div>
          {/*
            !this.state.isSigned ?
            <div className='nav-sign'>
              <div className="nav-footer-wrap nav-signup">
                <Link to="/signup">
                  <FormattedMessage
                    id='app.nav.menu.signup'
                    defaultMessage="Sign Up"
                  />
                </Link>
              </div>
            </div>
            : null
          */}
        </footer>
      </div>
    )
  }
}

