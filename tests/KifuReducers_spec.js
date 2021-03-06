import {kifus, kifu} from '../assets/javascripts/reducers/KifuReducers.js'
import * as types from '../assets/javascripts/constants/ActionTypes'

describe('Kifus reducer', () => {
  it('should return the initial state', () => {
    expect(
      kifus(undefined, {})
    ).toEqual(
      {
        isFetching: false,
        isFailure: false,
        data: []
      }
    )
  })

  it('should handle SELECT_KIFUS', () => {
    expect(
      kifus([], {
        type: types.FETCH_KIFUS_REQUEST,
        payload: {
          page: 1,
          per_page: 1
        }
      })
    ).toEqual(
      {
        isFetching: true,
        isFailure: false,
      }
    )

    expect(
      kifus(
        {
          isFetching: true,
          isFailure: false,
          data: []
        },
        {
          type: types.FETCH_KIFUS_SUCCESS,
          payload: {
            page: 1,
            per_page: 1,
            data: [{
              'id': 26879,
              'date':'2016-03-03T00:00:00.000Z',
              'title':'第55期日本十段战预选',
              'player_b_id':null,
              'player_w_id':null,
              'b_name':'彦坂直人',
              'b_rank':'九段',
              'w_name':'村松大树',
              'w_rank':'六段',
              'result':'黑中盘胜',
              'place':'',
              'komi':'6.5',
              'source':'sina',
              'content':'(\r\nTE[第55期日本十段战预选]\r\nRD[2016-03-03]\r\nPC[]\r\nTM[180]\r\nLT[60]\r\nLC[5]\r\nKO[6.5]\r\nRE[黑中盘胜]\r\nPB[彦坂直人]\r\nBR[九段]\r\nPW[村松大树]\r\nWR[六段]\r\nGK[1]\r\nTC[]\r\n\r\n;B[pd];W[dd];B[pq];W[dq];B[co];W[ck];B[qk];W[cp];B[jp];W[nc];B[pf];W[jd];B[cc];W[cd]\r\n;B[dc];W[fc];B[fb];W[gc];B[bd];W[be];B[bc];W[cf];B[ec];W[ed];B[ep];W[dp];B[do];W[eo]\r\n;B[bp];W[bq];B[eq];W[dr];B[dk];W[cl];B[dm];W[dl];B[el];W[fo];B[em];W[ek];B[dj];W[fk]\r\n;B[cj];W[cm];B[cn];W[bj];B[bi];W[bk];B[gl];W[ci];B[ei];W[di];B[ej];W[gk];B[bh];W[bn]\r\n;B[bo];W[bm];B[gm];W[gi];B[er];W[br];B[dh];W[al];B[fh];W[eg];B[gh];W[hh];B[gf];W[hg]\r\n;B[fe];W[fd];B[ie];W[je];B[if];W[ho];B[il];W[ge];B[he];W[gd];B[hf];W[jh];B[ef];W[dg]\r\n;B[cg];W[bg];B[ch];W[df];B[jf];W[fi];B[eh];W[kf];B[kg];W[jg];B[id];W[jc];B[ic];W[lf]\r\n;B[hb];W[jo];B[ij];W[jk];B[ik];W[ii];B[kk];W[kp];B[ki];W[kh];B[kq];W[jq];B[ip];W[iq]\r\n;B[hp];W[kr];B[io];W[gq];B[hq];W[hr];B[gp];W[fp];B[gr];W[fq];B[in];W[ir];B[lg];W[kj]\r\n;B[lj];W[li];B[mg];W[ji];B[lk];W[ni];B[mf];W[mj];B[oc];W[gb];B[ga];W[eb];B[fa];W[kb]\r\n;B[jb];W[ja];B[ib];W[ob];B[pb];W[od];B[pc];W[ld];B[le];W[ke];B[kc];W[me];B[lb];W[of]\r\n;B[og];W[pe];B[qe];W[oe];B[ph];W[qf];B[pg];W[qd];B[re];W[rc];B[rf];W[nb];B[qc];W[pa]\r\n;B[rd];W[qb];B[qd];W[lc];B[nl];W[nk];B[ok];W[mk];B[ml];W[oj];B[pk];W[jj];B[mh];W[mi]\r\n;B[go];W[fr];B[lq];W[jl];B[km];W[jm];B[jn];W[kl];B[ll];W[pi];B[qi];W[nq];B[mp];W[qq]\r\n;B[qp];W[pp];B[op];W[po];B[qr];W[rq];B[oq];W[rr];B[ro];W[rn];B[qn];W[qo];B[rm];W[rp]\r\n;B[sn];W[pr];B[or];W[qs];B[ag];W[fg];B[gg];W[ff];B[bf];W[ee];B[on];W[pj];B[qj];W[kd]\r\n;B[os];W[ps];B[rb];W[im];B[hm];W[ra];B[qa];W[lr];B[mq];W[qb];B[sc];W[mr];B[nr];W[fl]\r\n;B[fm];W[kn];B[lm];W[ko];B[dn];W[oo];B[no];W[ae];B[qa])',
              'created_at':'2016-03-03T19:08:23.405Z',
              'updated_at':'2016-03-03T19:08:23.405Z'
            }, {
              'id':26880,
              'date':'2016-03-03T00:00:00.000Z',
              'title':'第41期日本新人王战第1轮',
              'player_b_id':null,
              'player_w_id':null,
              'b_name':'谷口彻',
              'b_rank':'二段',
              'w_name':'姚智腾',
              'w_rank':'三段',
              'result':'黑胜5.5目',
              'place':'',
              'komi':'6.5',
              'source':'sina',
              'content':'(\r\nTE[第41期日本新人王战第1轮]\r\nRD[2016-03-03]\r\nPC[]\r\nTM[180]\r\nLT[60]\r\nLC[5]\r\nKO[6.5]\r\nRE[黑胜5.5目]\r\nPB[谷口彻]\r\nBR[二段]\r\nPW[姚智腾]\r\nWR[三段]\r\nGK[1]\r\nTC[]\r\n\r\n;B[qd];W[dd];B[pq];W[dp];B[fc];W[cf];B[lc];W[po];B[qm];W[qq];B[mq];W[pp];B[pr];W[np]\r\n;B[mp];W[mo];B[lo];W[ln];B[ko];W[mn];B[pj];W[fq];B[nq];W[kn];B[io];W[hn];B[in];W[im]\r\n;B[hm];W[il];B[ck];W[ec];B[fd];W[hd];B[ef];W[ch];B[hf];W[kd];B[ld];W[if];B[hg];W[ge]\r\n;B[fe];W[ie];B[cc];W[cd];B[eb];W[gf];B[bc];W[eh];B[cn];W[qh];B[oh];W[pf];B[od];W[qj]\r\n;B[qk];W[rk];B[pk];W[pi];B[rl];W[oi];B[rj];W[bo];B[bn];W[iq];B[gn];W[ho];B[hp];W[go]\r\n;B[ip];W[fo];B[co];W[hr];B[kq];W[le];B[mk];W[ri];B[qi];W[jp];B[jo];W[qj];B[sk];W[nj]\r\n;B[nk];W[kl];B[cp];W[me];B[nd];W[pc];B[pd];W[qc];B[ob];W[rd];B[re];W[rc];B[qf];W[oc]\r\n;B[nc];W[pb];B[nb];W[ra];B[of];W[pg];B[nf];W[lj];B[kf];W[ke];B[mj];W[mi];B[nh];W[ni]\r\n;B[lh];W[mh];B[lf];W[kh];B[lg];W[li];B[jg];W[ig];B[jh];W[hi];B[ii];W[ol];B[ok];W[rn]\r\n;B[qi];W[ne];B[oe];W[qj];B[qn];W[ro];B[qi];W[qr];B[lk];W[kj];B[hj];W[ih];B[ji];W[jj]\r\n;B[fh];W[hh];B[fj];W[ij];B[fg];W[cj];B[dg];W[dk];B[cg];W[bg];B[bh];W[bi];B[bf];W[ah]\r\n;B[be];W[ce];B[bd];W[eg];B[ff];W[df];B[jc];W[gi];B[fi];W[mf];B[mg];W[jf];B[dr];W[dq]\r\n;B[cr];W[er];B[hc];W[jq];B[kr];W[cq];B[bq];W[cl];B[kg];W[gj];B[eo];W[fn];B[gq];W[gr]\r\n;B[ep];W[eq];B[id];W[gg];B[om];W[ph];B[qs];W[rs];B[ps];W[jr];B[fl];W[op];B[mr];W[gl]\r\n;B[rr];W[rq];B[ss];W[bm];B[an];W[fm];B[bk];W[bl];B[dl];W[dm];B[el];W[ak];B[rh];W[qj]\r\n;B[on];W[nn];B[qi];W[ki];B[ng];W[si];B[rg];W[qj];B[sj];W[qi];B[kk];W[jk];B[ll];W[lm]\r\n;B[dc];W[kc];B[kb];W[do];B[jn];W[jm];B[ek];W[dj];B[ed];W[dh];B[en];W[pn];B[pm];W[dn]\r\n;B[em];W[qo];B[gd];W[oq];B[or];W[nm];B[nl];W[sh];B[he];W[hd];B[he];W[sg];B[gk];W[hk]\r\n;B[hf];W[fk];B[fp];W[cm];B[br];W[sf];B[qe];W[ks];B[ls];W[js];B[gk];W[kp];B[lp];W[hg]\r\n;B[gp];W[gm];B[md];W[je];B[sn];W[hd];B[he];W[rm];B[sm];W[jd];B[jb];W[am];B[bp];W[so]\r\n;B[sl];W[af];B[oo];W[no];B[se];W[ae];B[ad];W[ag];B[ei];W[di];B[sd];W[sc];B[fk];W[oa]\r\n;B[na];W[pa];B[es];W[fs];B[ds];W[sq])',
              'created_at':'2016-03-03T19:08:23.420Z',
              'updated_at':'2016-03-03T19:08:23.420Z'
            }]
          }
        }
      )
    ).toEqual(
      {
        isFetching: false,
        isFailure: false,
        data: [{
          'id':26879,
          'date':'2016-03-03T00:00:00.000Z',
          'title':'第55期日本十段战预选',
          'player_b_id':null,
          'player_w_id':null,
          'b_name':'彦坂直人',
          'b_rank':'九段',
          'w_name':'村松大树',
          'w_rank':'六段',
          'result':'黑中盘胜',
          'place':'',
          'komi':'6.5',
          'source':'sina',
          'content':'(\r\nTE[第55期日本十段战预选]\r\nRD[2016-03-03]\r\nPC[]\r\nTM[180]\r\nLT[60]\r\nLC[5]\r\nKO[6.5]\r\nRE[黑中盘胜]\r\nPB[彦坂直人]\r\nBR[九段]\r\nPW[村松大树]\r\nWR[六段]\r\nGK[1]\r\nTC[]\r\n\r\n;B[pd];W[dd];B[pq];W[dq];B[co];W[ck];B[qk];W[cp];B[jp];W[nc];B[pf];W[jd];B[cc];W[cd]\r\n;B[dc];W[fc];B[fb];W[gc];B[bd];W[be];B[bc];W[cf];B[ec];W[ed];B[ep];W[dp];B[do];W[eo]\r\n;B[bp];W[bq];B[eq];W[dr];B[dk];W[cl];B[dm];W[dl];B[el];W[fo];B[em];W[ek];B[dj];W[fk]\r\n;B[cj];W[cm];B[cn];W[bj];B[bi];W[bk];B[gl];W[ci];B[ei];W[di];B[ej];W[gk];B[bh];W[bn]\r\n;B[bo];W[bm];B[gm];W[gi];B[er];W[br];B[dh];W[al];B[fh];W[eg];B[gh];W[hh];B[gf];W[hg]\r\n;B[fe];W[fd];B[ie];W[je];B[if];W[ho];B[il];W[ge];B[he];W[gd];B[hf];W[jh];B[ef];W[dg]\r\n;B[cg];W[bg];B[ch];W[df];B[jf];W[fi];B[eh];W[kf];B[kg];W[jg];B[id];W[jc];B[ic];W[lf]\r\n;B[hb];W[jo];B[ij];W[jk];B[ik];W[ii];B[kk];W[kp];B[ki];W[kh];B[kq];W[jq];B[ip];W[iq]\r\n;B[hp];W[kr];B[io];W[gq];B[hq];W[hr];B[gp];W[fp];B[gr];W[fq];B[in];W[ir];B[lg];W[kj]\r\n;B[lj];W[li];B[mg];W[ji];B[lk];W[ni];B[mf];W[mj];B[oc];W[gb];B[ga];W[eb];B[fa];W[kb]\r\n;B[jb];W[ja];B[ib];W[ob];B[pb];W[od];B[pc];W[ld];B[le];W[ke];B[kc];W[me];B[lb];W[of]\r\n;B[og];W[pe];B[qe];W[oe];B[ph];W[qf];B[pg];W[qd];B[re];W[rc];B[rf];W[nb];B[qc];W[pa]\r\n;B[rd];W[qb];B[qd];W[lc];B[nl];W[nk];B[ok];W[mk];B[ml];W[oj];B[pk];W[jj];B[mh];W[mi]\r\n;B[go];W[fr];B[lq];W[jl];B[km];W[jm];B[jn];W[kl];B[ll];W[pi];B[qi];W[nq];B[mp];W[qq]\r\n;B[qp];W[pp];B[op];W[po];B[qr];W[rq];B[oq];W[rr];B[ro];W[rn];B[qn];W[qo];B[rm];W[rp]\r\n;B[sn];W[pr];B[or];W[qs];B[ag];W[fg];B[gg];W[ff];B[bf];W[ee];B[on];W[pj];B[qj];W[kd]\r\n;B[os];W[ps];B[rb];W[im];B[hm];W[ra];B[qa];W[lr];B[mq];W[qb];B[sc];W[mr];B[nr];W[fl]\r\n;B[fm];W[kn];B[lm];W[ko];B[dn];W[oo];B[no];W[ae];B[qa])',
          'created_at':'2016-03-03T19:08:23.405Z',
          'updated_at':'2016-03-03T19:08:23.405Z'
        }, {
          'id':26880,
          'date':'2016-03-03T00:00:00.000Z',
          'title':'第41期日本新人王战第1轮',
          'player_b_id':null,
          'player_w_id':null,
          'b_name':'谷口彻',
          'b_rank':'二段',
          'w_name':'姚智腾',
          'w_rank':'三段',
          'result':'黑胜5.5目',
          'place':'',
          'komi':'6.5',
          'source':'sina',
          'content':'(\r\nTE[第41期日本新人王战第1轮]\r\nRD[2016-03-03]\r\nPC[]\r\nTM[180]\r\nLT[60]\r\nLC[5]\r\nKO[6.5]\r\nRE[黑胜5.5目]\r\nPB[谷口彻]\r\nBR[二段]\r\nPW[姚智腾]\r\nWR[三段]\r\nGK[1]\r\nTC[]\r\n\r\n;B[qd];W[dd];B[pq];W[dp];B[fc];W[cf];B[lc];W[po];B[qm];W[qq];B[mq];W[pp];B[pr];W[np]\r\n;B[mp];W[mo];B[lo];W[ln];B[ko];W[mn];B[pj];W[fq];B[nq];W[kn];B[io];W[hn];B[in];W[im]\r\n;B[hm];W[il];B[ck];W[ec];B[fd];W[hd];B[ef];W[ch];B[hf];W[kd];B[ld];W[if];B[hg];W[ge]\r\n;B[fe];W[ie];B[cc];W[cd];B[eb];W[gf];B[bc];W[eh];B[cn];W[qh];B[oh];W[pf];B[od];W[qj]\r\n;B[qk];W[rk];B[pk];W[pi];B[rl];W[oi];B[rj];W[bo];B[bn];W[iq];B[gn];W[ho];B[hp];W[go]\r\n;B[ip];W[fo];B[co];W[hr];B[kq];W[le];B[mk];W[ri];B[qi];W[jp];B[jo];W[qj];B[sk];W[nj]\r\n;B[nk];W[kl];B[cp];W[me];B[nd];W[pc];B[pd];W[qc];B[ob];W[rd];B[re];W[rc];B[qf];W[oc]\r\n;B[nc];W[pb];B[nb];W[ra];B[of];W[pg];B[nf];W[lj];B[kf];W[ke];B[mj];W[mi];B[nh];W[ni]\r\n;B[lh];W[mh];B[lf];W[kh];B[lg];W[li];B[jg];W[ig];B[jh];W[hi];B[ii];W[ol];B[ok];W[rn]\r\n;B[qi];W[ne];B[oe];W[qj];B[qn];W[ro];B[qi];W[qr];B[lk];W[kj];B[hj];W[ih];B[ji];W[jj]\r\n;B[fh];W[hh];B[fj];W[ij];B[fg];W[cj];B[dg];W[dk];B[cg];W[bg];B[bh];W[bi];B[bf];W[ah]\r\n;B[be];W[ce];B[bd];W[eg];B[ff];W[df];B[jc];W[gi];B[fi];W[mf];B[mg];W[jf];B[dr];W[dq]\r\n;B[cr];W[er];B[hc];W[jq];B[kr];W[cq];B[bq];W[cl];B[kg];W[gj];B[eo];W[fn];B[gq];W[gr]\r\n;B[ep];W[eq];B[id];W[gg];B[om];W[ph];B[qs];W[rs];B[ps];W[jr];B[fl];W[op];B[mr];W[gl]\r\n;B[rr];W[rq];B[ss];W[bm];B[an];W[fm];B[bk];W[bl];B[dl];W[dm];B[el];W[ak];B[rh];W[qj]\r\n;B[on];W[nn];B[qi];W[ki];B[ng];W[si];B[rg];W[qj];B[sj];W[qi];B[kk];W[jk];B[ll];W[lm]\r\n;B[dc];W[kc];B[kb];W[do];B[jn];W[jm];B[ek];W[dj];B[ed];W[dh];B[en];W[pn];B[pm];W[dn]\r\n;B[em];W[qo];B[gd];W[oq];B[or];W[nm];B[nl];W[sh];B[he];W[hd];B[he];W[sg];B[gk];W[hk]\r\n;B[hf];W[fk];B[fp];W[cm];B[br];W[sf];B[qe];W[ks];B[ls];W[js];B[gk];W[kp];B[lp];W[hg]\r\n;B[gp];W[gm];B[md];W[je];B[sn];W[hd];B[he];W[rm];B[sm];W[jd];B[jb];W[am];B[bp];W[so]\r\n;B[sl];W[af];B[oo];W[no];B[se];W[ae];B[ad];W[ag];B[ei];W[di];B[sd];W[sc];B[fk];W[oa]\r\n;B[na];W[pa];B[es];W[fs];B[ds];W[sq])',
          'created_at':'2016-03-03T19:08:23.420Z',
          'updated_at':'2016-03-03T19:08:23.420Z'
        }]
      }
    )
  })
})
