/**
 * `advanced-search`
 * displays all mtg sets as styled selectable items
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
import htmlString from './advanced-search.html';
import '@spriteful/app-icons/app-icons.js';
import '@spriteful/app-header-overlay/app-header-overlay.js';
import '@polymer/paper-fab/paper-fab.js';
import './search-input.js';
import './advanced-search-content.js';


class SpritefulAdvancedSearch extends SpritefulElement {
  static get is() { return 'advanced-search'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {
      // raw search string from a search-input
      search: String,

      _advanced: String,

      _selectedSet: Object

    };
  }


  static get observers() {
    return [
      '__advancedChanged(_advanced)'
    ];
  }
  

  connectedCallback() {
    super.connectedCallback();

    listen(this, 'set-card-open-sets-overlay',    this.__openSetsOverlay.bind(this));
    listen(this, 'sets-overlay-selected-changed', this.__setSelected.bind(this));
    listen(this.$.overlay, 'overlay-reset',       this.__reset.bind(this));   
  }


  __advancedChanged(value) {
    this.fire('advanced-search-value-changed', {value});
  }

  // glue between search-input and content
  __searchChanged(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.search = event.detail.value;
  }


  __searchInputSearch(event) {    
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.__fireSearch();
  }

  // from advanced-search-content
  __advancedSearchChanged(event) {      
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._advanced = event.detail.value;
  }


  async __openSetsOverlay(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    await import(
      /* webpackChunkName: 'sets-overlay' */ 
      './sets-overlay.js'
    );
    this.$.setsOverlay.open();
  }

  // glue between content and sets overlay
  __setSelected(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this._selectedSet = event.detail.selected;
  }

  // enter button on search input focus or paper-fab click
  async __fireSearch() {
    await this.$.search.closeAutoComplete();
    await this.$.overlay.close();
    await schedule();
    this.fire('search-input-search', {
      str:       this._advanced,
      location: 'advanced'
    });
  }


  async __fabClicked() {
    try {
      await this.clicked();
      if (!this._advanced || this._advanced.length < 2) { return; }    
      this.__fireSearch();
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }


  __reset() {
    this.$.content.reset();
  }


  async open() {
    await  this.$.overlay.open();
    return this.$.content.fetchRandom();
  }

}

window.customElements.define(SpritefulAdvancedSearch.is, SpritefulAdvancedSearch);
