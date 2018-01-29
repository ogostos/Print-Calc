<template>
  <div id="app">
    <div class="appcard">
      <card v-for="card in cards" :id="card" :key="card"></card>
    </div>
    <button v-if="false" @click="addCard" style="margin-top: 50px"> + NEW ONE</button>
    <input v-if="false" type="text" placeholder="name of job" v-model.lazy="cardName"/>
    <admin v-if="false"></admin>
  </div>
</template>

<script>
import Job from './components/Job'
import Paper from './components/Paper'
import Results from './components/Results'
import Admin from './components/Admin'
import Card from './components/Card'

import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'App',
  components: {
    Job,
    Paper,
    Results,
    Admin,
    Card
  },
  created () {
    this.$store.commit('addCard')
  },
  computed: {
    ...mapGetters([
      'cards'
    ]),
    cardName: {
      get () {
        return this.$store.getters.cardName
      },
      set (val) {
        this.$store.updateCardName(val)
      }
    }
  },
  methods: {
    ...mapMutations([
      'addCard'
    ])
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
  /*text-align: center;*/
  /*background: red;*/
  color: #2c3e50;
  /*margin-top: 20px;*/
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
     -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                supported by Chrome and Opera */
}
.appcard {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
