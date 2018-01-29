export default {
  volume (a, b, c, d, kl, ez) {
    return parseInt((c - kl) / a) * parseInt((d - ez) / b)
  },
  ost (a, b, c, d, kl, ez) {
    let ost = 0
    if ((c - kl) % a > b) {
      ost = parseInt((d - ez) / a)
    } else if ((d - ez) % b > a) {
      ost = parseInt((c - kl) / b)
    }
    return ost
  },
  volumeOst (a, b, c, d, kl, ez) {
    return this.volume(a, b, c, d, kl, ez) + this.ost(a, b, c, d, kl, ez)
  },
  maximum (a, b, c, d, kl, ez) {
    return Math.max(this.volume(a, b, c, d, kl, ez), this.volume(b, a, c, d, kl, ez))
  },
  maximumOst (a, b, c, d, kl, ez) {
    return Math.max(this.volumeOst(a, b, c, d, kl, ez), this.volumeOst(b, a, c, d, kl, ez))
  },
  raskladTwoPages (a, b, c, d, q, kl, ez) {
    let rasklad
    let text
    c = c - kl
    d = d - ez
    if (Math.floor((c * d) / (a * b)) === 1) {
      rasklad = 1
      text = 'chuzhoy'
    } else {
      let cs = c / 2
      let ds = d / 2
      let qs = q ? this.maximumOst(a, b, cs, d, 0, 0) : 0
      let ss = this.maximumOst(a, b, c, ds, 0, 0)
      if (qs > ss) {
        text = 'qyali'
      } else {
        text = 'sovorakan'
      }
      rasklad = Math.max(
        qs,
        ss
      ) * 2
    }
    return {
      rasklad: rasklad,
      text: text
    }
  },
  rasklad (a, b, c, d, q, kl, ez) {
    let rasklad
    let text
    c = c - kl
    d = d - ez
    let a2 = a * 2
    let cs = c / 2
    let ds = d / 2
    let qs = q ? Math.max(
        parseInt(cs / a) * parseInt(d / b),
        (parseInt(cs / b) * parseInt(d / a2)) * 2
      ) : 0
    let ss = Math.max(
      parseInt(c / b) * parseInt(ds / a),
      (parseInt(c / a2) * parseInt(ds / b)) * 2
      )
    rasklad = Math.max(
      qs,
      ss
    ) * 2
    if (qs > ss) {
      text = 'qyali'
    } else {
      text = 'sovorakan'
    }
    return {
      rasklad: rasklad,
      text: text
    }
  },
  forma (p, r, w, h, t, gr, fpz, ch, pf, pp, cf, cb) {
    let chuzhoy = []
    let svoy = []
    let noOborot = []
    let coefList = []
    let svoy1 = {
      forms: [],
      chuzhoy: false,
      otx: null,
      exp: null
    }
    let svoy2 = {
      forms: [],
      otx: null,
      exp: null
    }

    if (fpz && r) {
      noOborot.push(p > (r * 2) ? r * 2 : p)
      coefList.push(p / (r * 2))
    } else {
      let pageSvoy = p % (r * 2)
      let chuzhoyPages = parseInt(p / (r * 2))
      for (let i = 0; i < chuzhoyPages; i++) {
        chuzhoy.push(r * 2)
      }
      if (pageSvoy) {
        if (!ch) {
          let list1 = ((r * 2) % pageSvoy) / 2
          let otxod1 = (list1 * w * h * gr) / 1000000000 * t
          svoy1.otx = otxod1.toFixed()
          let expenses1 = otxod1 * pp
          svoy1.exp = expenses1
          if (pageSvoy > r) {
            svoy1.chuzhoy = true
          }
          svoy1.forms.push(pageSvoy)

          let rr = r
          let pS = pageSvoy
          if (pS < r) {
            while (pS < rr) {
              rr = rr / 2
            }
          }
          while (pS > rr && rr >= 4) {
            svoy2.forms.push(rr)
            pS = pS - rr
            rr = rr / 2
          }
          if (rr % pS === 0 && pS > 2) {
            svoy2.forms.push(pS)
          } else {
            svoy2 = null
          }
          if (svoy2) {
            let otxod2 = svoy2.forms.length - (svoy1.chuzhoy ? 2 : 1)
            svoy2.otx = otxod2
            let expenses2 = otxod2 * pf * Math.max(cf, cb)
            svoy2.exp = expenses2
            if (svoy1.exp > svoy2.exp) {
              svoy.push(...svoy2.forms)
            } else {
              svoy1.chuzhoy ? chuzhoy.push(...svoy1.forms) : svoy.push(...svoy1.forms)
            }
          } else {
            svoy1.chuzhoy ? chuzhoy.push(...svoy1.forms) : svoy.push(...svoy1.forms)
          }
          coefList = chuzhoy.length + svoy.map(i => i / (r * 2)).reduce((a, b) => a + b, 0)
        } else {
          chuzhoy.push(pageSvoy)
          coefList = pageSvoy / (r * 2)
        }
      } else if (r && p === 2) {
        chuzhoy.push(1)
        coefList = 1
      } else {
        coefList = chuzhoy.length + svoy.map(i => i / (r * 2)).reduce((a, b) => a + b, 0)
      }
    }
    return {
      forms: {
        chuzhoy,
        svoy,
        noOborot
      },
      formsCount: {
        chuzhoy: chuzhoy.length,
        svoy: svoy.length,
        noOborot: noOborot.length
      },
      svoy1,
      svoy2,
      coefList
    }
  }
}

