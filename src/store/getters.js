import f from '../assets/helpers'

export const calculateRasklad = (state) => {
  let {width: w, height: h, pages: pg, fpz, chuzhoy: ch, qyali: q} = state.job.job
  let {paperWidth: pw, paperHeight: ph} = state.paper.paper
  let {klapan: kl, ezrer: ez} = state.admin.admin
  if (pg >= 4) {
    return f.rasklad(w, h, pw, ph, q, kl, ez)
  } else if (pg === 2) {
    if (fpz || ch) {
      return f.maximumOst(w, h, pw, ph, kl, ez)
    } else {
      return f.raskladTwoPages(w, h, pw, ph, q, kl, ez)
    }
  }
}

export const rasklad = (state, getters) => {
  if (getters.calculateRasklad) {
    return getters.calculateRasklad.rasklad
  }
  return null
}

export const svoyText = (state, getters) => {
  if (getters.calculateRasklad && getters.forma.formsCount.svoy) {
    return getters.calculateRasklad.text
  }
  return null
}

export const priceForma = (state) => {
  let {paperHeight: ph} = state.paper.paper
  if (!ph) {
    return null
  } else if (ph <= 520) {
    return 2000
  } else if (ph <= 720) {
    return 4000
  } else {
    return 6000
  }
}

export const forma = (state, getters) => {
  let {pages: p, width: w, height: h, fpz, chuzhoy: ch} = state.job.job
  let {tiraj: t, gramaj: gr} = state.paper.paper
  let {rasklad: r, pricePaper: pp, priceForma: pf} = getters
  return f.forma(p, r, w, h, t, gr, fpz, ch, pf, pp)
}

export const pricePaper = (state) => {
  return Math.round(state.admin.admin.usd * state.admin.admin.coefPaper)
}

export const chuzhoyCount = (state, getters) => {
  return getters.forma.formsCount.chuzhoy
}

export const svoyCount = (state, getters) => {
  return getters.forma.formsCount.svoy
}

export const noOborot = (state, getters) => {
  return getters.forma.formsCount.noOborot
}

export const allFormas = (state, getters) => {
  let {svoyCount: sv, chuzhoyCount: ch, noOborot: noOb, countColorsFront: cF, countColorsBack: cB} = getters
  return ch * (cF + cB) + sv * Math.max(cF, cB) + noOb * cF
}

export const paperKg = (state, getters) => {
  let {tiraj: t, gramaj: gr, paperWidth: pW, paperHeight: pH} = state.paper.paper
  return t * gr * pW * pH / 1000000000
}

export const price = (state, getters) => {
  let {allFormas: allF, forma: f, priceForma: pF, pricePaper: pP, paperKg: pKG} = getters
  let {coefPrice: cP} = state.paper.paper
  let price = allF * pF + f.coefList * pKG * pP * cP
  if (price < 50000) {
    return 50000
  }
  return Math.ceil(price)
}

export const pricePerUnit = (state, getters) => {
  return Math.ceil(getters.price / state.paper.paper.tiraj)
}

export const outOfSet = (state, getters) => {
  return state.job.job.pages % getters.rasklad === 2 && state.job.job.pages > 2
}

export const noColorSelected = (state, getters) => {
  return getters.countColorsFront + getters.countColorsBack === 0
}
