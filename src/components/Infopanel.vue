<template>
  <div>
    <div>
      <label>Pages</label> 
      <input :value="job.pages" disabled="true" />
    </div>
    <div>
      <labels v-for="(value, key) in newJob" :value="value" :label="key" :key="key"></labels>
      <div style="padding: 20px; border: 1px solid black">
        <labels v-for="(value, key) in forma.svoy1" :value="value" :label="key" :key="key"></labels>
      </div>
      <div style="padding: 20px; border: 1px solid black">
        <labels v-for="(value, key) in forma.svoy2" :value="value" :label="key" :key="key"></labels>
        <span v-if="!forma.svoy2"> Cannot print svoy pages via svoy II method </span>
      </div>
    </div>
  </div>  
</template>

<script>
  import Labels from './Label'
  import getters from '../store/modules/reModuleGetters'
  // import mutations from '../store/modules/reModuleMutations'

  const {job, paper, pricePaper, paperKg, forma, colorsSelectedFront, colorsSelectedBack, allFormas} = getters
  // const {updatePaper, updateJob} = mutations

  export default {
    props: ['id'],
    components: {
      Labels
    },
    computed: {
      job,
      paper,
      pricePaper,
      paperKg,
      forma,
      colorsSelectedFront,
      colorsSelectedBack,
      allFormas,
      newJob () {
        let ob1 = JSON.parse(JSON.stringify(this.job))
        delete ob1.colorFront
        delete ob1.colorBack
        let ob2 = JSON.parse(JSON.stringify(this.paper))
        delete ob2.maxRange
        delete ob2.klapan
        delete ob2.ezrer
        delete ob2.coefPaper
        delete ob2.coefPrice
        let ob3 = {
          colorsFront: this.colorsSelectedFront.join(' + '),
          colorsBack: this.colorsSelectedBack.join(' + '),
          allFormas: this.allFormas,
          'թուղթ կգ': this.paperKg,
          'price of paper': `${this.pricePaper} dram`
        }
        return Object.assign({}, ob1, ob2, ob3)
      }
    }
    // methods: {
    //   updatePaper,
    //   updateJob
    // }
  }
</script>
