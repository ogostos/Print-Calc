const state = {
  paper: {
    paperWidth: null,
    paperHeight: null,
    typeOfPaper: null,
    gramaj: null,
    tiraj: null,
    maxRange: 10000,
    coefPrice: 1.8
  }
}

const getters = {
  paper: state => state.paper
}

const mutations = {
  updatePaper (state, paper) {
    Object.assign(state.paper, paper)
  },
  tirajChanged (state, {value, id}) {
    if (id === 'minus') {
      state.paper.tiraj = state.paper.tiraj - value
    } else if (id === 'plus') {
      state.paper.tiraj = state.paper.tiraj + value
    }
    if (state.paper.tiraj >= state.paper.maxRange) {
      state.paper.maxRange *= 2
    } else if (state.paper.tiraj < state.paper.maxRange / 2) {
      state.paper.maxRange /= 2
    }
  },
  resetPaper (state) {
    let ob = state.paper
    for (let p in ob) {
      if (p !== 'maxRange' && p !== 'coefPrice') {
        ob[p] = null
      }
    }
  }
}

export default {
  state,
  getters,
  mutations
}
