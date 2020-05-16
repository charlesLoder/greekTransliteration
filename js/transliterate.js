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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ({

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(29);


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

var inputBtn = document.querySelector('#input_button');
var input = document.querySelector('#input');
var output = document.querySelector('#output');
var grc = __webpack_require__(30);
var transliterate = grc.transliterate;

inputBtn.addEventListener('click', function () {
    var grcText = input.value;
    var transText = transliterate(grcText);
    output.value = transText;
});

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var transliterate_1 = __webpack_require__(31);
exports.transliterate = transliterate_1.transliterate;


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var titForTat_1 = __webpack_require__(32);
var testEach_1 = __webpack_require__(34);
exports.transliterate = function (text) {
    var normalize = text.normalize("NFKD");
    var titTat = titForTat_1.titForTat(normalize);
    var array = titTat.split(" ");
    var modArray = testEach_1.testEach(array);
    var transliteration = modArray.join(" ");
    return transliteration;
};


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var grcCharsTrans_1 = __webpack_require__(33);
exports.titForTat = function (text) {
    return __spread(text).map(function (char) { return (char in grcCharsTrans_1.transliterateMap ? grcCharsTrans_1.transliterateMap[char] : char); })
        .reduce(function (a, c) { return a + c; });
};


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.transliterateMap = {
    // # Greek-Coptic
    //   ## Archaic letters
    Ͱ: "",
    ͱ: "",
    Ͳ: "",
    ͳ: "",
    //   ## Numeral signs
    ʹ: "",
    "\u0375": "",
    //   ## Archaic letters
    Ͷ: "",
    ͷ: "",
    //   ## Iota subscript
    ͺ: "",
    //   ## Lowercase of editorial symbols
    ͻ: "",
    ͼ: "",
    ͽ: "",
    //   ## Additional letter
    // Ϳ: "", // GREEK CAPITAL LETTER YOT (U+037F)
    // ##  Capitals
    Α: "a",
    Β: "b",
    Γ: "g",
    Δ: "d",
    Ε: "e",
    Ζ: "z",
    Η: "ē",
    Θ: "th",
    Ι: "i",
    Κ: "k",
    Λ: "l",
    Μ: "m",
    Ν: "n",
    Ξ: "x",
    Ο: "o",
    Π: "p",
    Ρ: "r",
    Σ: "s",
    Τ: "t",
    Υ: "y",
    Φ: "ph",
    Χ: "ch",
    Ψ: "ps",
    Ω: "ō",
    //   ## Lowercase
    α: "a",
    β: "b",
    γ: "g",
    δ: "d",
    ε: "e",
    ζ: "z",
    η: "ē",
    θ: "th",
    ι: "i",
    κ: "k",
    λ: "l",
    μ: "m",
    ν: "n",
    ξ: "x",
    ο: "o",
    π: "p",
    ρ: "r",
    ς: "s",
    σ: "s",
    τ: "t",
    υ: "y",
    φ: "ph",
    χ: "ch",
    ψ: "ps",
    ω: "ō",
    //  ## Variant letterforms
    Ϗ: "",
    ϐ: "",
    ϑ: "",
    ϒ: "",
    ϓ: "",
    ϔ: "",
    ϕ: "",
    ϖ: "",
    ϗ: "",
    //   ## Archaic letters
    Ϙ: "",
    ϙ: "",
    Ϛ: "",
    ϛ: "",
    Ϝ: "",
    ϝ: "",
    Ϟ: "",
    ϟ: "",
    Ϡ: "",
    ϡ: "",
    //   ## Coptic letters derived from Demotic
    Ϣ: "",
    ϣ: "",
    Ϥ: "",
    ϥ: "",
    Ϧ: "",
    ϧ: "",
    Ϩ: "",
    ϩ: "",
    Ϫ: "",
    ϫ: "",
    Ϭ: "",
    ϭ: "",
    Ϯ: "",
    ϯ: "",
    //   ## Variant letterforms
    ϰ: "",
    ϱ: "",
    ϲ: "",
    //   ## Additional letter
    ϳ: "",
    // ## Variant letterforms and symbols
    ϴ: "",
    ϵ: "",
    "\u03F6": "",
    // ## Additional archaic letters for Bactrian
    Ϸ: "",
    ϸ: "",
    // ## Variant letterform
    Ϲ: "",
    // ## Archaic letters
    Ϻ: "",
    ϻ: "",
    // ## Symbol
    ϼ: "",
    // ## Editorial symbols
    Ͻ: "",
    Ͼ: "",
    Ͽ: "",
    // Characters from NFKD normalization
    "\u00B7": "",
    "\u0300": "",
    "\u0301": "",
    "\u0304": "",
    "\u0306": "",
    "\u0313": "",
    //   "\u{0314}": "\u{0314}", // DASIA (i.e. rough breathing mark) > COMBINING REVERSED COMMA ABOVE
    "\u0342": "",
    "\u0345": "" // YPOGEGRAMMENI > COMBINING GREEK YPOGEGRAMMENI
};


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var changeElementSplit = function (input, split, join) { return input.split(split).join(join); };
var changeElementSubstr = function (input, index, join) {
    return input.substring(0, index - 1) + join + input.substring(index - 1, index) + input.substring(index + 1);
};
var rules = function (array) {
    return array.map(function (element) {
        // tests for gg > ng
        if (/gg/.test(element)) {
            element = changeElementSplit(element, /gg/, "ng");
        }
        // tests for gk > nk
        if (/gk/.test(element)) {
            element = changeElementSplit(element, /gk/, "nk");
        }
        // tests for gx > nx
        if (/gx/.test(element)) {
            element = changeElementSplit(element, /gx/, "nx");
        }
        // tests for gch > nch
        if (/gc/.test(element)) {
            element = changeElementSplit(element, /gc/, "nc");
        }
        // tests initial rho
        if (/r\u{0314}/u.test(element)) {
            element = changeElementSplit(element, /r\u{0314}/u, "rh");
        }
        // tests medial rho
        if (/rr/.test(element)) {
            element = changeElementSplit(element, /rr/, "rrh");
        }
        // test DIAERESIS to avoid dipthong
        if (/\u{0308}/u.test(element)) {
            var pos = element.indexOf("\u0308");
            element = changeElementSubstr(element, pos, "\u0308");
        }
        // test for \u{0314} > h
        if (/\u{0314}/u.test(element)) {
            element = "h" + changeElementSplit(element, /\u{0314}/u, "");
        }
        // tests if has upsilon as dipthong
        if (/y/.test(element)) {
            // ay > au
            if (/ay/.test(element)) {
                element = changeElementSplit(element, /ay/, "au");
            }
            // ey > eu
            if (/ey/.test(element)) {
                element = changeElementSplit(element, /ey/, "eu");
            }
            // ēy > ēu
            if (/ēy/.test(element)) {
                element = changeElementSplit(element, /ēy/, "ēu");
            }
            // oy > ou
            if (/oy/.test(element)) {
                element = changeElementSplit(element, /oy/, "ou");
            }
            // yi > ui
            if (/yi/.test(element)) {
                element = changeElementSplit(element, /yi/, "ui");
            }
        }
        // removes remaining DIAERESIS after diphthongs have been combines
        if (/\u{0308}/u.test(element)) {
            element = changeElementSplit(element, /\u{0308}/u, "");
        }
        return element;
    }); // map
};
exports.testEach = function (array) {
    return rules(array);
};


/***/ })

/******/ });
//# sourceMappingURL=transliterate.js.map