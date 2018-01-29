<template>
    <div id="toggles">
      <span>քյալի սվոյ</span>
      <input :id="id + 'q'" class="cmn-toggle" v-model="qyali" type="checkbox"
      :disabled="noBackColor" unchecked>
      <label style="margin: auto" :for="id + 'q'"></label>
      <span>chuzhoy</span>
      <input :id="id + 'ch'" class="cmn-toggle" v-model="chuzhoy" type="checkbox"
      :disabled="noBackColor" unchecked>
      <label style="margin: auto" :for="id + 'ch'"></label>
      <!-- data-off="անջատած" data-on="միացրած" -->
    </div>
</template>

<script>
  import getters from '../store/modules/reModuleGetters'
  import mutations from '../store/modules/reModuleMutations'

  const {qyali, chuzhoy, noBackColor} = getters
  const {toggleQyali, toggleChuzhoy} = mutations

  export default {
    props: ['id'],
    computed: {
      qyali: {
        get: qyali,
        set: toggleQyali
      },
      chuzhoy: {
        get: chuzhoy,
        set: toggleChuzhoy
      },
      noBackColor
    }
  }
</script>

<style scoped>

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

#toggles {
  margin-top: 20px;
  margin-bottom: 20px;
}

/*input checkbox - no need to display it*/
.cmn-toggle {
  position: absolute;
  margin-left: -9999px;
  visibility: hidden;
}
/*label properties*/
.cmn-toggle + label {
  display: inline-block;
  position: relative;
  cursor: pointer;
  outline: none;
  padding: 2px;
  width: 60px; 
  height: 30px; /*height should be half*/
  background-color: #dddddd; /*outline color*/
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /*label (container) border radius*/
  -webkit-border-radius: 60px;
  -moz-border-radius: 60px;
  -ms-border-radius: 60px;
  -o-border-radius: 60px;
  border-radius: 60px;
}
input.cmn-toggle + label:before, input.cmn-toggle + label:after {
  display: block;
  position: absolute;
  /*position of label before and after elements
  inside of container label*/
  top: 1px;
  left: 1px;
  bottom: 1px;
  content: "";
}
/*inner background pseudo-element*/
input.cmn-toggle + label:before {
  right: 1px;
  background-color: #f1f1f1; /*color of off-ed background*/
  -webkit-border-radius: 60px;
  -moz-border-radius: 60px;
  -ms-border-radius: 60px;
  -o-border-radius: 60px;
  border-radius: 60px;
  -webkit-transition: background 0.25s ease-in-out;
  -moz-transition: background 0.25s ease-in-out;
  -o-transition: background 0.25s ease-in-out;
  transition: background 0.25s ease-in-out;
}
/*circle button pseudo-element*/
input.cmn-toggle + label:after {
  width: 28px; /*-2px from border radius*/
  background-color: #fff; 
  /* circle button, could be 50%*/
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  -o-border-radius: 100%;
  border-radius: 100%;
  /* shadow of button*/ 
  -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  -webkit-transition: margin 0.25s ease-in-out;
  -moz-transition: margin 0.25s ease-in-out;
  -o-transition: margin 0.25s ease-in-out;
  transition: margin 0.25s ease-in-out;
}
input.cmn-toggle:checked + label:before {
  /*color of on-ed*/
  background-color: #8ce196;
}
input.cmn-toggle:checked + label:after {
  /*button movement, equal to width - button radius*/
  margin-left: 30px; 
}
</style>
