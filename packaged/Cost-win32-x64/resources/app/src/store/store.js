import Vue from 'vue'
import Vuex from 'vuex'
import module from './modules/reModule'

const {state: stateModule, getters, mutations} = module

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    cards: [],
    cardName: null,
    usd: 485
  },
  getters: {
    cards: state => state.cards,
    cardName: state => state.cardName,
    usd: state => state.usd
  },
  mutations: {
    addCard (state) {
      let {cards: c, cardName: cN} = state
      let id = cN !== null ? cN : c.length > 0 ? `card${parseInt((c[c.length - 1]).match(/\d+/)) + 1}` : 'card1'
      c.push(id)
      store.registerModule(id, {
        state: stateModule,
        getters,
        mutations,
        namespaced: true
      })
      state.cardName = null
    },
    removeCard (state, id) {
      let i = state.cards.indexOf(id)
      state.cards.splice(i, 1)
      store.unregisterModule(id)
    },
    updateCardName (state, val) {
      state.cardName = val
    },
    updateUsd (state, val) {
      state.usd = parseInt(val)
    }
  }
})
