/**
 * `sets-overlay`
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
} 	              from '@spriteful/utils/utils.js';



// import services 	from '@spriteful/services/services.js';
import services 	from './mock-services.js';




import htmlString from './sets-overlay.html';
import '@spriteful/app-header-overlay/app-header-overlay.js';
import '@spriteful/app-spinner/app-spinner.js';
import '@polymer/paper-listbox/paper-listbox.js';
import './sets-sort-filter.js';
import './set-item.js';


class SpritefulSetsOverlay extends SpritefulElement {
  static get is() { return 'sets-overlay'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _all: {
        type: Object,
        value: () => ({name: 'All'})
      },  

    	_busy: {
    		type: Boolean,
    		value: false
    	},
      // from sets-sort-filter's direction-button
      _direction: String,
      // from paper-input
      _filter: String,

      _items: Array,
      // from sets-sort-filter
      _prop: String,

      _selected: Object

    };
  }


  static get observers() {
  	return [
  		'__selectedChanged(_selected)'
  	];
  }


  connectedCallback() {
  	super.connectedCallback();

  	listen(this.$.overlay, 'overlay-opening', this.__startSpinner.bind(this));
  }


  __sortFilterChanged(event) {
    const {direction, filter, prop} = event.detail.value;
    this._direction = direction;
    this._filter    = filter;
    this._prop      = prop;
  }


  __itemSelected(event) {
  	this._selected = event.detail.value;
  }


  async __selectedChanged(item) {
  	if (!item) { return; }
  	this.fire('sets-overlay-selected-changed', {selected: item});
    await schedule();
    this.$.overlay.close();
  }


  __startSpinner() {
  	if (!this._items && !this._busy) {
  		this.$.spinner.show();
  	}
  }


  __filterFn(filter, prop) {
    if (!prop || !filter) { return null; }

    return item => {
      if (!item[prop]) { return true; } 

      const val = item[prop].toLowerCase();
      return val.startsWith(filter.trim().toLowerCase());
    };
  }

  // sort strings alphabetically
  __sortFn(direction, prop) {
    if (!direction || !prop) { return null; }

    return (aObj, bObj) => {
      const a = aObj[prop];
      const b = bObj[prop];

      if (!a || !b || (a === b)) { return 0; }  

      if (direction === 'asc') {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
      }
      else {
        if (a < b) {
          return 1;
        }
        if (a > b) {
          return -1;
        }
      }
    };
  }

  
  async __fetchItems() {
  	try {
	  	if (!this._items && !this._busy) {
	  		this._busy = true;
	  		const sets = await services.cloudFunction({name: 'getSets'});
	  		this.set('_items', sets);
	  	}
  	}
  	catch (error) {
  		console.error(error);
  		await warn('Sorry, an unexpected error occured.');
  	}
  	finally {
  		await this.$.spinner.hide();
  		this._busy = false;
  	}
  }


  async open() {
    await this.$.overlay.open();
    return this.__fetchItems();
  }

}

window.customElements.define(SpritefulSetsOverlay.is, SpritefulSetsOverlay);
