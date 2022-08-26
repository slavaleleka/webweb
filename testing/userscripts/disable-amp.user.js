// ==UserScript==
// @name Disable AMP Dev
// @name:ar تعطيل AMP Dev
// @name:be Адключыць AMP Dev
// @name:bg Деактивирайте AMP Dev
// @name:cs Zakázat AMP Dev
// @name:da Deaktiver AMP Dev
// @name:de AMP deaktivieren Dev
// @name:es Deshabilitar AMP Dev
// @name:et Keela AMP Dev
// @name:fa غيرفعالسازي شتاب دهنده صفحات موبایل Dev
// @name:fr Désactiver AMP Dev
// @name:he AMP השבת Dev
// @name:hr Onemogući AMP Dev
// @name:hu AMP letiltása Dev
// @name:id Nonaktifkan AMP Dev
// @name:it Disattiva AMP Dev
// @name:ja AMPを無効化 Dev
// @name:ko AMP 비활성화 Dev
// @name:lt Išjungti AMP Dev
// @name:ms Nyahdayakan AMP Dev
// @name:nl AMP uitschakelen Dev
// @name:pl Wyłącz AMP Dev
// @name:pt-PT Desactivar AMP Dev
// @name:pt Desativar AMP Dev
// @name:ro Dezactivare AMP Dev
// @name:ru Отключить AMP Dev
// @name:sk Vypnúť AMP Dev
// @name:sl Onemogoči AMP Dev
// @name:sr Isključi sve Dev
// @name:sv Stäng av AMP Dev
// @name:tr AMP'yi devre dışı bırak Dev
// @name:uk Вимкнути AMP Dev
// @name:vi Vô hiệu hóa AMP Dev
// @name:zh-TW 禁用加速的行動頁面（AMP） Dev
// @name:zh 禁用 AMP Dev
// @namespace    adguard
// @version      1.0.20
// @description This is a very simple userscript that disables AMP on the Google search results page.
// @description:ar هذا سكربت بسيط جدا، يعمل على تعطل AMP في صفحات بحث Google.
// @description:be Гэта - вельмі просты скрыпт, які прыбірае AMP з вынікаў пошуку Google.
// @description:bg Това е много прост потребителски скрипт, който деактивира AMP на страницата с резултати от търсенето с Google.
// @description:cs Jedná se o velmi jednoduchý uživatelský skript, který zakáže AMP na stránce s výsledky vyhledávání Google.
// @description:da Dette er et meget simpelt userscript, der deaktiverer AMP på Googles søgeresultatside.
// @description:de Dies ist ein sehr einfaches Userscript, das AMP auf der Seite der Google-Suchergebnisse deaktiviert.
// @description:es Este es un userscript muy simple que deshabilita AMP en la página de resultados de búsqueda de Google.
// @description:et Tegemist on lihtsa kasutajaskriptiga, mis keelab Google otsingutulemustes AMP-i.
// @description:fa این یک یوزراسکریپت بسیار ساده است که شتاب دهنده صفحات موبایل را در نتایج صفحه جستجو گوگل غیرفعال می کند.
// @description:fr C'est un script utilisateur très simple pour désactiver AMP sur les pages de résultats de Google.
// @description:he זהו סקריפט משתמש פשוט מאוד שמשבית את AMP בדף תוצאות החיפוש של גוגל
// @description:hr Ovo je jednostavan userscript koji onemogućuje AMP u Google rezultatima pretraživanja.
// @description:hu Ez egy nagyon egyszerű szkript, amely letiltja az AMP szolgáltatást a Google keresési eredményoldalán.
// @description:id Ini adalah userscript yang sangat mudah yang dapat menonaktifkan AMP pada halaman hasil pencarian Google.
// @description:it Questo è uno script personalizzato molto semplice che rimuove AMP dai risultati nelle pagine di ricerca di Google.
// @description:ja Google検索結果ページでAMPを無効にするシンプルなユーザースクリプトです。
// @description:ko 이것은 Google 검색 결과 페이지에서 AMP를 비활성화하는 매우 간단한 사용자 스크립트입니다.
// @description:lt Tai labai paprastas naudotojo skriptas, atjungiantis AMP Google paieškos rezultatų puslapyje.
// @description:ms Ini adalah skrip pengguna sangat ringkas yang menyahdayakan AMP pada laman hasil carian Google.
// @description:nl Dit is een eenvoudig userscript dat AMP uitschakelt op de Google zoek resultaatspagina.
// @description:pl Jest to bardzo prosty skrypt użytkownika, który wyłącza AMP na stronie wyników wyszukiwania Google.
// @description:pt-PT Este é um script muito simples que desactiva as AMP na página de resultados de pesquisa do Google.
// @description:pt Este é um script muito simples que desativa o AMP na página de resultados de pesquisa do Google.
// @description:ro Dezactivați AMP în pagina de rezultate căutare Google cu acest foarte simplu script utilizator.
// @description:ru Это очень простой скрипт, который убирает AMP из результатов поиска Google.
// @description:sk Toto je veľmi jednoduchý používateľský skript, ktorý na stránke s výsledkami vyhľadávania Google zakáže AMP.
// @description:sl To je zelo preprost uporabniški skript, ki onemogoči AMP na Googlovi strani z rezultati iskanja.
// @description:sr Ovo je veoma jednostavan userscript koji isključuje AMP na stranici sa rezultatima Google pretrage.
// @description:sv Det här är ett väldigt enkelt användarskript som förhindrar AMP i Googles sökresultat.
// @description:tr Bu, Google arama sonuçları sayfasında AMP’yi devre dışı bırakan çok basit bir kullanıcı betiğidir.
// @description:uk Це дуже простий користувацький скрипт, який вимикає AMP на сторінці результатів пошуку Google.
// @description:vi Đây là một mô tả người dùng rất đơn giản, vô hiệu hóa AMP trên trang kết quả tìm kiếm của Google.
// @description:zh-TW 這是一個非常簡單的使用者腳本，其禁用於 Google 搜尋結果頁面上之加速的行動頁面（AMP）。
// @description:zh 这是一个非常简单的用于在 Google 搜索结果页禁用 AMP 的用户脚本。
// @downloadURL
// @updateURL
// @homepageURL  https://adguard.com/
// @author       AdGuard
// @include      https://www.google.*/*
// @include      https://yandex.*/*
// @include      https://*.turbopages.org/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/google-amp.js":
/*!***************************!*\
  !*** ./src/google-amp.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar URL_PATTERN_REGEX = /^https?:\\/\\/.+/i;\nvar expando = \"__\".concat(Math.random());\nvar HTTPS = 'https://';\n/**\n * Hide AMP icon for AMP element in google search results\n * @param amp element\n */\n\nvar hideAmpIcon = function hideAmpIcon(amp) {\n  var ampIcon = amp.querySelector('[aria-label=\"AMP logo\"], [aria-label=\"Logo AMP\"]');\n\n  if (ampIcon) {\n    ampIcon.style.display = 'none';\n  }\n};\n/**\n * Redirects amp version to normal\n */\n\n\nvar ampRedirect = function ampRedirect() {\n  if (document.location.pathname.includes('/amp/')) {\n    var _document$querySelect;\n\n    var originalUrl = (_document$querySelect = document.querySelector('#amp-hdr .amp-cantxt')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.textContent;\n\n    if (originalUrl && URL_PATTERN_REGEX.test(originalUrl)) {\n      document.location.replace(originalUrl);\n    }\n  }\n};\n/**\n * Replaces amp links by data-amp-cur attribute value\n */\n\n\nvar replaceByAmpCurAttribute = function replaceByAmpCurAttribute() {\n  var elements = document.querySelectorAll('a.amp_r[data-amp-cur]');\n\n  _toConsumableArray(elements).forEach(function (el) {\n    if (el[expando]) {\n      return;\n    } // eslint-disable-next-line no-param-reassign\n\n\n    el[expando] = true;\n    var url = el.getAttribute('data-amp-cur');\n\n    if (!url) {\n      return;\n    }\n\n    el.setAttribute('href', url);\n    el.addEventListener('click', function (e) {\n      e.preventDefault();\n      e.stopPropagation(); // https://github.com/AdguardTeam/DisableAMP/pull/15\n\n      document.location.href = url;\n    }, true);\n    hideAmpIcon(el);\n  });\n};\n/**\n * Replaces amp links provided by amp cdn\n */\n\n\nvar replaceCdnAmp = function replaceCdnAmp() {\n  var ampLinks = document.querySelectorAll('a[data-amp-cdn]');\n  ampLinks.forEach(function (ampLink) {\n    var fixedUrl = ampLink.href;\n\n    if (fixedUrl.includes('cdn.ampproject.org')) {\n      fixedUrl = HTTPS + fixedUrl.substr(fixedUrl.indexOf('cdn.ampproject.org/wp/s/') + 24);\n    }\n\n    if (fixedUrl.substr(8).startsWith('amp.')) {\n      fixedUrl = HTTPS + fixedUrl.substr(12);\n    }\n\n    fixedUrl = fixedUrl.replace('?amp&', '?&');\n\n    if (fixedUrl !== ampLink.href) {\n      ampLink.setAttribute('href', fixedUrl);\n      ampLink.addEventListener('click', function (e) {\n        e.preventDefault();\n        e.stopPropagation();\n        document.location.href = fixedUrl;\n      }, true);\n      hideAmpIcon(ampLink);\n    }\n  });\n};\n\nvar preventAmp = function preventAmp() {\n  ampRedirect();\n  replaceByAmpCurAttribute();\n  replaceCdnAmp();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (preventAmp);\n\n//# sourceURL=webpack:///./src/google-amp.js?");

    /***/ }),

    /***/ "./src/index.js":
    /*!**********************!*\
      !*** ./src/index.js ***!
      \**********************/
    /*! no exports provided */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _yandex_turbo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./yandex-turbo */ \"./src/yandex-turbo.js\");\n/* harmony import */ var _google_amp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./google-amp */ \"./src/google-amp.js\");\n\n\n\nvar observeDomChanges = function observeDomChanges(callback) {\n  new MutationObserver(callback).observe(document, {\n    childList: true,\n    subtree: true\n  });\n};\n\nif (document.location.origin.includes('google.')) {\n  observeDomChanges(_google_amp__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n}\n\nif (document.location.origin.includes('yandex.')) {\n  observeDomChanges(_yandex_turbo__WEBPACK_IMPORTED_MODULE_0__[\"disableTurbo\"]);\n}\n\nif (document.location.href.includes('https://yandex.ru/turbo/')) {\n  Object(_yandex_turbo__WEBPACK_IMPORTED_MODULE_0__[\"redirectTurboPages\"])();\n}\n\n//# sourceURL=webpack:///./src/index.js?");

    /***/ }),

    /***/ "./src/yandex-turbo.js":
    /*!*****************************!*\
      !*** ./src/yandex-turbo.js ***!
      \*****************************/
    /*! exports provided: disableTurbo, redirectTurboPages */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"disableTurbo\", function() { return disableTurbo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"redirectTurboPages\", function() { return redirectTurboPages; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n/**\n * Hides Turbo page icon\n * @param {object} turboLink\n */\nvar hideTurboIcon = function hideTurboIcon(turboLink) {\n  if (turboLink.querySelector('.text-with-icon')) {\n    turboLink.style.position = 'absolute';\n    turboLink.style.left = '-99999px';\n  }\n};\n/**\n * Disables Yandex Turbo pages\n */\n\n\nvar disableTurbo = function disableTurbo() {\n  var turboLinks = document.querySelectorAll('a[href^=\"https://yandex.ru/turbo/\"]');\n\n  _toConsumableArray(turboLinks).forEach(function (link) {\n    var originalUrl = link.href.replace('yandex.ru/turbo/', '').replace('/s/', '/');\n    link.setAttribute('href', originalUrl);\n    link.addEventListener('click', function (event) {\n      event.preventDefault();\n      event.stopPropagation();\n      document.location.href = originalUrl;\n    }, true);\n    hideTurboIcon(link);\n  });\n};\n/**\n * Redirects from Yandex Turbo page to normal version\n */\n\n\nvar redirectTurboPages = function redirectTurboPages() {\n  var originalUrl = document.location.href.split('yandex.ru/turbo/').pop().replace('/s/', '/');\n  var protocol = document.location.protocol;\n\n  if (originalUrl && protocol) {\n    document.location.href = \"\".concat(protocol, \"//\").concat(originalUrl);\n  }\n};\n\n\n\n//# sourceURL=webpack:///./src/yandex-turbo.js?");

    /***/ })

    /******/ });
