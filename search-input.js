
import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import {
  schedule
}                 from '@spriteful/utils/utils.js';
import htmlString from './search-input.html';
import '@spriteful/app-icons/app-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import './search-autocomplete.js';


class SpritefulSearchInput extends SpritefulElement {
  static get is() { return 'search-input'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      disableAutoPosition: Boolean,

      hideButtons: {
        type: Boolean,
        value: false
      },

      isBuylist: Boolean,
      // used to open shop overlay if input is in home-view
      location: String,

      search: {
        type: String,
        observer: '__searchChanged'
      },

      threshold: Number,

      _a11yTarget: Object

    };
  }


  connectedCallback() {
    super.connectedCallback();

    this._a11yTarget = this.$.searchInput;
  }
  

  __computeHideSearchClearButton(search) {
    return search ? '' : 'hide-search-clear-btn';
  }


  __searchChanged(newVal, oldVal) {
    if (newVal === oldVal) { return; }
    this.fire('search-input-value-changed', {value: newVal});
  }

  // puts search toolbar at top of screen
  async __onFocusPlaceSearchToolbar(event) {
    try {
      if (this.disableAutoPosition) { return; }  
      if (event.detail.value) {
        await this.clicked();
        await schedule();
        const top = this.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({top, behavior: 'smooth'});
      }
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }


  async __search() {
    try {
      if (!this.search || this.search.length < 2) { return; }    
      await this.clicked();

      // is this extra debounce needed? this.clicked debounces internally
      // await this.debounce('asg-cms-inventory-card-search-debounce', 300); 

      this.$.searchInput.blur();
      await schedule();
      this.closeAutoComplete();

      if (this.threshold) {
        const thresholdSearch = `usd>=${this.threshold} ${this.search}`;
        this.__fireSearch(thresholdSearch);
        return;
      }
      this.__fireSearch(this.search);
    }
    catch (error) {
      if (error === 'click debounced' || error === 'debounced') { return; }
      console.error(error);
    }
  }


  __a11yOnEnter() {
    this.__search();
  }


  __searchButtonClicked() {
    this.__search();
  }


  async __moreButtonClicked() {
    try {    
      await this.clicked();
      this.fire('search-input-open-advanced-search');
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.error(error);
    }
  }


  async __clearSearchButtonClicked() {
    try {
      await this.clicked();
      this.$.searchInput.blur();
      this.search              = '';
      this.$.searchInput.value = '';
      this.closeAutoComplete();
      await schedule();
      this.$.searchInput.focus();
      this.fire('search-input-clear');
    }
    catch (error) {
      if (error === 'click debounced') { return; }
      console.log('__clearSearchButtonClicked', error);
    }
  }

  // For autocomplete to make list, called from paper input
  __searchInputChanged(event) {
    const {value} = event.detail;
    this.search   = value;
    this._searchAndLocation = {
      value,
      location: this.location
    };
  }


  __autocompleteSelected(event) {    
    event.stopImmediatePropagation();
    event.stopPropagation();
    const {selected} = event.detail;
    const exact      = this.isBuylist ? false : true;
    this.__fireSearch(selected, exact);
  }

  // fired to spriteful app to open shop
  __fireSearch(str, exact = false) {
    this.fire('search-input-search', {
      exact,
      str,
      location: this.location
    });
  }


  closeAutoComplete() {
    return this.$.autocomplete.close();
  }

}

window.customElements.define(SpritefulSearchInput.is, SpritefulSearchInput);
