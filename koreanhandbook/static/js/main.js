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
/*! no static exports found */
/***/ (function(module, exports) {

eval("const menuButton = document.querySelector('.button--overlay')\r\nmenuButton.addEventListener('click', overlay)\r\n\r\nfunction overlay () {\r\n  document.querySelector('.overlay').classList.toggle('active')\r\n  menuButton.classList.toggle('active')\r\n  document.querySelector('body').classList.toggle('noscroll')\r\n}\r\n\r\n// Info page search\r\nconst pageSearch = document.querySelector('#page__search')\r\nif (pageSearch !== null) {\r\n  pageSearch.addEventListener('input', searchPage)\r\n}\r\n\r\n// Iterate through list rows only showing matching rows\r\nfunction searchPage () {\r\n  let numOfResults = 0\r\n  const searchText = pageSearch.value.toLowerCase()\r\n  const listContainer = document.querySelector('#list--info')\r\n  const dataRows = listContainer.querySelectorAll('.list__row')\r\n  for (let row in dataRows) {\r\n    if (dataRows.hasOwnProperty(row)) {\r\n      const rowElement = dataRows[row]\r\n      if (rowElement.dataset !== null) {\r\n        const key1 = rowElement.dataset.key1.toLowerCase()\r\n        const key2 = rowElement.dataset.key2.toLowerCase()\r\n        let tags = [key1, key2]\r\n        if ('key3' in rowElement.dataset) {\r\n          const key3 = rowElement.dataset.key3.toLowerCase()\r\n          tags = tags.concat([key3])\r\n        }\r\n        if (searchText.length > 0) {\r\n          if (search(tags, searchText) === true) {\r\n            numOfResults++\r\n            rowElement.style.display = 'grid'\r\n          } else {\r\n            rowElement.style.display = 'none'\r\n          }\r\n        } else {\r\n          rowElement.style.display = 'grid'\r\n        }\r\n      }\r\n    }\r\n  }\r\n  if (searchText.length > 0) {\r\n    showResultsCounter(numOfResults)\r\n  } else {\r\n    hideResultsCounter()\r\n  }\r\n}\r\n\r\nfunction showResultsCounter (numOfResults) {\r\n  const resultsCount = document.querySelector('.resultsCounter')\r\n  resultsCount.innerHTML = numOfResults + ' results found'\r\n  resultsCount.style.display = 'block'\r\n}\r\n\r\nfunction hideResultsCounter () {\r\n  const resultsCount = document.querySelector('.resultsCounter')\r\n  resultsCount.style.display = 'none'\r\n}\r\n\r\nfunction search (tags, searchText) {\r\n  for (let tag in tags) {\r\n    if (tags[tag].includes(searchText)) {\r\n      return true\r\n    }\r\n  }\r\n}\r\n\r\n// Korean Clock\r\nfunction getTime (date) {\r\n  const minutes = `0${date.getMinutes()}`.slice(-2)\r\n  let hours\r\n  if (date.getHours() <= 12) {\r\n    hours = date.getHours()\r\n  } else {\r\n    hours = date.getHours() - 12\r\n  }\r\n  const time = `${hours}:${minutes}`\r\n  return time\r\n}\r\n\r\nfunction getDay (date) {\r\n  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']\r\n  const dayNumber = date.getDay()\r\n  return days[dayNumber]\r\n}\r\n\r\nfunction getMonth (date) {\r\n  return date.getMonth() + 1\r\n}\r\n\r\nfunction displayClock () {\r\n  const date = new Date()\r\n  const time = getTime(date)\r\n  const day = getDay(date)\r\n  const month = getMonth(date)\r\n  const hours = date.getHours()\r\n  const shortDate = `${date.getFullYear()}년 ${month}월 ${date.getDate()}일 ${day}`\r\n  let prefix\r\n  if (hours > 12) {\r\n    prefix = '오후'\r\n  } else {\r\n    prefix = '오전'\r\n  }\r\n  document.querySelector('#prefix').textContent = prefix\r\n  document.querySelector('#time').textContent = time\r\n  document.querySelector('#date').textContent = shortDate\r\n}\r\n\r\nfunction startClock () {\r\n  displayClock()\r\n  setInterval(displayClock, 1000)\r\n}\r\n\r\ntry {\r\n  if (document.querySelector('#clock')) {\r\n    startClock()\r\n  }\r\n} catch (e) {\r\n}\r\n\r\n// Lazy load\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n  let lazyImages = [].slice.call(document.querySelectorAll('.lazy-bg-image'))\r\n\r\n  // Check if intersection observer available else switch to less performant fallback\r\n  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {\r\n    const lazyImageObserver = new IntersectionObserver(function (entries, observer) {\r\n      entries.forEach(function (entry) {\r\n        if (entry.isIntersecting) {\r\n          const lazyImage = entry.target\r\n          lazyImage.style.opacity = '0'\r\n          lazyImage.style['transition-property'] = 'opacity'\r\n          lazyImage.style['transition-duration'] = '20s'\r\n          lazyImage.style['transition-timing-function'] = 'ease-in-out'\r\n          lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`\r\n          lazyImage.style.opacity = '1'\r\n\r\n          lazyImage.classList.remove('lazy')\r\n          lazyImageObserver.unobserve(lazyImage)\r\n        }\r\n      })\r\n    })\r\n\r\n    lazyImages.forEach(function (lazyImage) {\r\n      lazyImageObserver.observe(lazyImage)\r\n    })\r\n  } else {\r\n    let active = false\r\n\r\n    // Fallback\r\n    const fallbackLazyLoad = function () {\r\n      if (active === false) {\r\n        active = true\r\n\r\n        setTimeout(function () {\r\n          lazyImages.forEach(function (lazyImage) {\r\n            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== 'none') {\r\n              lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`\r\n              lazyImage.classList.remove('lazy')\r\n\r\n              lazyImages = lazyImages.filter(function (image) {\r\n                return image !== lazyImage\r\n              })\r\n\r\n              // Cleanup once all images loaded\r\n              if (lazyImages.length === 0) {\r\n                document.removeEventListener('scroll', fallbackLazyLoad)\r\n                window.removeEventListener('resize', fallbackLazyLoad)\r\n                window.removeEventListener('orientationchange', fallbackLazyLoad)\r\n              }\r\n            }\r\n          })\r\n\r\n          active = false\r\n        }, 200)\r\n      }\r\n    }\r\n\r\n    fallbackLazyLoad()\r\n    document.addEventListener('scroll', fallbackLazyLoad)\r\n    window.addEventListener('resize', fallbackLazyLoad)\r\n    window.addEventListener('orientationchange', fallbackLazyLoad)\r\n  }\r\n})\r\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });