/**
 * `advanced-search-content`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import {
  listen, 
  schedule
}                 from '@spriteful/utils/utils.js';
import htmlString from './advanced-search-content.html';
import '@spriteful/asg-icons/asg-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-image/iron-image.js';
import './search-type-card.js';
import './sort-card.js';
import './is-card.js';
import './set-card.js';
import './rarity-card.js';
import './format-card.js';
import './color-card.js';
import './filter-number-card.js';


const buildChainedStr = (chain, keyword, value, operator = ':') => {
  const base = `${keyword}${operator}${value}`;
  if (chain === 'or') {
    return `or ${base}`;
  }
  if (chain === 'not') {
    return `-${base}`;
  }
  return base;
};


const buildCheckboxesStr = obj => {
  const {chain, keyword, values} = obj;

  return values.reduce((accum, val) => {
    const str = buildChainedStr(chain, keyword, val);
    return `${accum} ${str}`.trim();
  }, '');
};


class SpritefulAdvancedSearchContent extends SpritefulElement {
  static get is() { return 'advanced-search-content'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {
      // from search input
      search: String,
      // passed into set-card from sets-overlay 
      selectedSet: Object,
      // final computed output string
      _advanced: {
        type: String,
        computed: `__computeAdvanced(
          _typeStr, 
          _sortStr, 
          _isStr,
          _setStr,
          _rarityStr,
          _formatStr,
          _colorStr,
          _numbersStr
        )`
      },

      _backgroundImg: {
        type: String,
        computed: '__computeBackgroundImg(_randomCard)'
      },

      _color: Object,

      _colorStr: {
        type: String,
        computed: '__computeColorStr(_color)'
      },

      _format: Object,

      _formatStr: {
        type: String,
        computed: '__computeFormatStr(_format)'
      },

      _is: Object,

      _isStr: {
        type: String,
        computed: '__computeIsStr(_is)'
      },

      _numbers: {
        type: Object,
        value: () => ({})
      },

      _numbersStr: {
        type: String,
        computed: '__computeNumbersStr(_numbers.*)'
      },

      _randomCard: Object,

      _randomCardName: {
        type: String,
        computed: '__computeName(_randomCard)'
      },

      _randomCardArtist: {
        type: String,
        computed: '__computeArtist(_randomCard)'
      },

      _randomCardArtistHidden: {
        type: Boolean,
        computed: '__computeArtistHidden(_randomCardArtist)',
        value: true
      },

      _rarity: Object,

      _rarityStr: {
        type: String,
        computed: '__computeRarityStr(_rarity)'
      },

      _type: String,

      _typeStr: {
        type: String,
        computed: '__computeTypeStr(_type, search)'
      },

      _set: Object,

      _setStr: {
        type: String,
        computed: '__computeSetStr(_set)'
      },

      _sort: Object,

      _sortStr: {
        type: String,
        computed: '__computeSortStr(_sort)'
      }

    };
  }


  static get observers() {
    return [
      '__advancedChanged(_advanced)'
    ];
  }


  connectedCallback() {
    super.connectedCallback();
    
    this.__setupListeners();
  }


  __computeArtist(card) {
    if (!card) { return ''; }
    return card.artist;    
  }


  __computeArtistHidden(artist) {
    return !Boolean(artist);
  }


  __computeBackgroundImg(card) {
    if (!card) { return '#'; }
    const {card_faces, image_uris} = card;
    const artCrop = card_faces ? 
                      card_faces[0].image_uris.art_crop : 
                      image_uris.art_crop;
    return artCrop ? artCrop : '#';
  }


  __computeName(card) {
    if (!card) { return; }
    const {card_faces, name} = card;
    return card_faces ? card_faces[0].name : name;
  }


  __computeTypeStr(type, search) {
    if (!search) { return ''; }
    if (type === 'oracle') { return `oracle:"${search}"`; }
    if (type === 'type')   { return `type:${search}`; }
    return search;
  }


  __computeSortStr(sort) {
    const {direction, value} = sort;
    return `order:${value} direction:${direction}`;
  }


  __computeIsStr(is) {
    return buildCheckboxesStr(is);
  }


  __computeSetStr(set) {
    const {chain, code} = set;
    if (!code) { return ''; } // 'All' item
    return buildChainedStr(chain, 'set', code);
  }


  __computeRarityStr(rarity) {
    return buildCheckboxesStr(rarity);
  }


  __computeFormatStr(format) {
    const {chain, keyword, value} = format;
    if (value === 'all') { return ''; }
    
    return buildChainedStr(chain, keyword, value);
  }


  __computeColorStr(color) {
    return buildCheckboxesStr(color);
  }


  __computeNumbersStr(numbersObj) {
    const {base: numbers} = numbersObj;
    const values = Object.values(numbers);

    return values.reduce((accum, val) => {
      const {chain, keyword, number, operator} = val;
      const str = buildChainedStr(chain, keyword, number, operator);
      return `${accum} ${str}`.trim();
    }, '');
  }


  __computeAdvanced(...strings) {
    return strings.reduce(
      (accum, str) => str ? `${accum} ${str}`.trim() : accum, 
      ''
    );
  }


  async __setupListeners() {
    // wait to listen to children until 
    // they have fired their default states
    await schedule();    

    listen(this, 'search-type-card-value-changed',   this.__searchTypeCardChanged.bind(this));
    listen(this, 'sort-card-value-changed',          this.__sortCardChanged.bind(this));
    listen(this, 'is-card-value-changed',            this.__isCardChanged.bind(this));
    listen(this, 'set-card-value-changed',           this.__setCardChanged.bind(this));
    listen(this, 'rarity-card-value-changed',        this.__rarityCardChanged.bind(this));
    listen(this, 'format-card-value-changed',        this.__formatCardChanged.bind(this));
    listen(this, 'color-card-value-changed',         this.__colorCardChanged.bind(this));
    listen(this, 'filter-number-card-value-changed', this.__numberCardChanged.bind(this));
  }


  __searchTypeCardChanged(event) {
    this._type = event.detail.value;
  }


  __sortCardChanged(event) {
    this._sort = event.detail.value;
  }


  __isCardChanged(event) {
    this._is = event.detail.value;
  }


  __setCardChanged(event) {
    this._set = event.detail.value;
  }


  __rarityCardChanged(event) {
    this._rarity = event.detail.value;
  }


  __formatCardChanged(event) {
    this._format = event.detail.value;
  }


  __colorCardChanged(event) {
    this._color = event.detail.value;
  }


  __numberCardChanged(event) {
    const {value} = event.detail;
    this.set(`_numbers.${value.keyword}`, value);
  }


  __advancedChanged(advanced) {
    this.fire(
      'advanced-search-content-value-changed', 
      {value: advanced}
    );
  }


  async fetchRandom() {
    try {      
      const response   = await fetch('https://api.scryfall.com/cards/random');
      this._randomCard = await response.json();
      return this._randomCard;
    }
    catch (error) { // not important for functionality, so consume it here
      console.error(error);
    }
  }
  

  reset() {
    this._randomCard = undefined;
  }

}

window.customElements.define(SpritefulAdvancedSearchContent.is, SpritefulAdvancedSearchContent);
