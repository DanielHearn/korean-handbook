/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../scss/main.scss */ \"./src/scss/main.scss\");\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);\n\nvar menuButton = document.querySelector('.button--overlay');\nmenuButton.addEventListener('click', overlay);\n\nfunction overlay() {\n  document.querySelector('.overlay').classList.toggle('active');\n  menuButton.classList.toggle('active');\n  document.querySelector('body').classList.toggle('noscroll');\n} // Info page search\n\n\nvar pageSearch = document.querySelector('#page__search');\n\nif (pageSearch !== null) {\n  pageSearch.addEventListener('input', searchPage);\n} // Iterate through list rows only showing matching rows\n\n\nfunction searchPage() {\n  var numOfResults = 0;\n  var searchText = pageSearch.value.toLowerCase();\n  var listContainer = document.querySelector('#list--info');\n  var dataRows = listContainer.querySelectorAll('.list__row');\n\n  for (var row in dataRows) {\n    if (dataRows.hasOwnProperty(row)) {\n      var rowElement = dataRows[row];\n\n      if (rowElement.dataset !== null) {\n        var key1 = rowElement.dataset.key1.toLowerCase();\n        var key2 = rowElement.dataset.key2.toLowerCase();\n        var tags = [key1, key2];\n\n        if ('key3' in rowElement.dataset) {\n          var key3 = rowElement.dataset.key3.toLowerCase();\n          tags = tags.concat([key3]);\n        }\n\n        if (searchText.length > 0) {\n          if (search(tags, searchText) === true) {\n            numOfResults++;\n            rowElement.style.display = 'grid';\n          } else {\n            rowElement.style.display = 'none';\n          }\n        } else {\n          rowElement.style.display = 'grid';\n        }\n      }\n    }\n  }\n\n  if (searchText.length > 0) {\n    showResultsCounter(numOfResults);\n  } else {\n    hideResultsCounter();\n  }\n}\n\nfunction showResultsCounter(numOfResults) {\n  var resultsCount = document.querySelector('.resultsCounter');\n  resultsCount.innerHTML = numOfResults + ' results found';\n  resultsCount.style.display = 'block';\n}\n\nfunction hideResultsCounter() {\n  var resultsCount = document.querySelector('.resultsCounter');\n  resultsCount.style.display = 'none';\n}\n\nfunction search(tags, searchText) {\n  for (var tag in tags) {\n    if (tags[tag].includes(searchText)) {\n      return true;\n    }\n  }\n} // Korean Clock\n\n\nfunction getTime(date) {\n  var minutes = \"0\".concat(date.getMinutes()).slice(-2);\n  var hours;\n\n  if (date.getHours() <= 12) {\n    hours = date.getHours();\n  } else {\n    hours = date.getHours() - 12;\n  }\n\n  var time = \"\".concat(hours, \":\").concat(minutes);\n  return time;\n}\n\nfunction getDay(date) {\n  var days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];\n  var dayNumber = date.getDay();\n  return days[dayNumber];\n}\n\nfunction getMonth(date) {\n  return date.getMonth() + 1;\n}\n\nfunction displayClock() {\n  var date = new Date();\n  var time = getTime(date);\n  var day = getDay(date);\n  var month = getMonth(date);\n  var hours = date.getHours();\n  var shortDate = \"\".concat(date.getFullYear(), \"\\uB144 \").concat(month, \"\\uC6D4 \").concat(date.getDate(), \"\\uC77C \").concat(day);\n  var prefix;\n\n  if (hours > 12) {\n    prefix = '오후';\n  } else {\n    prefix = '오전';\n  }\n\n  document.querySelector('#prefix').textContent = prefix;\n  document.querySelector('#time').textContent = time;\n  document.querySelector('#date').textContent = shortDate;\n}\n\nfunction startClock() {\n  displayClock();\n  setInterval(displayClock, 1000);\n}\n\ntry {\n  if (document.querySelector('#clock')) {\n    startClock();\n  }\n} catch (e) {} // Lazy load\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var lazyImages = [].slice.call(document.querySelectorAll('.lazy-bg-image')); // Check if intersection observer available else switch to less performant fallback\n\n  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {\n    var lazyImageObserver = new IntersectionObserver(function (entries, observer) {\n      entries.forEach(function (entry) {\n        if (entry.isIntersecting) {\n          var lazyImage = entry.target;\n          lazyImage.classList.add('lazy-loaded');\n          lazyImage.style.backgroundImage = \"url(\".concat(lazyImage.dataset.src, \")\");\n          lazyImage.classList.remove('lazy-bg-image');\n          lazyImageObserver.unobserve(lazyImage);\n        }\n      });\n    });\n    lazyImages.forEach(function (lazyImage) {\n      lazyImageObserver.observe(lazyImage);\n    });\n  } else {\n    var active = false; // Fallback\n\n    var fallbackLazyLoad = function fallbackLazyLoad() {\n      if (active === false) {\n        active = true;\n        setTimeout(function () {\n          lazyImages.forEach(function (lazyImage) {\n            if (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0 && getComputedStyle(lazyImage).display !== 'none') {\n              lazyImage.style.backgroundImage = \"url(\".concat(lazyImage.dataset.src, \")\");\n              lazyImage.classList.add('lazy-loaded');\n              lazyImage.classList.remove('lazy-bg-image');\n              lazyImages = lazyImages.filter(function (image) {\n                return image !== lazyImage;\n              }); // Cleanup once all images loaded\n\n              if (lazyImages.length === 0) {\n                document.removeEventListener('scroll', fallbackLazyLoad);\n                window.removeEventListener('resize', fallbackLazyLoad);\n                window.removeEventListener('orientationchange', fallbackLazyLoad);\n              }\n            }\n          });\n          active = false;\n        }, 200);\n      }\n    };\n\n    fallbackLazyLoad();\n    document.addEventListener('scroll', fallbackLazyLoad);\n    window.addEventListener('resize', fallbackLazyLoad);\n    window.addEventListener('orientationchange', fallbackLazyLoad);\n  }\n});\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ })

/******/ });