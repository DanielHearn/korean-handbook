// Siema
/*
!(function (e, t) { typeof exports === 'object' && typeof module === 'object' ? module.exports = t() : typeof define === 'function' && define.amd ? define('Siema', [], t) : typeof exports === 'object' ? exports.Siema = t() : e.Siema = t() }(typeof self !== 'undefined' ? self : this, function () { return (function (e) { function t (r) { if (i[r]) return i[r].exports; var n = i[r] = {i: r, l: !1, exports: {}}; return e[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports } var i = {}; return t.m = e, t.c = i, t.d = function (e, i, r) { t.o(e, i) || Object.defineProperty(e, i, {configurable: !1, enumerable: !0, get: r}) }, t.n = function (e) { var i = e && e.__esModule ? function () { return e.default } : function () { return e }; return t.d(i, 'a', i), i }, t.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = '', t(t.s = 0) }([function (e, t, i) { 'use strict'; function r (e, t) { if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function') }Object.defineProperty(t, '__esModule', {value: !0}); var n = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (e) { return typeof e } : function (e) { return e && typeof Symbol === 'function' && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e }, s = (function () { function e (e, t) { for (var i = 0; i < t.length; i++) { var r = t[i]; r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } return function (t, i, r) { return i && e(t.prototype, i), r && e(t, r), t } }()), l = (function () { function e (t) { var i = this; if (r(this, e), this.config = e.mergeSettings(t), this.selector = typeof this.config.selector === 'string' ? document.querySelector(this.config.selector) : this.config.selector, this.selector === null) throw new Error('Something wrong with your selector 😭'); this.resolveSlidesNumber(), this.selectorWidth = this.selector.offsetWidth, this.innerElements = [].slice.call(this.selector.children), this.currentSlide = this.config.loop ? this.config.startIndex % this.innerElements.length : Math.max(0, Math.min(this.config.startIndex, this.innerElements.length - this.perPage)), this.transformProperty = e.webkitOrNot(), ['resizeHandler', 'touchstartHandler', 'touchendHandler', 'touchmoveHandler', 'mousedownHandler', 'mouseupHandler', 'mouseleaveHandler', 'mousemoveHandler', 'clickHandler'].forEach(function (e) { i[e] = i[e].bind(i) }), this.init() } return s(e, [{key: 'attachEvents', value: function () { window.addEventListener('resize', this.resizeHandler), this.config.draggable && (this.pointerDown = !1, this.drag = {startX: 0, endX: 0, startY: 0, letItGo: null, preventClick: !1}, this.selector.addEventListener('touchstart', this.touchstartHandler), this.selector.addEventListener('touchend', this.touchendHandler), this.selector.addEventListener('touchmove', this.touchmoveHandler), this.selector.addEventListener('mousedown', this.mousedownHandler), this.selector.addEventListener('mouseup', this.mouseupHandler), this.selector.addEventListener('mouseleave', this.mouseleaveHandler), this.selector.addEventListener('mousemove', this.mousemoveHandler), this.selector.addEventListener('click', this.clickHandler)) }}, {key: 'detachEvents', value: function () { window.removeEventListener('resize', this.resizeHandler), this.selector.removeEventListener('touchstart', this.touchstartHandler), this.selector.removeEventListener('touchend', this.touchendHandler), this.selector.removeEventListener('touchmove', this.touchmoveHandler), this.selector.removeEventListener('mousedown', this.mousedownHandler), this.selector.removeEventListener('mouseup', this.mouseupHandler), this.selector.removeEventListener('mouseleave', this.mouseleaveHandler), this.selector.removeEventListener('mousemove', this.mousemoveHandler), this.selector.removeEventListener('click', this.clickHandler) }}, {key: 'init', value: function () { this.attachEvents(), this.selector.style.overflow = 'hidden', this.selector.style.direction = this.config.rtl ? 'rtl' : 'ltr', this.buildSliderFrame(), this.config.onInit.call(this) }}, {key: 'buildSliderFrame', value: function () { var e = this.selectorWidth / this.perPage, t = this.config.loop ? this.innerElements.length + 2 * this.perPage : this.innerElements.length; this.sliderFrame = document.createElement('div'), this.sliderFrame.style.width = e * t + 'px', this.enableTransition(), this.config.draggable && (this.selector.style.cursor = '-webkit-grab'); var i = document.createDocumentFragment(); if (this.config.loop) for (var r = this.innerElements.length - this.perPage; r < this.innerElements.length; r++) { var n = this.buildSliderFrameItem(this.innerElements[r].cloneNode(!0)); i.appendChild(n) } for (var s = 0; s < this.innerElements.length; s++) { var l = this.buildSliderFrameItem(this.innerElements[s]); i.appendChild(l) } if (this.config.loop) for (var o = 0; o < this.perPage; o++) { var a = this.buildSliderFrameItem(this.innerElements[o].cloneNode(!0)); i.appendChild(a) } this.sliderFrame.appendChild(i), this.selector.innerHTML = '', this.selector.appendChild(this.sliderFrame), this.slideToCurrent() }}, {key: 'buildSliderFrameItem', value: function (e) { var t = document.createElement('div'); return t.style.cssFloat = this.config.rtl ? 'right' : 'left', t.style.float = this.config.rtl ? 'right' : 'left', t.style.width = (this.config.loop ? 100 / (this.innerElements.length + 2 * this.perPage) : 100 / this.innerElements.length) + '%', t.appendChild(e), t }}, {key: 'resolveSlidesNumber', value: function () { if (typeof this.config.perPage === 'number') this.perPage = this.config.perPage; else if (n(this.config.perPage) === 'object') { this.perPage = 1; for (var e in this.config.perPage)window.innerWidth >= e && (this.perPage = this.config.perPage[e]) } }}, {key: 'prev', value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = arguments[1]; if (!(this.innerElements.length <= this.perPage)) { var i = this.currentSlide; if (this.config.loop) { if (this.currentSlide - e < 0) { this.disableTransition(); var r = this.currentSlide + this.innerElements.length, n = this.perPage, s = r + n, l = (this.config.rtl ? 1 : -1) * s * (this.selectorWidth / this.perPage), o = this.config.draggable ? this.drag.endX - this.drag.startX : 0; this.sliderFrame.style[this.transformProperty] = 'translate3d(' + (l + o) + 'px, 0, 0)', this.currentSlide = r - e } else this.currentSlide = this.currentSlide - e } else this.currentSlide = Math.max(this.currentSlide - e, 0); i !== this.currentSlide && (this.slideToCurrent(this.config.loop), this.config.onChange.call(this), t && t.call(this)) } }}, {key: 'next', value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = arguments[1]; if (!(this.innerElements.length <= this.perPage)) { var i = this.currentSlide; if (this.config.loop) { if (this.currentSlide + e > this.innerElements.length - this.perPage) { this.disableTransition(); var r = this.currentSlide - this.innerElements.length, n = this.perPage, s = r + n, l = (this.config.rtl ? 1 : -1) * s * (this.selectorWidth / this.perPage), o = this.config.draggable ? this.drag.endX - this.drag.startX : 0; this.sliderFrame.style[this.transformProperty] = 'translate3d(' + (l + o) + 'px, 0, 0)', this.currentSlide = r + e } else this.currentSlide = this.currentSlide + e } else this.currentSlide = Math.min(this.currentSlide + e, this.innerElements.length - this.perPage); i !== this.currentSlide && (this.slideToCurrent(this.config.loop), this.config.onChange.call(this), t && t.call(this)) } }}, {key: 'disableTransition', value: function () { this.sliderFrame.style.webkitTransition = 'all 0ms ' + this.config.easing, this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing }}, {key: 'enableTransition', value: function () { this.sliderFrame.style.webkitTransition = 'all ' + this.config.duration + 'ms ' + this.config.easing, this.sliderFrame.style.transition = 'all ' + this.config.duration + 'ms ' + this.config.easing }}, {key: 'goTo', value: function (e, t) { if (!(this.innerElements.length <= this.perPage)) { var i = this.currentSlide; this.currentSlide = this.config.loop ? e % this.innerElements.length : Math.min(Math.max(e, 0), this.innerElements.length - this.perPage), i !== this.currentSlide && (this.slideToCurrent(), this.config.onChange.call(this), t && t.call(this)) } }}, {key: 'slideToCurrent', value: function (e) { var t = this, i = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide, r = (this.config.rtl ? 1 : -1) * i * (this.selectorWidth / this.perPage); e ? requestAnimationFrame(function () { requestAnimationFrame(function () { t.enableTransition(), t.sliderFrame.style[t.transformProperty] = 'translate3d(' + r + 'px, 0, 0)' }) }) : this.sliderFrame.style[this.transformProperty] = 'translate3d(' + r + 'px, 0, 0)' }}, {key: 'updateAfterDrag', value: function () { var e = (this.config.rtl ? -1 : 1) * (this.drag.endX - this.drag.startX), t = Math.abs(e), i = this.config.multipleDrag ? Math.ceil(t / (this.selectorWidth / this.perPage)) : 1, r = e > 0 && this.currentSlide - i < 0, n = e < 0 && this.currentSlide + i > this.innerElements.length - this.perPage; e > 0 && t > this.config.threshold && this.innerElements.length > this.perPage ? this.prev(i) : e < 0 && t > this.config.threshold && this.innerElements.length > this.perPage && this.next(i), this.slideToCurrent(r || n) }}, {key: 'resizeHandler', value: function () { this.resolveSlidesNumber(), this.currentSlide + this.perPage > this.innerElements.length && (this.currentSlide = this.innerElements.length <= this.perPage ? 0 : this.innerElements.length - this.perPage), this.selectorWidth = this.selector.offsetWidth, this.buildSliderFrame() }}, {key: 'clearDrag', value: function () { this.drag = {startX: 0, endX: 0, startY: 0, letItGo: null, preventClick: this.drag.preventClick} }}, {key: 'touchstartHandler', value: function (e) { ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) !== -1 || (e.stopPropagation(), this.pointerDown = !0, this.drag.startX = e.touches[0].pageX, this.drag.startY = e.touches[0].pageY) }}, {key: 'touchendHandler', value: function (e) { e.stopPropagation(), this.pointerDown = !1, this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag() }}, {key: 'touchmoveHandler', value: function (e) { if (e.stopPropagation(), this.drag.letItGo === null && (this.drag.letItGo = Math.abs(this.drag.startY - e.touches[0].pageY) < Math.abs(this.drag.startX - e.touches[0].pageX)), this.pointerDown && this.drag.letItGo) { e.preventDefault(), this.drag.endX = e.touches[0].pageX, this.sliderFrame.style.webkitTransition = 'all 0ms ' + this.config.easing, this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing; var t = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide, i = t * (this.selectorWidth / this.perPage), r = this.drag.endX - this.drag.startX, n = this.config.rtl ? i + r : i - r; this.sliderFrame.style[this.transformProperty] = 'translate3d(' + (this.config.rtl ? 1 : -1) * n + 'px, 0, 0)' } }}, {key: 'mousedownHandler', value: function (e) { ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) !== -1 || (e.preventDefault(), e.stopPropagation(), this.pointerDown = !0, this.drag.startX = e.pageX) }}, {key: 'mouseupHandler', value: function (e) { e.stopPropagation(), this.pointerDown = !1, this.selector.style.cursor = '-webkit-grab', this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag() }}, {key: 'mousemoveHandler', value: function (e) { if (e.preventDefault(), this.pointerDown) { e.target.nodeName === 'A' && (this.drag.preventClick = !0), this.drag.endX = e.pageX, this.selector.style.cursor = '-webkit-grabbing', this.sliderFrame.style.webkitTransition = 'all 0ms ' + this.config.easing, this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing; var t = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide, i = t * (this.selectorWidth / this.perPage), r = this.drag.endX - this.drag.startX, n = this.config.rtl ? i + r : i - r; this.sliderFrame.style[this.transformProperty] = 'translate3d(' + (this.config.rtl ? 1 : -1) * n + 'px, 0, 0)' } }}, {key: 'mouseleaveHandler', value: function (e) { this.pointerDown && (this.pointerDown = !1, this.selector.style.cursor = '-webkit-grab', this.drag.endX = e.pageX, this.drag.preventClick = !1, this.enableTransition(), this.updateAfterDrag(), this.clearDrag()) }}, {key: 'clickHandler', value: function (e) { this.drag.preventClick && e.preventDefault(), this.drag.preventClick = !1 }}, {key: 'remove', value: function (e, t) { if (e < 0 || e >= this.innerElements.length) throw new Error("Item to remove doesn't exist 😭"); var i = e < this.currentSlide, r = this.currentSlide + this.perPage - 1 === e; (i || r) && this.currentSlide--, this.innerElements.splice(e, 1), this.buildSliderFrame(), t && t.call(this) }}, {key: 'insert', value: function (e, t, i) { if (t < 0 || t > this.innerElements.length + 1) throw new Error('Unable to inset it at this index 😭'); if (this.innerElements.indexOf(e) !== -1) throw new Error('The same item in a carousel? Really? Nope 😭'); var r = t <= this.currentSlide > 0 && this.innerElements.length; this.currentSlide = r ? this.currentSlide + 1 : this.currentSlide, this.innerElements.splice(t, 0, e), this.buildSliderFrame(), i && i.call(this) }}, {key: 'prepend', value: function (e, t) { this.insert(e, 0), t && t.call(this) }}, {key: 'append', value: function (e, t) { this.insert(e, this.innerElements.length + 1), t && t.call(this) }}, {key: 'destroy', value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = arguments[1]; if (this.detachEvents(), this.selector.style.cursor = 'auto', e) { for (var i = document.createDocumentFragment(), r = 0; r < this.innerElements.length; r++)i.appendChild(this.innerElements[r]); this.selector.innerHTML = '', this.selector.appendChild(i), this.selector.removeAttribute('style') }t && t.call(this) }}], [{key: 'mergeSettings', value: function (e) { var t = {selector: '.siema', duration: 200, easing: 'ease-out', perPage: 1, startIndex: 0, draggable: !0, multipleDrag: !0, threshold: 20, loop: !1, rtl: !1, onInit: function () {}, onChange: function () {}}, i = e; for (var r in i)t[r] = i[r]; return t }}, {key: 'webkitOrNot', value: function () { return typeof document.documentElement.style.transform === 'string' ? 'transform' : 'WebkitTransform' }}]), e }()); t.default = l, e.exports = t.default }])) }))*/

const menuButton = document.querySelector('.button--overlay')
menuButton.addEventListener('click', overlay)
const sliderContainer = document.querySelector('.jsSeimaSlider')

function overlay () {
  document.querySelector('.overlay').classList.toggle('active')
  menuButton.classList.toggle('active')
  document.querySelector('body').classList.toggle('noscroll')
}

// INFO PAGE SEARCH
const pageSearch = document.querySelector('#page__search')
if (pageSearch != null) {
  pageSearch.addEventListener('input', searchPage)
}

function searchPage () {
  let numOfResults = 0
  const searchText = pageSearch.value.toLowerCase()
  const listContainer = document.querySelector('#list--info')
  const dataRows = listContainer.querySelectorAll('.list__row')
  for (let row in dataRows) {
    const rowElement = dataRows[row]
    if (rowElement.dataset != null) {
      const key1 = rowElement.dataset.key1.toLowerCase()
      const key2 = rowElement.dataset.key2.toLowerCase()
      const tags = [key1, key2]
      if ('key3' in rowElement.dataset) {
        const key3 = rowElement.dataset.key3.toLowerCase()
        tags[2] = key3
      }
      if (searchText.length > 0) {
        if (search(tags, searchText) === true) {
          numOfResults++
          rowElement.style.display = 'grid'
        } else {
          rowElement.style.display = 'none'
        }
      } else {
        rowElement.style.display = 'grid'
      }
    }
  }
  if (searchText.length > 0) {
    showResultsCounter(numOfResults)
  } else {
    hideResultsCounter()
  }
}

function showResultsCounter (numOfResults) {
  const resultsCount = document.querySelector('.resultsCounter')
  resultsCount.innerHTML = numOfResults + ' results found'
  resultsCount.style.display = 'block'
}

function hideResultsCounter () {
  const resultsCount = document.querySelector('.resultsCounter')
  resultsCount.style.display = 'none'
}

function search (tags, searchText) {
  for (let tag in tags) {
    if (tags[tag].includes(searchText)) {
      return true
    }
  }
}
/*
// SLIDER
let intervalID = null
let mouseDownIntervalID = null
let siema = null
if (sliderContainer !== null) {
  siema = new Siema({
    selector: '.jsSeimaSlider',
    duration: 1000,
    easing: 'ease-out',
    threshold: window.innerWidth / 6,
    loop: true,
    onChange: sliderAutoPlay
  })
  sliderAutoPlay()
  const prevButton = document.querySelector('.slider__prev')
  const nextButton = document.querySelector('.slider__next')
  prevButton.addEventListener('click', () => siema.prev())
  nextButton.addEventListener('click', () => siema.next())
  sliderContainer.addEventListener('mousedown', mouseDownInterval, false)
  sliderContainer.addEventListener('mouseup', () => clearMouseDownInterval())
}
function sliderAutoPlay () {
  clearSliderAutoPlay()
  intervalID = setInterval(() => siema.next(), 5000)
}
function clearSliderAutoPlay () {
  clearInterval(intervalID)
}
function mouseDownInterval (e) {
  if (e.target.tagName !== 'A') {
    clearSliderAutoPlay()
    clearMouseDownInterval()
    mouseDownIntervalID = setInterval(() => mouseDownInterval(e), 200)
  } else {
    if (e.button === 0) {
      e.target.click()
    }
  }
}
function clearMouseDownInterval () {
  clearInterval(mouseDownIntervalID)
} */

// ADS

function showAdblockMessages () {
  const ads = document.querySelectorAll('ins.adsbygoogle')
  for (let ad of ads) {
    if (ad && ad.innerHTML.replace(/\s/g, '').length === 0) {
      ad.style.cssText = 'display:block !important'
      const adMessageElement = ad.parentElement.querySelector('.ad__message')
      if (adMessageElement !== null) {
        adMessageElement.style = 'display:block !important'
      }
    } else {
      ad.parentElement.classList.add('loaded')
    }
  }
}

// PROFILE FILTER
/*
const filterContainer = document.querySelector('.content__filter')
if (filterContainer !== null) {
  const filterGirl = filterContainer.querySelector('[data-type="filter-girl"] ')
  const filterBoy = filterContainer.querySelector('[data-type="filter-boy"] ')
  const filterCoed = filterContainer.querySelector('[data-type="filter-coed"] ')
  const filterSoloist = filterContainer.querySelector('[data-type="filter-soloist"] ')
  filterGirl.addEventListener('change', loadFilter)
  filterBoy.addEventListener('change', loadFilter)
  filterCoed.addEventListener('change', loadFilter)
  filterSoloist.addEventListener('change', loadFilter)
}

function loadFilter (e) {
  const type = e.target.dataset.type
  const resultsCounter = document.querySelector('.resultsCounter')
  const currentTypesBool = {
    girl: filterContainer.querySelector('[data-type="filter-girl"] ').checked,
    boy: filterContainer.querySelector('[data-type="filter-boy"] ').checked,
    coed: filterContainer.querySelector('[data-type="filter-coed"] ').checked,
    soloist: filterContainer.querySelector('[data-type="filter-soloist"] ').checked
  }
  const currentTypesArray = []
  if (currentTypesBool.girl === true) {
    currentTypesArray.push('GIRLGROUP')
  }
  if (currentTypesBool.boy === true) {
    currentTypesArray.push('BOYGROUP')
  }
  if (currentTypesBool.coed === true) {
    currentTypesArray.push('COEDGROUP')
  }
  if (currentTypesBool.soloist === true) {
    currentTypesArray.push('SOLOIST')
  }
  let numOfResults = 0
  const gridContainer = document.querySelector('.grid')
  const dataGrids = gridContainer.querySelectorAll('.grid__item')
  for (let grid of dataGrids) {
    if (grid.dataset.type != null) {
      const type = grid.dataset.type
      if (search(currentTypesArray, type)) {
        numOfResults++
        grid.style.display = 'block'
      } else {
        grid.style.display = 'none'
      }
    } else {
      grid.style.display = 'block'
    }
  }
  if (numOfResults > 0) {
    resultsCounter.style.display = 'none'
  } else {
    resultsCounter.style.display = 'block'
    resultsCounter.innerHTML = 'No profile results for the current profile type filters'
  }
}
*/
window.onload = function () {
  setTimeout(function () {
    showAdblockMessages()
  }, 100)
  setTimeout(function () {
    showAdblockMessages()
  }, 3000)
}
