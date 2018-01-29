<template>
  <div class="result-wrapper">
    <div class="paperbox">
      <span class="paperhead">Թուղթ</span>
      <div class="papersize">{{paperHeight}} x {{paperWidth}}</div>
      <div class="paperfacts">{{typeOfPaper}}<span v-if="gramaj">, {{gramaj}}գր</span></div>
      <div class="jobfacts">
        <div>{{width}} x {{height}} <span class="arm">մմ</span></div>
        <div>{{pages}} <span class="arm">էջ</span>, {{countColorsFront}} + {{countColorsBack}}</div>
      </div>
      <div class="totalpaper"><span class="paperkg">{{paperKg}}</span> կգ</div>
      <div class="jobsize">1/{{rasklad}}</div>
    </div>
    <div class="formabox">
      <span class="formahead">Ֆորմա</span>
      <div class="formatext">
        <p v-if="chuzhoyCount">
          <span class="formaspan">{{chuzhoyCount}}x</span> չուժոյ ֆորմա <span class="formaspan">[{{chuzhoyPages}}]</span>
        </p>
        <p v-if="svoyCount">
          <span class="formaspan">{{svoyCount}}x</span> {{qyalySvoyText}} սվոյ ֆորմա <span class="formaspan">[{{svoyPages}}]</span>
        </p>
        <p v-else-if="noOborotCount">
          <span class="formaspan">{{noOborotCount}}x</span> ֆորմա {{countColorsFront}} + 0 <span class="formaspan">[{{noOborotPages}}]</span>
        </p>
      </div>
      <div class="totalout">
        <div class="totalforma"><span class="allforma">{{allFormas}}</span> հատ {{sizeForma}}</div>
        <div :class="{outofset:true, 'outofset-active': outOfSet}">Մամուլից դուրս Էջեր</div>
      </div>
    </div>
    <div :class="{pricebox: true, 'pricebox-active': allFormas && paperKg}">
        <span class="pricehead">Գինը</span>
        <span class="pricenum">{{pricePerUnit}}/{{finalPrice | split}} դր.</span>
        <button @click="updateNdsToggle" :class="{nds: true, 'nds-active': ndsToggle}">ԱԱՀ</button>
    </div>
  </div>
</template>

<script>
  import getters from '../store/modules/reModuleGetters'
  import mutations from '../store/modules/reModuleMutations'

  const {job, width, height, size, paper, rasklad, countColorsFront, countColorsBack, chuzhoyCount, svoyCount, noOborotCount, price, pricePerUnit, outOfSet, svoyText, typeOfPaper, paperWidth, paperHeight, allFormas, paperKg, gramaj, pages, sizeForma, chuzhoyPages, svoyPages, noOborotPages, finalPrice, ndsToggle} = getters
  const {updateNdsToggle} = mutations

  export default {
    props: ['id'],
    // mounted () {
    //   setTimeout(() => {
    //     document.querySelector('.paperbox').classList.add('paperbox-active')
    //     document.querySelector('.jobsize').classList.add('jobsize-active')
    //     // document.querySelector('.innerpaper').classList.add('innerpaper-active')
    //   }, 300)
    // },
    computed: {
      job,
      paper,
      width,
      height,
      size,
      rasklad,
      countColorsBack,
      countColorsFront,
      chuzhoyCount,
      svoyCount,
      noOborotCount,
      price,
      pricePerUnit,
      outOfSet,
      svoyText,
      typeOfPaper,
      paperHeight,
      paperWidth,
      allFormas,
      paperKg,
      gramaj,
      pages,
      sizeForma,
      chuzhoyPages,
      svoyPages,
      noOborotPages,
      finalPrice,
      ndsToggle,
      qyalySvoyText () {
        return this.svoyText === 'qyali' ? 'քյալի' : null
      }
    },
    methods: {
      updateNdsToggle
    }
  }
</script>
<style scoped>
  .result-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .paperbox, .formabox {
    border: 4px solid #46bcde;
    width: 98%;
    position: relative;
    flex-basis: 33%; 
  }
  .paperbox {
    display: grid;
    justify-items: center;
    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: 1fr 1fr 2fr 1.8fr;
    grid-gap: 5px;
    grid-template-areas: 
      "size size"
      "type type"
      "jobfacts job"
      "total job"
  }
  .papersize {
    grid-area: size;
    align-self: end;
  }
  .paperfacts {
    grid-area: type;
    align-self: start;
  }
  .jobfacts {
    grid-area: jobfacts;
    align-self: start;
  }
  .totalpaper {
    grid-area: total;
    justify-self: stretch;
  }
  .jobsize {
    grid-area: job;
    justify-self: stretch;
  }
  .paperfacts, .papersize {
    font-size: 1.3rem;
    text-align: right;
    color: #46bcde;
    font-family: 'trebuchet ms';
  }
  .jobsize {
    margin: 0 10px 10px 10px;
    border: 5px dashed orange;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-family: 'trebuchet ms';
    color: white;
  }
  .jobfacts {
    text-align: right;
    font-family: 'trebuchet ms';
    font-size: 1.5rem;
    color: orange;
  }
  .arm {
    font-family: sans-serif;
    font-weight: normal
  }
  .paperkg, .allforma {
    font-size: 2rem;
    font-family: 'trebuchet ms';
    margin: 5px;
    color: #46bcde;
  }
  .totalpaper {
    border-top: 2px solid #46bcde;
    border-right: 2px solid #46bcde;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .paperhead, .formahead {
    position: absolute;
    top: -25px;
    left: 5px;
    font-weight: bolder;
    font-size: 2rem;
    z-index: 2;
    color: rgba(255,255,255,0.9);
  }
  .formabox {
    border: 4px solid #52d273;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    text-align: center;
  }
  .totalforma {
    border-top: 2px solid #52d273;
    border-right: 2px solid #52d273;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex: 1.5;
  }
  .allforma {
    color: #52d273;
  }
  .formatext {
    color: white;
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 2.5;
  }
  .formatext > p {
    margin: 5px;
  }
  .formaspan {
    color: #e94f64;
    font-weight: bolder;
    font-family: 'trebuchet ms';
    font-size: 1.5rem;
  }
  .totalout {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex: 1;
  }
  .outofset {
    text-align: center;
    flex: 1;
    padding: 2.5px;
    color: #2d2d2d;
  }
  .outofset-active {
    color: red;
    background: #d6d8de;
  }
  .pricebox {
    color: #e5c454;
    background: #e5c454;
    flex-basis: 13%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .pricebox-active {
    color: black
  }
  .pricehead {
    font-weight: bolder;
    font-size: 2.1rem;
    color: rgba(0,0,0,0.85);
  }
  .pricenum {
    font-family: 'trebuchet ms';
    font-size: 2rem;
  }
  .other-costs {
    position: absolute;
    bottom: -70px;
    font-size: 30px;
  }
  .other-costs-text {
    background: none;
    outline: none;
    border: none;
    border-bottom: 2px dashed purple
  }
  .other-costs-number {
    background: none;
    outline: none;
    border: none;
  }
  .nds {
    background: none;
    border: 2px solid rgba(0,0,0,0.85);
    color: rgba(0,0,0,0.85);
    outline: none;
    position: absolute;
    top: 5%;
    right: 5%;
    font-size: 1.3rem;
    transition: all 0.2s ease-in-out;
  }
  .nds-active {
    background: rgba(0,0,0,0.85);
    border: none;
    border: 2px solid rgba(0,0,0,0);
    color: #e5c454;
    transition: all 0.2s ease-in-out;
  }
</style>
