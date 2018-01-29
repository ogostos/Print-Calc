<template>
  <div class="job">
    <div class="job-first-row">
      <div class="sizeButtons">
        <span class="chap">չափեր</span>
        <button class="sizeItems asizes" @click="paperSizeA" tabindex="-1">A</button>
        <button class="sizeItems bsizes" @click="paperSizeB" tabindex="-1">B</button>
      </div>
      <div class="input-form width">
        <input id="width" dir="rtl" type="number" tabindex="1" :class="{initial: width === null, validate: width || width === 0, job: true}" min="1" v-model.number.lazy="width" step="1" />
        <label for="width">լայնություն</label>
      </div>
        <span class="x">x</span>
      <div class="input-form height">
        <input id="height" type="number" tabindex="2" min="1" step="1" v-model.number.lazy="height" :class="{initial: height === null, validate: height || height === 0, job: true}" />
        <label for="height">բարձրություն</label>
      </div>
      <div class="input-form pages">
          <input id="pages" type="number" tabindex="3" min="2" step="2" v-model.number="pages" 
          :class="{initial: !pages, validate: pages, job: true}"/>
          <label for="pages" data-error="միայն զույգ էջեր">էջեր</label>
      </div>
      <a class="reset-button" href="#" role="button" @click.prevent="resetColors" tabindex="-1">
        <span>Reset</span>
        <div class="icon">
          <i class="fa fa-remove"></i>
          <i class="fa fa-check"></i>
        </div>
      </a>
    </div>
    <div class="job-second-row">
      <div class="frontcolors colors-items">
        <div v-for="(value, key) in job.colorFront" :id="key" :class="{'colors-wrapped': true, disabled: !pages}" @click="colorFrontChange($event.currentTarget.id)" tabindex="-1">
          <div :class="{'color-box': true, active: value}">
            <div :class="{colorbutton: true, disabled: !pages}">{{key}}</div>
            <div class="coloredbox"></div>
          </div>
        </div>
      </div>
      <span style="margin: 10px; font-size: 30px; cursor: default">+</span>
      <div class="backcolors colors-items">
        <div v-for="(value, key) in job.colorBack" :id="key" :class="{'colors-wrapped': true, disabled: !pages}" @click="colorBackChange($event.currentTarget.id)" tabindex="-1">
          <div :class="{'color-box': true, active: value}">
            <div :class="{colorbutton: true, disabled: !pages}">{{key}}</div>
            <div class="coloredbox"></div>
          </div>
        </div>
      </div>
        <button :class="{fpz: !(fourFrontColor && noBackColor), activeColorSelectionButton: fourFrontColor && noBackColor}" :disabled="!pages" @click="fourPlusZero" tabindex="4"> 4 + 0 </button>
        <button :class="{fpf: !(fourFrontColor && fourBackColor), activeColorSelectionButton: fourFrontColor && fourBackColor}" :disabled="!pages" @click="fourPlusFour" tabindex="5"> 4 + 4 
        </button>
    </div>
  </div>
</template>

<script>
  import getters from '../store/modules/reModuleGetters'
  import mutations from '../store/modules/reModuleMutations'

  const {job, width, pages, height, countColorsFront, countColorsBack, colorsSelectedFront, colorsSelectedBack, noColorSelected, noBackColor, fourBackColor, fourFrontColor} = getters
  const {fourPlusFour, updateWidth, updatePages, updateHeight, fourPlusZero, resetColors, updateJob, colorFrontChange, colorBackChange} = mutations

  export default {
    props: ['id'],
    data () {
      return {
        sizeA: [[594, 840, 'A1'], [420, 594, 'A2'], [297, 420, 'A3'], [210, 297, 'A4'], [148, 210, 'A5'], [105, 148, 'A6']],
        sizeB: [[500, 700, 'B2'], [350, 500, 'B3'], [250, 350, 'B4'], [175, 250, 'B5'], [125, 175, 'B6']]
      }
    },
    computed: {
      width: {
        get: width,
        set: updateWidth
      },
      height: {
        get: height,
        set: updateHeight
      },
      pages: {
        get: pages,
        set: updatePages
      },
      job,
      countColorsFront,
      countColorsBack,
      colorsSelectedFront,
      colorsSelectedBack,
      noColorSelected,
      noBackColor,
      fourFrontColor,
      fourBackColor
    },
    // watch: {
    //   pages () { // when pages is 0, reset automatically
    //     if (!this.$store.getters[`${this.id}/pages`]) {
    //       this.$store.commit(`${this.id}/resetColors`)
    //     }
    //   }
    // },
    methods: {
      fourPlusFour,
      fourPlusZero,
      resetColors,
      updateJob,
      colorFrontChange,
      colorBackChange,
      paperSizeA: (function () {
        let i = -1
        return function () {
          let arr = this.sizeA
          i = (i + 1) % arr.length
          let [a, b, c] = arr[i]
          this.$store.commit(`${this.id}/updateJob`, {width: a, height: b, size: c})
        }
      })(),
      paperSizeB: (function () {
        let i = -1
        return function () {
          let arr = this.sizeB
          i = (i + 1) % arr.length
          let [a, b, c] = arr[i]
          this.$store.commit(`${this.id}/updateJob`, {width: a, height: b, size: c})
        }
      })()
    }
  }
</script>
<style scoped>
div.job {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.colors:disabled, .not-active {
  border: 1px solid #999999 !important;
  background: #cccccc !important;
  color: #666666 !important;
}

</style>
