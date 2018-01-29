const state = {
  admin: {
    klapan: 18,
    ezrer: 6,
    usd: 485,
    coefPaper: 1.8
  }
}

const getters = {
  admin: (state) => state.admin
}

const mutations = {
  updateAdmin (state, admin) {
    Object.assign(state.admin, admin)
  }
}

export default {
  state,
  getters,
  mutations
}
