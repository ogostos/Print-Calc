const state = {
  job: {
    width: null,
    height: null,
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
  }
}

const getters = {
  job: state => state.job,
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
  }
}

const mutations = {
  updateJob (state, job) {
    Object.assign(state.job, job)
  },
  fourPlusFour (state) {
    state.job.fpz = false
    let f = state.job.colorFront
    let b = state.job.colorBack
    f['c'] = f['m'] = f['y'] = f['k'] = true
    f['p'] = false
    b['c'] = b['m'] = b['y'] = b['k'] = true
    b['p'] = false
  },
  fourPlusZero (state) {
    state.job.fpz = true
    state.job.qyali = state.job.chuzhoy = false
    let f = state.job.colorFront
    let b = state.job.colorBack
    f['c'] = f['m'] = f['y'] = f['k'] = true
    f['p'] = false
    b['c'] = b['m'] = b['y'] = b['k'] = b['p'] = false
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
  }
}

export default {
  state,
  getters,
  mutations
}
