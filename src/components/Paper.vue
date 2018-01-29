<template>
  <div class="paper-general">
    <div class="first-row-paper">
      <div class="paperSizeButtons">
        <span class="paper-chap">Թղթի չափեր</span>
        <button class="paper-sizes sfn" @click="sixtyFourNinety" tabindex="-1"></button>
        <button class="paper-sizes sh" @click="seventyHundred" tabindex="-1"></button>
      </div>
      <div class="input-form paper-width">
        <input id="paperHeight" dir="rtl" type="number" :class="{initial: paperHeight === null, validate: paperHeight || paperHeight === 0, paper: true}" min="1" v-model.number.lazy="paperHeight" tabindex="6" step="1" />
        <label for="paperHeight">թղթի բարձրություն</label>
      </div>
      <span class="x">x</span>
      <div class="input-form paper-height">
        <input id="paperWidth" type="number" :class="{initial: paperWidth === null, validate: paperWidth || paperWidth === 0, paper:true}" min="1" v-model.number.lazy="paperWidth" step="1" tabindex="7"/>
        <label for="paperWidth">թղթի լայնություն</label>
      </div>
      <div class="toggle-buttons">
        <div :class="{'paper-toggle': true, 'paper-toggle-disabled': noBackColor, 'paper-toggle-active': qyali}">
          <input id="qyali" type="checkbox" v-model="qyali">
          <label for="qyali">Ք</label>
        </div>
        <div :class="{'paper-toggle': true, 'paper-toggle-disabled': noBackColor || pages !== 2, 'paper-toggle-active': chuzhoy}">
          <input id="chuzhoy" type="checkbox" v-model="chuzhoy">
          <label for="chuzhoy">Չ</label>
        </div>
      </div>
      <a class="reset-button" href="#" role="button" @click.prevent="resetPaper" tabindex="-1">
        <span>Reset</span>
        <div class="icon">
          <i class="fa fa-remove"></i>
          <i class="fa fa-check"></i>
        </div>
      </a>
    </div>
    <div class="second-row-paper">
      <button :class="{'prev-next': true, 'prev-next-not-active': !paperWidth}" @click="prevType" tabindex="8" >↺</button>
      <div :class="{'container-for-types': paperWidth, 'container-for-types-not-active': !paperWidth}">
        <div :class="'carousel' + id">
          <div v-for="(list, type, index) in papertypes" :class="{item: paperWidth, 'item-not-active': !paperWidth}" :id="'type' + index">{{type}}</div >
        </div>
      </div>
      <button :class="{'prev-next': true, 'prev-next-not-active': !paperWidth} "@click="nextType" tabindex="9" >↻</button>
    </div>
    <div class="gramaj-wrapper" style="height: 60px" >
      <button 
        v-if="typeOfPaper"
        v-for="gr in papertypes[typeOfPaper]"
        :class="{gramaj: true, 'gramaj-active': gr === paper.gramaj}"
        @click="updatePaper({gramaj: gr})" >
          {{gr}}<sub>գր</sub>
      </button>
    </div>
    <div class="tiraj">
      <div :class="{tirajModifierMinus: true, 'tirajModifierMinus-not-active': !tiraj}">
        <button
          v-for="num in tirajModifierMinus"
          :value="num"
          :id="'num' + num"
          @click="tirajChangedMinus(num)"
          :disabled="tiraj && tiraj < num + 1">
            -{{num}}
        </button>
      </div>
      <div class="input-form">
        <input id="tiraj" type="number" :class="{initial: tiraj === null, validate: tiraj || tiraj === 0, tiraj: true}" 
        min="1" v-model.number.lazy="tiraj" tabindex="10" step="1" @change="changeMaxRange"/>
        <label for="tiraj">տպաքանակ</label>
      </div>
      <div :class="{tirajModifierPlus: true, 'tirajModifierPlus-not-active': !tiraj}">
        <button
          v-for="num in tirajModifierPlus"
          :value="num"
          :id="'num' + num"
          @click="tirajChangedPlus(num)">
            +{{num}}
        </button>
      </div>
    </div>
    <div style="margin-top: 10px; height: 22px">
      <slider 
      v-if="tiraj"
      tooltip="false"
      v-model="paper.tiraj"
      :max="maxRange"
      :interval="10"
      tooltip-dir="bottom"
      ></slider>
    </div>
    <hr>
    <div class="paper-last-row">
      <div :class="{manual: true, 'manual-not-active': !tiraj}">
        <button class="fab" @click="fab" tabindex="11">≣</button>
        <div class="floating fone">
        ⍐⍗<input type="number" v-model.number="klapan" />
        </div>
        <div class="floating fone">
        ⍇⍈<input type="number" v-model.number="ezrer" />
        </div>
        <div class="floating fone">
        ⎕$<input type="number" v-model.number="coefPaper" step="0.1" />
        </div>
        <div class="floating fone">
        $<input type="number" v-model.number="usd" />
        </div>
      </div>
      <div :class="{'input-form': true, coefprice:true, 'coefprice-not-active': !tiraj}">
        <div class="coef" @click="changeCoefPrice">
          <div class="coef-bar"></div>
        </div>
        <input id="coefPrice" type="number" :class="{initial: coefPrice === null, validate: coefPrice || coefPrice === 0, tiraj: true}" min="0.01" 
        v-model.number="coefPrice" tabindex="12" step="0.01" />
        <label for="coefPrice">Գործակից</label>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from 'vue-slider-component'
import getters from '../store/modules/reModuleGetters'
import mutations from '../store/modules/reModuleMutations'

const {paper, paperWidth, pages, paperHeight, coefPaper, coefPrice, typeOfPaper, maxRange, tiraj, klapan, ezrer, qyali, chuzhoy, noBackColor} = getters
const {updatePaper, updatePaperWidth, updatePaperHeight, updateCoefPaper, updateCoefPrice, updateMaxRange, updateKlapan, updateEzrer, resetPaper, tirajChangedMinus, tirajChangedPlus, toggleQyali, toggleChuzhoy, updateTiraj} = mutations

export default {
  props: ['id'],
  components: {
    Slider
  },
  data () {
    return {
      papertypes: {
        'Կավճապատ փայլուն': [80, 90, 115, 130, 150, 170, 200, 250, 300, 350],
        'Կավճապատ անփայլ': [90, 115, 130, 150, 170, 200, 250, 300],
        'Օֆսեթ': [60, 65, 70, 80, 100, 120, 150, 160, 300],
        'Ֆուդբորդ': [210, 215, 250, 270, 325],
        'Ինքնակպչուն': [188, 250],
        'Պիտակային': [80],
        'Ինքնապատճեն': [50, 55],
        'Ստվարաթուղթ': [230, 245, 250, 260, 270, 290, 300, 350],
        'Կրաֆտ': [40, 45, 70, 80, 100, 120],
        'Մետալիկ': [70, 75],
        'Խրոմոլյուքս': [80, 100],
        'Լյոն': [75, 80]
      },
      currentDegree: 0,
      tirajModifierMinus: [10000, 5000, 2000, 1000, 500],
      tirajModifierPlus: [500, 1000, 2000, 5000, 10000]
    }
  },
  mounted () {
    let el = document.querySelector(`.carousel${this.id}`).style
    switch (this.typeOfPaper) {
      case 'Կավճապատ փայլուն': el.transform = 'rotateY(0deg)'
        break
      case 'Կավճապատ անփայլ': el.transform = 'rotateY(-30deg)'
        break
      case 'Օֆսեթ': el.transform = 'rotateY(-60deg)'
        break
      case 'Ֆուդբորդ': el.transform = 'rotateY(-90deg)'
        break
      case 'Ինքնակպչուն': el.transform = 'rotateY(-120deg)'
        break
      case 'Պիտակային': el.transform = 'rotateY(-150deg)'
        break
      case 'Ինքնապատճեն': el.transform = 'rotateY(-180deg)'
        break
      case 'Ստվարաթուղթ': el.transform = 'rotateY(-210deg)'
        break
      case 'Կրաֆտ': el.transform = 'rotateY(-240deg)'
        break
      case 'Մետալիկ': el.transform = 'rotateY(-270deg)'
        break
      case 'Խրոմոլյուքս': el.transform = 'rotateY(-300deg)'
        break
      case 'Լյոն': el.transform = 'rotateY(-330deg)'
        break
    }
    document.querySelector('.coef .coef-bar').style.width = Math.round(this.coefPrice / 4 * 100) + '%' // add classname related to card!!!!!!! to differ elems
  },
  watch: {
    paperWidth (val) {
      if (val) {
        this.$store.commit(`${this.id}/updateTypeOfPaperCoefPaper`, this.currentDegree)
        this.$store.commit(`${this.id}/updatePaper`, {gramaj: null})
      }
    },
    currentDegree (val) {
      if (this.paperWidth) {
        this.$store.commit(`${this.id}/updateTypeOfPaperCoefPaper`, val)
        this.$store.commit(`${this.id}/updatePaper`, {gramaj: null})
      }
    }
  },
  computed: {
    paper,
    pages,
    qyali: {
      get: qyali,
      set: toggleQyali
    },
    chuzhoy: {
      get: chuzhoy,
      set: toggleChuzhoy
    },
    paperWidth: {
      get: paperWidth,
      set: updatePaperWidth
    },
    paperHeight: {
      get: paperHeight,
      set: updatePaperHeight
    },
    coefPaper: {
      get: coefPaper,
      set: updateCoefPaper
    },
    coefPrice: {
      get: coefPrice,
      set: updateCoefPrice
    },
    maxRange: {
      get: maxRange,
      set: updateMaxRange
    },
    klapan: {
      get: klapan,
      set: updateKlapan
    },
    ezrer: {
      get: ezrer,
      set: updateEzrer
    },
    tiraj: {
      get: tiraj,
      set: updateTiraj
    },
    usd: {
      get () {
        return this.$store.getters.usd
      },
      set (val) {
        this.$store.commit('updateUsd', val)
      }
    },
    noBackColor,
    typeOfPaper
  },
  methods: {
    updatePaper,
    tirajChangedMinus,
    tirajChangedPlus,
    resetPaper,
    changeCoefPrice (e) {
      const bar = document.querySelector('.coef .coef-bar')
      const percent = e.offsetX / e.currentTarget.offsetWidth
      const min = 0.5
      const max = 4
      const width = Math.round(percent * 100) + '%'
      const newcoef = (percent * (max - min) + min).toFixed(1)
      bar.style.width = width
      this.$store.commit(`${this.id}/updateCoefPrice`, newcoef)
    },
    fab () {
      [...document.getElementsByClassName('floating')].forEach(x => x.classList.toggle('floating-active')) // add classname related to card!!!!!!! to differ elems
      document.querySelector('.fab').classList.toggle('fab-active') // add classname related to card!!!!!!! to differ elems
    },
    changeMaxRange (e) {
      let val = e.target.value
      if (!this.maxRange) {
        this.$store.commit(`${this.id}/updateMaxRange`, val * 2 > 1000 ? val * 2 : 1000)
      } else if (val > this.maxRange) {
        this.$store.commit(`${this.id}/updateMaxRange`, Math.ceil((val * 2) / 10) * 10)
      } else if (val < this.maxRange / 2) {
        this.$store.commit(`${this.id}/updateMaxRange`, val * 2 > 1000 ? val * 2 : 1000)
      }
    },
    nextType () {
      this.currentDegree -= 30
      document.querySelector(`.carousel${this.id}`).style.transform = 'rotateY(' + this.currentDegree + 'deg)'
    },
    prevType () {
      this.currentDegree += 30
      document.querySelector(`.carousel${this.id}`).style.transform = 'rotateY(' + this.currentDegree + 'deg)'
    },
    sixtyFourNinety () {
      let a = this.paperHeight
      let b = this.paperWidth
      if ((640 % a === 0 || 640 % b === 0) && (900 % b === 0 || 900 % a === 0) && a > 320) {
        a > b ? a /= 2 : b /= 2
        if (a > b) {
          [a, b] = [b, a]
        }
      } else {
        a = 640
        b = 900
      }
      this.$store.commit(`${this.id}/updatePaper`, {paperHeight: a, paperWidth: b})
    },
    seventyHundred () {
      let a = this.paperHeight
      let b = this.paperWidth
      if ((700 % a === 0 || 700 % b === 0) && (1000 % b === 0 || 1000 % a === 0) && a > 350) {
        a > b ? a /= 2 : b /= 2
        if (a > b) {
          [a, b] = [b, a]
        }
      } else {
        a = 700
        b = 1000
      }
      this.$store.commit(`${this.id}/updatePaper`, {paperHeight: a, paperWidth: b})
    }
  }
}
</script>

<style scoped>

.tirajModifierMinus > button, .tirajModifierPlus > button {
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  font-family: 'trebuchet ms';
}
.tirajModifierMinus > button:disabled, .tirajModifierPlus > button:disabled {
  cursor: not-allowed;
}
.tirajModifierMinus {
  display: flex;
  justify-content: center;
  align-items: baseline;
  background: -moz-linear-gradient(left, #ed0b29 0%, #9e09bc 49%, #3498db 100%);
  background: -webkit-linear-gradient(left, #ed0b29 0%,#9e09bc 49%,#3498db 100%);
  background: linear-gradient(to right, #ed0b29 0%,#9e09bc 49%,#3498db 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  opacity: 1;
  transition: all 1s ease-in-out;

}
.tirajModifierPlus {
  display: flex;
  justify-content: center;
  align-items: baseline;
  background: -moz-linear-gradient(left, #3498db 0%, #9e09bc 51%, #ed0b29 100%);
  background: -webkit-linear-gradient(left, #3498db 0%,#9e09bc 51%,#ed0b29 100%);
  background: linear-gradient(to right, #3498db 0%,#9e09bc 51%,#ed0b29 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  opacity: 1;
  transition: all 1s ease-in-out;
}

.tirajModifierMinus-not-active, .tirajModifierPlus-not-active {
  opacity: 0;
  transition: all 1s;
}

#num500 {
  font-size: 1.1rem;
}
#num1000 {
  font-size: 1.25rem;
}
#num2000 {
  font-size: 1.35rem;
}
#num5000 {
  font-size: 1.45rem;
}
#num10000 {
  font-size: 1.55rem;
}

.toggle-buttons {
  width: 130px;
  display:flex;
  justify-content: center;
  align-content: center;
}
.paper-toggle {
  margin: 7px;
  background: none;
  border: 2px solid purple;
  position: relative;
  height: 38px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-content: center;
  transition: all 0.2s ease-in-out;
}
.paper-toggle-disabled {
  border: 2px solid #696969;
  background: #696969;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
}

.paper-toggle input {
  cursor: pointer;
  opacity: 0 !important;
  margin: 0;
  position: relative;
  height: 100%;
  width: 100%;
}

.paper-toggle label {
  cursor: pointer;
  position: absolute;
  color: purple;
  font-size: 1.8rem;
  font-weight: 600;
  height: 100%;
  width: 100%;
}
.paper-toggle label:hover, .paper-toggle label:active,
.paper-toggle label:focus, .paper-toggle-active label {
  color: white;
}

.paper-toggle:hover, .paper-toggle:focus,
.paper-toggle:active, .paper-toggle-active {
  /*background: rgba(134, 163, 40,1);*/
  background: purple;
}

.paper-toggle > * {
  opacity: 1;
  }
.paper-toggle-disabled > * {
    opacity: 0;
  }
.second-row-paper {
  display: flex;
  justify-content: center;
  align-items: center;
}
  .gramaj-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gramaj {
    background: none;
    outline: none;
    font-size: 1.3rem;
    border: none;
    margin: 0;
    font-family: 'trebuchet ms';
    /*transition: all 0.1s;*/
    cursor: pointer;
  }
  
  .gramaj:hover {
    /*background: rgba(128,0,128, 0.7);*/
    border-top: 1.5px solid purple;
    border-bottom: 1.5px solid purple;
    /*font-size: 1.6rem;*/
  }
  .gramaj-active {
    /*background: rgba(128,0,128, 0.6);*/
    background: none;
    border-top: 1.5px solid purple;
    border-bottom: 1.5px solid purple;
    outline: none;
    font-size: 1.3rem;
    margin: 0;
    transition: all 0.1s;
    cursor: pointer;
  }

.container-for-types {
  margin: 0 150px;
  width: 185px;
  height: 90px;
  position: relative;
  perspective: 900px;
  cursor: not-allowed;
}
.container-for-types-not-active {
  margin: 0 150px;
  width: 185px;
  height: 90px;
  position: relative;
  perspective: 900px;
}
.container-for-types-not-active:after {
  content: '';
}
.container-for-types:after {
    content: '';
    position: absolute;
    top: 9px;
    left: 30px;
    width: 125px;
    height: 72px;
    box-sizing: border-box;
    border-top: 2px solid purple;
    border-bottom: 2px solid purple;
    transition-delay: 0.25s;
}
div[class^='carousel'] {
  height: 100%;
  width: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 1s;
}

.item {
  position: absolute;
  width: 185px;
  height: 90px;
  font-size: 1.7rem;
  color: #FFF;
  opacity: 0.95;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.45s ease-in-out;
  color: black;
}

#type0 {
  transform: rotateY(0deg) translateZ(185px) scale(0.5); 
  background: #46bcde;
}
#type1 {
  transform: rotateY(30deg) translateZ(185px) scale(0.5);
  background: #52d273;
}
#type2 {
  transform: rotateY(60deg) translateZ(185px) scale(0.5);
  background: #e94f64;
}
#type3 {
  transform: rotateY(90deg) translateZ(185px) scale(0.5);
  background: #e57254;
}
#type4 {
  transform: rotateY(120deg) translateZ(185px) scale(0.5);
  background: #e5c454;
} 
#type5 {
  transform: rotateY(150deg) translateZ(185px) scale(0.5);
  background: #d6d8de;
}
#type6 {
  transform: rotateY(180deg) translateZ(185px) scale(0.5);
  background: #46bcde;
  font-size: 1.5rem;
}
#type7 {
  transform: rotateY(210deg) translateZ(185px) scale(0.5);
  background: #52d273;
  font-size: 1.55rem;
}
#type8 {
  transform: rotateY(240deg) translateZ(185px) scale(0.5);
  background: #e94f64;
}
#type9 {
  transform: rotateY(270deg) translateZ(185px) scale(0.5);
  background: #e57254;
} 
#type10 {
  transform: rotateY(300deg) translateZ(185px) scale(0.5);
  background: #e5c454;
}
#type11 {
  transform: rotateY(330deg) translateZ(185px) scale(0.5);
  background: #d6d8de;
} 
.item-not-active {
  position: absolute;
  width: 185px;
  height: 90px;
  font-size: 1.7rem;
  opacity: 0.95;
  border-radius: 5px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #dddddd !important;
  color: #dddddd !important;
  transition: all 0.35s ease-in-out;
  pointer-events: none;
}
.prev-next {
  color: #444;
  cursor: pointer;
  background: none;
  font-size: 3rem;
  transition: all 0.2s ease-in-out;
  outline: none;
  border: none;
}
.prev-next-not-active {
  pointer-events: none;
}
.prev-next:hover, .prev-next:active, .prev-next:focus  { 
  color: purple;
}
.manual {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-right: 1.5px solid grey;
  width: 50%;
  opacity: 1;
  transition: all 1s linear 3s; 
}

.coefprice {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  opacity: 1;
  margin-top: 6px;
  transition: all 1s linear 1s;
}
.manual-not-active, .coefprice-not-active {
  opacity: 0;
  transition: all 1s;
}

.fab {
  border: none;
  outline: none;
  background: none;
  border: 1.5px solid indigo;
  border-radius: 100%;
  color: indigo;
  font-size: 1.8rem;
  font-weight: bolder;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.fab:hover, .fab:active, .fab:focus, 
.fab-active  {
  color: white;
  background: indigo;
}
.floating {
  margin: 9px;
  transform: scale(0.3) translateY(0px) translateX(-40px);
  opacity: 0;
  transition: all 0.4s;
}
.floating-active {
  transform: scale(1) translateY(0px) translateX(0px);
  opacity: 1;
}
.floating > input {
  cursor: text;
  border: none;
  background: none;
  outline: none;
  margin-left: 3px;
  font-size: 1rem;
  width: 45px;
  border-bottom: 1px solid indigo;
}
.ffour {
 transition-delay: 0.3s;
}
.fthree {
  transition-delay: 0.2s;
}
.ftwo {
  transition-delay: 0.1s;
}
.paper-last-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
#coefPrice {
  width: 25%;
}
#coefPrice + label {
  width: 25%;
  left: auto;
  text-align: center;
}
.coef {
  width: 100%;
  background:#efefef;
  margin:10px;
  border-radius:5px;
  box-shadow:0 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
  cursor: pointer;
}
.coef:before {
  content: '0.5';
  position: absolute;
  bottom: -8px;
  left: 10px;
  font-size: 0.9rem;
  color: grey;
}
.coef:after {
  content: '4';
  position: absolute;
  bottom: -9px;
  right: 20.5%;
  font-size: 1rem;
  color: grey;
}
.coef-bar {
  width:100%;
  background:linear-gradient(-170deg, #c16ecf 0%, #2376ae 100%);
  text-shadow:1px 1px 0 rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding:2px;
  color:white;
  height:30px;
}
/*.paper-general {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-between;
}*/
</style>
