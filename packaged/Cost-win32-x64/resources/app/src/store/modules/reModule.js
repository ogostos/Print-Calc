import f from '../../assets/helpers'

const state = () => {
  return { // needs to be function to make this module reusable
    job: { // state realted to Job.vue
      width: null,
      height: null,
      size: null,
      pages: null,
      qyali: false,
      fpz: false,
      chuzhoy: false,
      colorFront: {
        'c': false,
        'm': false,
        'y': false,
        'k': false,
        'p': false
      },
      colorBack: {
        'c': false,
        'm': false,
        'y': false,
        'k': false,
        'p': false
      }
    },
    paper: { // state realted to Paper.vue
      paperWidth: null,
      paperHeight: null,
      typeOfPaper: null,
      gramaj: null,
      tiraj: null,
      coefPaper: null,
      maxRange: null,
      klapan: 18,
      ezrer: 6,
      coefPrice: 1.8,
      otherCosts: 0
    },
    ndsToggle: false
  }
}

const getters = {
  job: state => state.job,
  paper: state => state.paper,
  width: state => state.job.width,
  height: state => state.job.height,
  pages: state => state.job.pages,
  size: state => state.job.size,
  gramaj: state => state.paper.gramaj,
  paperWidth: state => state.paper.paperWidth,
  paperHeight: state => state.paper.paperHeight,
  coefPaper: state => state.paper.coefPaper,
  typeOfPaper: state => state.paper.typeOfPaper,
  coefPrice: state => state.paper.coefPrice,
  tiraj: state => state.paper.tiraj,
  ndsToggle: state => state.ndsToggle,
  otherCosts: state => state.paper.otherCosts,
  maxRange: state => state.paper.maxRange,
  klapan: state => state.paper.klapan,
  ezrer: state => state.paper.ezrer,
  qyali (state, getters) {
    if (getters.noBackColor) {
      return false
    }
    return state.job.qyali
  },
  chuzhoy (state, getters) {
    if (getters.noBackColor) {
      return false
    }
    return state.job.chuzhoy
  },

  // getters related PAGES
  outOfSet (state, getters) { // add suggestion for pages. 52 bad, try 48 or 56
    return state.job.pages % getters.rasklad === 2 && state.job.pages > 2
  },

  // getters related COLORS
  noColorSelected (state, getters) {
    return getters.countColorsFront + getters.countColorsBack === 0
  },
  noBackColor (state, getters) {
    return getters.countColorsBack === 0
  },
  fourBackColor (state, getters) {
    return getters.countColorsBack === 4
  },
  fourFrontColor (state, getters) {
    return getters.countColorsFront === 4
  },
  countColorsFront (state) {
    let count = 0
    let ob = state.job.colorFront
    for (let p in ob) {
      if (ob[p] === true) {
        count++
      }
    }
    return count
  },
  countColorsBack (state) {
    let count = 0
    let ob = state.job.colorBack
    for (let p in ob) {
      if (ob[p] === true) {
        count++
      }
    }
    return count
  },
  colorsSelectedFront (state) {
    let arr = []
    let ob = state.job.colorFront
    for (let p in ob) {
      if (ob[p] === true) {
        arr.push(p)
      }
    }
    return arr
  },
  colorsSelectedBack (state) {
    let arr = []
    let ob = state.job.colorBack
    for (let p in ob) {
      if (ob[p] === true) {
        arr.push(p)
      }
    }
    return arr
  },

  // getters related to RASKLAD
  calculateRasklad (state) {
    let {width: w, height: h, pages: pg, fpz, chuzhoy: ch, qyali: q} = state.job
    let {paperWidth: pw, paperHeight: ph, klapan: kl, ezrer: ez} = state.paper
    if (pg >= 4) {
      return f.rasklad(w, h, ph, pw, q, kl, ez)
    } else if (pg === 2) {
      if (fpz || ch) {
        return {
          rasklad: f.maximumOst(w, h, ph, pw, kl, ez)
        }
      } else {
        return f.raskladTwoPages(w, h, ph, pw, q, kl, ez)
      }
    }
  },
  rasklad (state, getters) {
    if (getters.calculateRasklad) {
      return getters.calculateRasklad.rasklad
    }
    return null
  },
  svoyText (state, getters) {
    if (getters.calculateRasklad && getters.forma.formsCount.svoy) {
      return getters.calculateRasklad.text
    }
    return null
  },

  // getters related to FORMA
  forma (state, getters) {
    let {pages: p, width: w, height: h, fpz, chuzhoy: ch} = state.job
    let {tiraj: t, gramaj: gr} = state.paper
    let {rasklad: r, pricePaper: pp, priceForma: pf, countColorsFront: cF, countColorsBack: cB} = getters
    return f.forma(p, r, w, h, t, gr, fpz, ch, pf, pp, cF, cB)
  },
  chuzhoyCount (state, getters) {
    return getters.forma.formsCount.chuzhoy
  },
  svoyCount (state, getters) {
    return getters.forma.formsCount.svoy
  },
  noOborotCount (state, getters) {
    return getters.forma.formsCount.noOborot
  },
  chuzhoyPages (state, getters) {
    return getters.forma.forms.chuzhoy[0]
  },
  svoyPages (state, getters) {
    return getters.forma.forms.svoy.join('+')
  },
  noOborotPages (state, getters) {
    return getters.forma.forms.noOborot[0]
  },
  // getters related to PRICE
  priceForma (state) {
    let {paperWidth: pw} = state.paper
    if (!pw) {
      return null
    } else if (pw <= 520) {
      return 2000
    } else if (pw <= 720) {
      return 4000
    } else {
      return 8000
    }
  },
  sizeForma (state) {
    let {paperWidth: pw} = state.paper
    if (!pw) {
      return null
    } else if (pw <= 520) {
      return 'փոքր'
    } else if (pw <= 720) {
      return 'միջին'
    } else {
      return 'մեծ'
    }
  },
  pricePaper (state, getters, rootGetters) {
    return Math.round(rootGetters.usd * getters.coefPaper)
  },
  allFormas (state, getters) {
    let {svoyCount: sv, chuzhoyCount: ch, noOborotCount: noOb, countColorsFront: cF, countColorsBack: cB} = getters
    return ch * (cF + cB) + sv * Math.max(cF, cB) + noOb * cF
  },
  priladka (state, getters) {
    let {chuzhoyCount: ch, svoyCount: sv, noOborotCount: no} = getters
    return ch * 200 + sv * 100 + no * 100
  },
  list (state, getters) {
    let {tiraj: t} = state.paper
    let {forma: f} = getters
    return t * f.coefList
  },
  paperKg (state, getters) {
    let {gramaj: gr, paperWidth: pW, paperHeight: pH} = state.paper
    let {priladka: p, list: l} = getters
    return Math.ceil((l + p) * gr * pW * pH / 1000000000)
  },
  nds (state, getters) {
    return getters.ndsToggle ? 1.2 : 1
  },
  price (state, getters) {
    let {allFormas: allF, priceForma: pF, pricePaper: pP, paperKg: pKG, otherCosts: oC, nds} = getters
    let {coefPrice: cP} = state.paper
    let price = allF * pF + pKG * pP * cP + oC
    if (price < 50000) {
      return 50000 * nds
    }
    return Math.ceil(price * nds)
  },
  pricePerUnit (state, getters) {
    return Math.ceil(getters.price / state.paper.tiraj).toString().length === 1 ? (getters.price / state.paper.tiraj).toFixed(1) : Math.ceil(getters.price / state.paper.tiraj)
  },
  finalPrice (state, getters) {
    return state.paper.tiraj * getters.pricePerUnit
  },
  allValuesSet (state, getters) {
    let p = getters.paper
    let j = getters.job
    let {noColorSelected: noC, rasklad: r} = getters
    return !!(j.width) && !!(j.height) && !!(j.pages) && !noC && !!(p.paperWidth) && !!(p.paperHeight) &&
          !!(p.typeOfPaper) && !!(p.tiraj) && r
  }
}

const mutations = {
  // mutations related to Job.vue
  updateJob (state, ob) {
    Object.assign(state.job, ob)
  },
  updatePaper (state, ob) {
    Object.assign(state.paper, ob)
  },
  updateWidth (state, val) {
    state.job.width = val
  },
  updatePages (state, val) {
    state.job.pages = val
  },
  updateHeight (state, val) {
    state.job.height = val
  },
  updatePaperHeight (state, val) {
    state.paper.paperHeight = val
  },
  updatePaperWidth (state, val) {
    state.paper.paperWidth = val
  },
  updateCoefPaper (state, val) {
    state.paper.coefPaper = val
  },
  updateOtherCosts (state, val) {
    state.paper.otherCosts = val
  },
  updateCoefPrice (state, val) {
    state.paper.coefPrice = val
  },
  updateNdsToggle (state) {
    state.ndsToggle = !state.ndsToggle
  },
  updateMaxRange (state, val) {
    state.paper.maxRange = val
  },
  updateTiraj (state, val) {
    state.paper.tiraj = val
  },
  updateKlapan (state, val) {
    state.paper.klapan = val
  },
  updateEzrer (state, val) {
    state.paper.ezrer = val
  },
  updateTypeOfPaperCoefPaper (state, val) {
    while (val > 0) {
      val -= 360
    }
    let deg = Math.abs(val % 360)
    switch (deg) {
      case 0:
        state.paper.typeOfPaper = 'Կավճապատ փայլուն'
        state.paper.coefPaper = 1.6
        break
      case 30:
        state.paper.typeOfPaper = 'Կավճապատ անփայլ'
        state.paper.coefPaper = 1.6
        break
      case 60:
        state.paper.typeOfPaper = 'Օֆսեթ'
        state.paper.coefPaper = 1.3
        break
      case 90:
        state.paper.typeOfPaper = 'Ֆուդբորդ'
        state.paper.coefPaper = 1.5
        break
      case 120:
        state.paper.typeOfPaper = 'Ինքնակպչուն'
        state.paper.coefPaper = 4
        break
      case 150:
        state.paper.typeOfPaper = 'Պիտակային'
        state.paper.coefPaper = 1.6
        break
      case 180:
        state.paper.typeOfPaper = 'Ինքնապատճեն'
        state.paper.coefPaper = 100
        break
      case 210:
        state.paper.typeOfPaper = 'Ստվարաթուղթ'
        state.paper.coefPaper = 1.4
        break
      case 240:
        state.paper.typeOfPaper = 'Կրաֆտ'
        state.paper.coefPaper = 1.4
        break
      case 270:
        state.paper.typeOfPaper = 'Մետալիկ'
        state.paper.coefPaper = 6.25
        break
      case 300:
        state.paper.typeOfPaper = 'Խրոմոլյուքս'
        state.paper.coefPaper = 2
        break
      case 330:
        state.paper.typeOfPaper = 'Լյոն'
        state.paper.coefPaper = 2
        break
    }
  },
  fourPlusFour (state) {
    state.job.fpz = false
    let f = state.job.colorFront
    let b = state.job.colorBack
    f['c'] = true
    b['c'] = true
    setTimeout(() => { f['m'] = true; b['m'] = true }, 200)
    setTimeout(() => { f['y'] = true; b['y'] = true }, 400)
    setTimeout(() => { f['k'] = true; b['k'] = true }, 600)
    setTimeout(() => { f['p'] = false; b['p'] = false }, 800)
    // f['c'] = f['m'] = f['y'] = f['k'] = true
    // f['p'] = false
    // b['c'] = b['m'] = b['y'] = b['k'] = true
    // b['p'] = false
  },
  fourPlusZero (state) {
    state.job.fpz = true
    state.job.qyali = state.job.chuzhoy = false
    let f = state.job.colorFront
    let b = state.job.colorBack
    f['c'] = true
    b['c'] = false
    setTimeout(() => { f['m'] = true; b['m'] = false }, 200)
    setTimeout(() => { f['y'] = true; b['y'] = false }, 400)
    setTimeout(() => { f['k'] = true; b['k'] = false }, 600)
    setTimeout(() => { f['p'] = false; b['p'] = false }, 800)
    // f['c'] = f['m'] = f['y'] = f['k'] = true
    // f['p'] = false
    // b['c'] = b['m'] = b['y'] = b['k'] = b['p'] = false
  },
  colorFrontChange (state, id) {
    state.job.colorFront[id] = !state.job.colorFront[id]
  },
  colorBackChange (state, id) {
    state.job.colorBack[id] = !state.job.colorBack[id]
  },
  resetColors (state) {
    let ob = state.job
    let f = ob.colorFront
    let b = ob.colorBack
    f['c'] = f['m'] = f['y'] = f['k'] = f['p'] = false
    b['c'] = b['m'] = b['y'] = b['k'] = b['p'] = false
    ob.qyali = ob.chuzhoy = ob.fpz = false
    ob.width = ob.height = ob.pages = null
  },
  toggleQyali (state) {
    state.job.qyali = !state.job.qyali
  },
  toggleChuzhoy (state) {
    state.job.chuzhoy = !state.job.chuzhoy
  },

  // mutations related to Paper.vue
  tirajChangedMinus (state, val) {
    state.paper.tiraj -= val
    if (state.paper.tiraj < state.paper.maxRange / 2) {
      state.paper.maxRange = state.paper.tiraj * 2 > 1000 ? state.paper.tiraj * 2 : 1000
    }
  },
  tirajChangedPlus (state, val) {
    state.paper.tiraj += val
    if (state.paper.tiraj > state.paper.maxRange) {
      state.paper.maxRange = Math.ceil((state.paper.tiraj * 2) / 10) * 10
    }
  },
  resetPaper (state) {
    let ob = state.paper
    for (let p in ob) {
      if (p === 'klapan') ob[p] = 18
      else if (p === 'ezrer') ob[p] = 6
      else if (p === 'coefPrice') ob[p] = 1.8
      else if (p === 'otherCosts') ob[p] = 0
      else ob[p] = null
    }
    state.ndsToggle = false
  }
}

export default {
  state,
  getters,
  mutations
}
