export default {
  updateJob (ob) {
    this.$store.commit(`${this.id}/updateJob`, ob)
  },
  updatePaper (ob) {
    this.$store.commit(`${this.id}/updatePaper`, ob)
  },
  updateCoefPaper (val) {
    this.$store.commit(`${this.id}/updateCoefPaper`, val)
  },
  updateWidth (val) {
    this.$store.commit(`${this.id}/updateWidth`, val)
  },
  updatePages (val) {
    this.$store.commit(`${this.id}/updatePages`, val)
  },
  updatePaperWidth (val) {
    this.$store.commit(`${this.id}/updatePaperWidth`, val)
  },
  updateOtherCosts (val) {
    this.$store.commit(`${this.id}/updateOtherCosts`, val)
  },
  updateNdsToggle (val) {
    this.$store.commit(`${this.id}/updateNdsToggle`, val)
  },
  updatePaperHeight (val) {
    this.$store.commit(`${this.id}/updatePaperHeight`, val)
  },
  updateHeight (val) {
    this.$store.commit(`${this.id}/updateHeight`, val)
  },
  updateCoefPrice (val) {
    document.querySelector('.coef .coef-bar').style.width = Math.round(val / 4 * 100) + '%' // add classname related to card!!!!!!! to differ elems
    this.$store.commit(`${this.id}/updateCoefPrice`, val)
  },
  updateTypeOfPaperCoefPaper (val) {
    this.$store.commit(`${this.id}/updateTypeOfPaperCoefPaper`, val)
  },
  updateTiraj (val) {
    this.$store.commit(`${this.id}/updateTiraj`, val)
  },
  updateMaxRange (val) {
    this.$store.commit(`${this.id}/updateMaxRange`, val)
  },
  updateKlapan (val) {
    this.$store.commit(`${this.id}/updateKlapan`, val)
  },
  updateEzrer (val) {
    this.$store.commit(`${this.id}/updateEzrer`, val)
  },
  fourPlusFour () {
    this.$store.commit(`${this.id}/fourPlusFour`)
  },
  fourPlusZero () {
    this.$store.commit(`${this.id}/fourPlusZero`)
  },
  colorFrontChange (id) {
    this.$store.commit(`${this.id}/colorFrontChange`, id)
  },
  colorBackChange (id) {
    this.$store.commit(`${this.id}/colorBackChange`, id)
  },
  resetColors (event) {
    let el = event.currentTarget
    el.classList.add('success')
    setTimeout(() => el.classList.remove('success'), 1200)
    this.$store.commit(`${this.id}/resetColors`)
  },
  toggleQyali () {
    this.$store.commit(`${this.id}/toggleQyali`)
  },
  toggleChuzhoy () {
    this.$store.commit(`${this.id}/toggleChuzhoy`)
  },
  tirajChangedMinus (val) {
    this.$store.commit(`${this.id}/tirajChangedMinus`, val)
  },
  tirajChangedPlus (val) {
    this.$store.commit(`${this.id}/tirajChangedPlus`, val)
  },
  resetPaper () {
    let el = event.currentTarget
    el.classList.add('success')
    setTimeout(() => el.classList.remove('success'), 1200)
    Array.from(document.getElementsByClassName('floating')).forEach(x => x.classList.remove('floating-active')) // add classname related to card!!!!!!! to differ elems
    this.currentDegree = 0
    document.querySelector(`.carousel${this.id}`).style.transform = 'rotateY(0deg)'
    document.querySelector('.coef .coef-bar').style.width = Math.round(1.8 / 4 * 100) + '%' // add classname related to card!!!!!!! to differ elems
    document.querySelector('.fab').classList.remove('fab-active') // add classname related to card!!!!!!! to differ elems
    this.$store.commit(`${this.id}/resetPaper`)
  }
}
