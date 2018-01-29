<template>
  <div style="width:80%; margin-top: 20px;">
    <div @click="passOn" v-if="cardPass">
      <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px">
        <button @click="one">A4, 2 pages, 4+4</button>
        <button @click="two">17x24, 4+4</button>
        <button @click="three">20x21, 4+4</button>
      </div>
      <div style="text-align: center">
        <button>New from scratch</button>
      </div>
    </div>
    <div class="wrapper" v-if="jobPaperPass">
<!--       <span style="position:absolute; bottom:50px; left:400px; font-size: 30px">{{id}}</span> -->
      <div class="job box">
        <job :id="id"></job>
      </div>
      <div class="paper box">
        <paper :id="id"></paper>
      </div>
      <div class="results box" v-if="allValuesSet">
        <results :id="id"></results>
      </div>
      <div class="othercosts box" v-if="allValuesSet">
        <othercosts :id="id"></othercosts>
      </div>
      <button @click="removeCard($event.target.id)" :id="id"
      style="position: relative; top: 0px; right: 0px; font-size: 30px; display:none">
        X
      </button>
    </div>
  </div>
</template>

<script>
import Job from './Job'
import Paper from './Paper'
import Results from './Results'
import Othercosts from './AddToPrice'

import {mapMutations} from 'vuex'
import getters from '../store/modules/reModuleGetters'

const {allValuesSet} = getters

export default {
  props: ['id'],
  data () {
    return {
      jobPaperPass: false,
      resultsPass: false,
      adminPass: false,
      cardPass: true
    }
  },
  computed: {
    allValuesSet
  },
  components: {
    Job,
    Paper,
    Results,
    Othercosts
  },
  methods: {
    ...mapMutations([
      'removeCard'
    ]),
    passOn () {
      this.jobPaperPass = true
      this.cardPass = false
      this.$emit('passClicked')
    },
    one () {
      this.$store.commit(`${this.id}/updateJob`, {width: 210, height: 297, pages: 2})
      this.$store.commit(`${this.id}/updatePaper`, {paperHeight: 320, paperWidth: 450})
      this.$store.commit(`${this.id}/fourPlusFour`)
      this.$store.commit(`${this.id}/updateTypeOfPaperCoefPaper`, 0)
    },
    two () {
      this.$store.commit(`${this.id}/updateJob`, {width: 170, height: 240})
      this.$store.commit(`${this.id}/updatePaper`, {paperHeight: 500, paperWidth: 700})
      this.$store.commit(`${this.id}/fourPlusFour`)
      this.$store.commit(`${this.id}/updateTypeOfPaperCoefPaper`, -60)
    },
    three () {
      this.$store.commit(`${this.id}/updateJob`, {width: 200, height: 210, qyali: true})
      this.$store.commit(`${this.id}/updatePaper`, {paperHeight: 450, paperWidth: 640})
      this.$store.commit(`${this.id}/fourPlusFour`)
      this.$store.commit(`${this.id}/updateTypeOfPaperCoefPaper`, -30)
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: grid;
  /*border: 2px solid #2d2d2d;*/
  overflow: visible;
  position: relative;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 201px 460px auto;
  background-color: #fff;
  grid-gap: 15px;
  grid-template-areas: 
    "job results"
    "paper results"
    ". othercosts"
} 
.box {
  border: 1px dashed grey;
  padding: 10px;
  /*background: #2d2d2d;*/
}
.job {
  grid-area: job;
  /*border: 1px dashed black; */
  border-top-left-radius: 20px;
}
.paper {
  grid-area: paper;
  border-bottom-left-radius: 20px;
}
.results {
  grid-area: results;
  background: #2d2d2d;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border: none;
}
.othercosts {
  grid-area: othercosts;
  border: none;
}   

</style>
