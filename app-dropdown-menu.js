
/**
	*
	*	app-dropdown-menu
	*
	*	dropdown menu with button and items list
	*
	*
	**/

import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import htmlString from './app-dropdown-menu.html';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';


class SpritefulAppDropdownMenu extends SpritefulElement {
  static get is() { return 'app-dropdown-menu'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
  	return {
      // dropdown horizontal alignment
      align: {
        type: String,
        value: 'left' // 'auto', 'center', right'
      },

  		attrForSelected: {
  			type: String,
  			value: 'value'
  		},

  		items: {
  			type: Array,
  			value: ['foo', 'bar', 'baz']
  		},
  		// Any, same type as is passed in items array
  		value: Object,

      verticalAlign: String

  	};
  }


  static get observers() {
  	return [
  		'__itemsChanged(items)',
  		'__valueChanged(value)'
  	];
  }

  // default to first item
  __itemsChanged(items) {
  	if (Array.isArray(items)) {
  		this.value = items[0];
  	}
  }


  __valueChanged(value) {  	
  	this.fire('app-dropdown-menu-value-changed', {value});
  }


  __selected(event) {
  	this.value = event.detail.value;
  }

}

window.customElements.define(SpritefulAppDropdownMenu.is, SpritefulAppDropdownMenu);
