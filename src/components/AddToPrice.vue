<template>
  <div class="other-costs">
    <button @click="createField" style="margin-bottom: 10px">+այլ ծաղսեր</button>
    <button @click="reset" class="other-costs-reset">X</button>
    <div v-for="n in addToPrice" :class="'other-costs-inputs' + id" @change="updateOtherCosts">
      <input type="text" class="other-costs-text" placeholder="անվանում">
      <input type="number" class="other-costs-number value" placeholder="գումար" step="1000" min="0">
      <input type="number" class="other-costs-number tiraj" @change="updateTirajOtherCosts" placeholder="տպաքանակ" step="1" min="0">
      <input type="number" class="other-costs-number list" @change="updateListOtherCosts" placeholder="լիստ" step="10" min="0">
    </div>
  </div>  
</template>

<script>
  import getters from '../store/modules/reModuleGetters'

  const {tiraj, list} = getters
  export default {
    props: ['id'],
    data () {
      return {
        addToPrice: 0
      }
    },
    computed: {
      tiraj,
      list
    },
    methods: {
      createField () {
        this.addToPrice++
      },
      reset () {
        this.addToPrice = 0
        this.$store.commit(`${this.id}/updateOtherCosts`, 0)
      },
      updateTirajOtherCosts (e) {
        console.log(this.tiraj)
        e.target.value = this.tiraj * e.target.value
      },
      updateListOtherCosts (e) {
        console.log(this.list)
        e.target.value = this.list * e.target.value
      },
      updateOtherCosts () {
        let all = document.querySelectorAll('[class^="other-costs-number"]')
        let val = [...all].reduce((a, b) => a + (b.value ? parseInt(b.value) : 0), 0)
        this.$store.commit(`${this.id}/updateOtherCosts`, val)
      }
    }
  }
</script>
<style scoped>
  .other-costs-reset {
    position: absolute;
    top: 0;
    right: 0;
  }
  .other-costs > button {
    font-size: 15px; 
  }
  .other-costs {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  [class^="other-costs-inputs"] {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }
  .other-costs-number {
    background: none;
    outline: none;
    width: 50%;
    font-size: 18px;
    border: none;
    text-align: center;
  }
  .other-costs-number.tiraj {
    width: 125px;
  }
  .other-costs-number.list, .other-costs-number.value {
    width: 100px;
  }
  .other-costs-text {
    background: none;
    outline: none;
    width: 50%;
    border: none;
    border-bottom: 1px dashed purple;
    font-size: 18px;
    text-align: center;
  }
</style>
