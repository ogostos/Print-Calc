<template>
  <div>
    <input type="number" v-model="usd" />
    <infopanel v-for="card in cards" :id="card" :key="card"></infopanel>
  </div>  
</template>

<script>
  import Labels from './Label'
  import Infopanel from './Infopanel'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      Labels,
      Infopanel
    },
    computed: {
      ...mapGetters([
        'cards'
      ]),
      usd: {
        get () {
          return this.$store.getters.usd
        },
        set (val) {
          this.$store.commit('updateUsd', val)
        }
      }
    }
  }
</script>
