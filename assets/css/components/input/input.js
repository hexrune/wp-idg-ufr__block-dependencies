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
/******/ 	return __webpack_require__(__webpack_require__.s = 182);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class BRInput {
  constructor(name, component) {
    this.name = name
    this.component = component
    this._currentFocus = -1
    this._setBehavior()
  }

  _setBehavior() {
    this._setPasswordViewBehavior()
    this._setAutocompleteBehavior()
  }

  _setPasswordViewBehavior() {
    for (const inputPassword of this.component.querySelectorAll(
      'input[type="password"]'
    )) {
      if (!inputPassword.disabled) {
        for (const buttonIcon of inputPassword.parentNode.querySelectorAll(
          '.br-button'
        )) {
          buttonIcon.addEventListener(
            'click',
            (event) => {
              this._toggleShowPassword(event)
            },
            false
          )
        }
      }
    }
  }

  _toggleShowPassword(event) {
    for (const icon of event.currentTarget.querySelectorAll('.fas')) {
      if (icon.classList.contains('fa-eye')) {
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
        for (const input of this.component.querySelectorAll(
          'input[type="password"]'
        )) {
          input.setAttribute('type', 'text')
        }
      } else if (icon.classList.contains('fa-eye-slash')) {
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
        for (const input of this.component.querySelectorAll(
          'input[type="text"]'
        )) {
          input.setAttribute('type', 'password')
        }
      }
    }
  }

  _setAutocompleteBehavior() {
    for (const inputAutocomplete of this.component.querySelectorAll(
      'input.search-autocomplete'
    )) {
      inputAutocomplete.addEventListener(
        'input',
        (event) => {
          this._clearSearchItems()
          this._buildSearchItems(event.currentTarget)
        },
        false
      )
      inputAutocomplete.addEventListener(
        'keydown',
        (event) => {
          this._handleArrowKeys(event)
        },
        false
      )
    }
  }

  _buildSearchItems(element) {
    const searchList = window.document.createElement('div')
    searchList.setAttribute('class', 'search-items')
    this.component.appendChild(searchList)
    if (element.value !== '') {
      for (const data of this.dataList) {
        if (
          data.substr(0, element.value.length).toUpperCase() ===
          element.value.toUpperCase()
        ) {
          const item = window.document.createElement('div')
          item.innerHTML = `<strong>${data.substr(
            0,
            element.value.length
          )}</strong>`
          item.innerHTML += data.substr(element.value.length)
          item.innerHTML += `<input type="hidden" value="${data}">`
          item.addEventListener(
            'click',
            (event) => {
              for (const input of event.currentTarget.querySelectorAll(
                'input[type="hidden"]'
              )) {
                element.value = input.value
              }
              this._clearSearchItems()
            },
            false
          )
          searchList.appendChild(item)
        }
      }
    } else {
      this._clearSearchItems()
    }
  }

  _clearSearchItems() {
    for (const searchItems of this.component.querySelectorAll(
      '.search-items'
    )) {
      for (const item of searchItems.querySelectorAll('div')) {
        searchItems.removeChild(item)
      }
      this.component.removeChild(searchItems)
    }
  }

  _handleArrowKeys(event) {
    switch (event.keyCode) {
      case 13:
        if (this._currentFocus > -1) {
          event.preventDefault()
          for (const searchItems of this.component.querySelectorAll(
            '.search-items'
          )) {
            for (const itemActive of searchItems.querySelectorAll(
              'div.is-active'
            )) {
              itemActive.click()
            }
          }
          this._currentFocus = -1
        }
        break
      case 38:
        if (this._currentFocus > 0) {
          this._currentFocus -= 1
        }
        this._switchFocus()
        break
      case 40:
        for (const searchItems of this.component.querySelectorAll(
          '.search-items'
        )) {
          if (
            this._currentFocus <
            searchItems.querySelectorAll('div').length - 1
          ) {
            this._currentFocus += 1
          }
        }
        this._switchFocus()
        break
      default:
        break
    }
  }

  _switchFocus() {
    for (const searchItems of this.component.querySelectorAll(
      '.search-items'
    )) {
      for (const [index, item] of searchItems
        .querySelectorAll('div')
        .entries()) {
        if (index === this._currentFocus) {
          item.classList.add('is-active')
        }
        if (index !== this._currentFocus) {
          item.classList.remove('is-active')
        }
      }
    }
  }

  setAutocompleteData(dataList) {
    this.dataList = dataList
  }
}
const countries = [
  'Afeganist??o',
  '??frica do Sul',
  'Alb??nia',
  'Alemanha',
  'Andorra',
  'Angola',
  'Anguilla',
  'Ant??rtida',
  'Ant??gua e Barbuda',
  'Antilhas Holandesas',
  'Ar??bia Saudita',
  'Arg??lia',
  'Argentina',
  'Arm??nia',
  'Aruba',
  'Austr??lia',
  '??ustria',
  'Azerbaij??o',
  'Bahamas',
  'Bahrein',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'B??lgica',
  'Belize',
  'Benin',
  'Bermudas',
  'Bol??via',
  'B??snia-Herzeg??vina',
  'Botsuana',
  'Brasil',
  'Brunei',
  'Bulg??ria',
  'Burkina Fasso',
  'Burundi',
  'But??o',
  'Cabo Verde',
  'Camar??es',
  'Camboja',
  'Canad??',
  'Cazaquist??o',
  'Chade',
  'Chile',
  'China',
  'Chipre',
  'Cingapura',
  'Col??mbia',
  'Congo',
  'Cor??ia do Norte',
  'Cor??ia do Sul',
  'Costa do Marfim',
  'Costa Rica',
  'Cro??cia (Hrvatska)',
  'Cuba',
  'Dinamarca',
  'Djibuti',
  'Dominica',
  'Egito',
  'El Salvador',
  'Emirados ??rabes Unidos',
  'Equador',
  'Eritr??ia',
  'Eslov??quia',
  'Eslov??nia',
  'Espanha',
  'Estados Unidos',
  'Est??nia',
  'Eti??pia',
  'Fiji',
  'Filipinas',
  'Finl??ndia',
  'Fran??a',
  'Gab??o',
  'G??mbia',
  'Gana',
  'Ge??rgia',
  'Gibraltar',
  'Gr??-Bretanha (Reino Unido, UK)',
  'Granada',
  'Gr??cia',
  'Groel??ndia',
  'Guadalupe',
  'Guam (Territ??rio dos Estados Unidos)',
  'Guatemala',
  'Guernsey',
  'Guiana',
  'Guiana Francesa',
  'Guin??',
  'Guin?? Equatorial',
  'Guin??-Bissau',
  'Haiti',
  'Holanda',
  'Honduras',
  'Hong Kong',
  'Hungria',
  'I??men',
  'Ilha Bouvet (Territ??rio da Noruega)',
  'Ilha do Homem',
  'Ilha Natal',
  'Ilha Pitcairn',
  'Ilha Reuni??o',
  'Ilhas Aland',
  'Ilhas Cayman',
  'Ilhas Cocos',
  'Ilhas Comores',
  'Ilhas Cook',
  'Ilhas Faroes',
  'Ilhas Falkland (Malvinas)',
  'Ilhas Ge??rgia do Sul e Sandwich do Sul',
  'Ilhas Heard e McDonald (Territ??rio da Austr??lia)',
  'Ilhas Marianas do Norte',
  'Ilhas Marshall',
  'Ilhas Menores dos Estados Unidos',
  'Ilhas Norfolk',
  'Ilhas Seychelles',
  'Ilhas Solom??o',
  'Ilhas Svalbard e Jan Mayen',
  'Ilhas Tokelau',
  'Ilhas Turks e Caicos',
  'Ilhas Virgens (Estados Unidos)',
  'Ilhas Virgens (Inglaterra)',
  'Ilhas Wallis e Futuna',
  '??ndia',
  'Indon??sia',
  'Ir??',
  'Iraque',
  'Irlanda',
  'Isl??ndia',
  'Israel',
  'It??lia',
  'Jamaica',
  'Jap??o',
  'Jersey',
  'Jord??nia',
  'K??nia',
  'Kiribati',
  'Kuait',
  'Laos',
  'L??tvia',
  'Lesoto',
  'L??bano',
  'Lib??ria',
  'L??bia',
  'Liechtenstein',
  'Litu??nia',
  'Luxemburgo',
  'Macau',
  'Maced??nia (Rep??blica Yugoslava)',
  'Madagascar',
  'Mal??sia',
  'Malaui',
  'Maldivas',
  'Mali',
  'Malta',
  'Marrocos',
  'Martinica',
  'Maur??cio',
  'Maurit??nia',
  'Mayotte',
  'M??xico',
  'Micron??sia',
  'Mo??ambique',
  'Moldova',
  'M??naco',
  'Mong??lia',
  'Montenegro',
  'Montserrat',
  'Myanma',
  'Nam??bia',
  'Nauru',
  'Nepal',
  'Nicar??gua',
  'N??ger',
  'Nig??ria',
  'Niue',
  'Noruega',
  'Nova Caled??nia',
  'Nova Zel??ndia',
  'Om??',
  'Palau',
  'Panam??',
  'Papua-Nova Guin??',
  'Paquist??o',
  'Paraguai',
  'Peru',
  'Polin??sia Francesa',
  'Pol??nia',
  'Porto Rico',
  'Portugal',
  'Qatar',
  'Quirguist??o',
  'Rep??blica Centro-Africana',
  'Rep??blica Democr??tica do Congo',
  'Rep??blica Dominicana',
  'Rep??blica Tcheca',
  'Rom??nia',
  'Ruanda',
  'R??ssia (antiga URSS) - Federa????o Russa',
  'Saara Ocidental',
  'Saint Vincente e Granadinas',
  'Samoa Americana',
  'Samoa Ocidental',
  'San Marino',
  'Santa Helena',
  'Santa L??cia',
  'S??o Bartolomeu',
  'S??o Crist??v??o e N??vis',
  'S??o Martim',
  'S??o Tom?? e Pr??ncipe',
  'Senegal',
  'Serra Leoa',
  'S??rvia',
  'S??ria',
  'Som??lia',
  'Sri Lanka',
  'St. Pierre and Miquelon',
  'Suazil??ndia',
  'Sud??o',
  'Su??cia',
  'Su????a',
  'Suriname',
  'Tadjiquist??o',
  'Tail??ndia',
  'Taiwan',
  'Tanz??nia',
  'Territ??rio Brit??nico do Oceano ??ndico',
  'Territ??rios do Sul da Fran??a',
  'Territ??rios Palestinos Ocupados',
  'Timor Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tun??sia',
  'Turcomenist??o',
  'Turquia',
  'Tuvalu',
  'Ucr??nia',
  'Uganda',
  'Uruguai',
  'Uzbequist??o',
  'Vanuatu',
  'Vaticano',
  'Venezuela',
  'Vietn??',
  'Z??mbia',
  'Zimb??bue',
]
const inputList = []
for (const brInput of window.document.querySelectorAll('.br-input')) {
  inputList.push(new BRInput('br-input', brInput))
}
for (const brInput of inputList) {
  brInput.component
    .querySelectorAll('input.search-autocomplete')
    .forEach(() => {
      brInput.setAutocompleteData(countries)
    })
}
/* harmony default export */ __webpack_exports__["default"] = (BRInput);


/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(12);
__webpack_require__(57);
__webpack_require__(58);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
module.exports = __webpack_require__(191);


/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "components/input/examples/input-cpf-danger.html");

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "components/input/examples/input-cpf-disabled.html");

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "components/input/examples/input-cpf-info.html");

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "components/input/examples/input-cpf-success.html");

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "components/input/examples/input-cpf-warning.html");

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "components/input/examples/input-densidade-alta.html");

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "components/input/examples/input-densidade-baixa.html");

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "components/input/examples/input-densidade-media.html");

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "components/input/examples/input-senha.html");

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "components/input/examples.html");

/***/ })

/******/ });
//# sourceMappingURL=input.js.map