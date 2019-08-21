
import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import {
  schedule, 
  wait
}                 from '@spriteful/utils/utils.js';
import htmlString from './search-autocomplete.html';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

// 'http://www.abx.com?x=2&y=3'
const addQueryParams = (url, query) => {
  const keys = Object.keys(query);
  const queryString = keys.reduce((str, key) => {
    const val = query[key];
    return str === '?' ? `?${key}=${val}` : `${str}&${key}=${val}`;
  }, '?');
  return `${url}${queryString}`;
};


const fetchScryfallJson = async url => {
  const response = await fetch(url);
  const {data}   = await response.json();
  return data;
};


const fetchAutoComplete = str => {
  // scryfall.com text search autocomplete api 
  const query = {q: str};
  const url   = addQueryParams(
    'https://api.scryfall.com/cards/autocomplete', 
    query
  );
  return fetchScryfallJson(url);
};


class SearchAutocomplete extends SpritefulElement {
  static get is() { return 'search-autocomplete'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {
      
      isBuylist: {
        type: Boolean, 
        value: false
      },
      // used to match incoming search input with
      // its corresponding autocomplete so
      // only one autocomplete runs at a time
      location: String,
      // from search-input.js
      // {location, value}
      search: Object,

      threshold: Number,
      // drives template dom-repeat
      _autocomplete: Array,

      _closeBusy: Boolean,

      _openBusy: Boolean,
      // used to avoid infinite loops
      _selected: String

    };
  }


  static get observers() {
    return [
      '__searchChanged(search.*)'
    ];
  }


  async __searchChanged(search) {
    try {      
      await this.debounce('auto-complete-debounce', 300);
      // search obj is reset when user clicks 'x' 
      // button in search input
      if (!search || !search.base) { 
        this.close();
        return; 
      }
      const {location, value} = search.base;
      // avoid running two autocompletes at the same time
      if (location !== this.location) { return; } 
      // need more than one character to start search
      if (!value || value.length < 2) { 
        this.close();
        return; 
      }
      // avoid infinite loop
      if (value === this._selected) { return; }
      const autocomplete = await fetchAutoComplete(value);
      const firstTen     = autocomplete.slice(0, 10);
      // ignore late coming autocompletes
      if (value === this._selected) { return; }
      this._autocomplete = firstTen;
    }
    catch (error) {
      if (error === 'debounced') { return; }
      console.error(error);
    }
  }


  async __itemClicked(event) {
    try {
      await this.clicked();
      const {str} = event.model;
      const selected = this.isBuylist ? 
                        `usd>=${this.threshold} ${str}` :
                         str;
      this._selected = selected;      
      await this.close();
      this.fire('search-autocomplete-selected-changed', {selected});
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }


  async __domChanged() {
    try {
      await this.debounce('search-autocomplete-dom-debounce', 100);
      const items = this.selectAll('.item');
      if (
        items              && 
        this._autocomplete && 
        items.length === this._autocomplete.length
      ) {
        this.__open();
      }
    }
    catch (error) {
      if (error === 'debounced') { return; }
      console.error(error);
    }
  }


  async __open() {
    if (this._openBusy) { return; }
    this._openBusy = true;
    this.$.xWrapper.classList.remove('delay');
    this.$.yWrapper.classList.add('delay');
    this.$.autoCompleteList.classList.add('list-delayed-transition');
    await schedule();
    this.$.xWrapper.classList.add('open-list');
    this.$.yWrapper.classList.add('open-list');
    this.$.autoCompleteList.classList.add('open-list');
    await wait(250);
    this._openBusy = false;
  }


  async close() {
    if (this._closeBusy) { return; }
    this._closeBusy = true;    
    this.$.autoCompleteList.classList.remove('list-delayed-transition');
    this.$.autoCompleteList.classList.remove('open-list');
    this.$.xWrapper.classList.add('delay');
    this.$.yWrapper.classList.remove('delay');
    await wait(200);
    this.$.yWrapper.classList.remove('open-list');
    this.$.xWrapper.classList.remove('open-list');
    await wait(250);
    this._autocomplete = undefined;
    this._closeBusy    = false;
  }

}

window.customElements.define(SearchAutocomplete.is, SearchAutocomplete);
