export default {
  job () {
    return this.$store.getters[`${this.id}/job`]
  },
  paper () {
    return this.$store.getters[`${this.id}/paper`]
  },
  coefPaper () {
    return this.$store.getters[`${this.id}/coefPaper`]
  },
  width () {
    return this.$store.getters[`${this.id}/width`]
  },
  pages () {
    return this.$store.getters[`${this.id}/pages`]
  },
  size () {
    return this.$store.getters[`${this.id}/size`]
  },
  height () {
    return this.$store.getters[`${this.id}/height`]
  },
  paperWidth () {
    return this.$store.getters[`${this.id}/paperWidth`]
  },
  paperHeight () {
    return this.$store.getters[`${this.id}/paperHeight`]
  },
  typeOfPaper () {
    return this.$store.getters[`${this.id}/typeOfPaper`]
  },
  tiraj () {
    return this.$store.getters[`${this.id}/tiraj`]
  },
  list () {
    return this.$store.getters[`${this.id}/list`]
  },
  coefPrice () {
    return this.$store.getters[`${this.id}/coefPrice`]
  },
  maxRange () {
    return this.$store.getters[`${this.id}/maxRange`]
  },
  gramaj () {
    return this.$store.getters[`${this.id}/gramaj`]
  },
  nds () {
    return this.$store.getters[`${this.id}/nds`]
  },
  ndsToggle () {
    return this.$store.getters[`${this.id}/ndsToggle`]
  },
  chuzhoyPages () {
    return this.$store.getters[`${this.id}/chuzhoyPages`]
  },
  finalPrice () {
    return this.$store.getters[`${this.id}/finalPrice`]
  },
  otherCosts () {
    return this.$store.getters[`${this.id}/otherCosts`]
  },
  svoyPages () {
    return this.$store.getters[`${this.id}/svoyPages`]
  },
  noOborotPages () {
    return this.$store.getters[`${this.id}/noOborotPages`]
  },
  sizeForma () {
    return this.$store.getters[`${this.id}/sizeForma`]
  },
  klapan () {
    return this.$store.getters[`${this.id}/klapan`]
  },
  ezrer () {
    return this.$store.getters[`${this.id}/ezrer`]
  },
  qyali () {
    return this.$store.getters[`${this.id}/qyali`]
  },
  chuzhoy () {
    return this.$store.getters[`${this.id}/chuzhoy`]
  },
  outOfSet () {
    return this.$store.getters[`${this.id}/outOfSet`]
  },
  noColorSelected () {
    return this.$store.getters[`${this.id}/noColorSelected`]
  },
  noBackColor () {
    return this.$store.getters[`${this.id}/noBackColor`]
  },
  fourBackColor () {
    return this.$store.getters[`${this.id}/fourBackColor`]
  },
  fourFrontColor () {
    return this.$store.getters[`${this.id}/fourFrontColor`]
  },
  countColorsFront () {
    return this.$store.getters[`${this.id}/countColorsFront`]
  },
  countColorsBack () {
    return this.$store.getters[`${this.id}/countColorsBack`]
  },
  colorsSelectedFront () {
    return this.$store.getters[`${this.id}/colorsSelectedFront`]
  },
  colorsSelectedBack () {
    return this.$store.getters[`${this.id}/colorsSelectedBack`]
  },
  calculateRasklad () {
    return this.$store.getters[`${this.id}/calculateRasklad`]
  },
  rasklad () {
    return this.$store.getters[`${this.id}/rasklad`]
  },
  svoyText () {
    return this.$store.getters[`${this.id}/svoyText`]
  },
  forma () {
    return this.$store.getters[`${this.id}/forma`]
  },
  chuzhoyCount () {
    return this.$store.getters[`${this.id}/chuzhoyCount`]
  },
  svoyCount () {
    return this.$store.getters[`${this.id}/svoyCount`]
  },
  noOborotCount () {
    return this.$store.getters[`${this.id}/noOborotCount`]
  },
  priceForma () {
    return this.$store.getters[`${this.id}/priceForma`]
  },
  pricePaper () {
    return this.$store.getters[`${this.id}/pricePaper`]
  },
  allFormas () {
    return this.$store.getters[`${this.id}/allFormas`]
  },
  paperKg () {
    return this.$store.getters[`${this.id}/paperKg`]
  },
  price () {
    return this.$store.getters[`${this.id}/price`]
  },
  pricePerUnit () {
    return this.$store.getters[`${this.id}/pricePerUnit`]
  },
  allValuesSet () {
    return this.$store.getters[`${this.id}/allValuesSet`]
  }
}
