
/**
	*
	*	keyword-item
	*
	*	dropdown selector for scryfall search operators
	*
	*
	**/

import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import htmlString from './keyword-item.html';
import '@spriteful/asg-icons/asg-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-ripple/paper-ripple.js';


class SpritefulKeywordItem extends SpritefulElement {
  static get is() { return 'keyword-item'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
  	return {

  		item: Object,

      _icon: {
        type: String,
        computed: '__computeIcon(item.icon)'
      },

      _iconHidden: {
        type: Boolean,
        computed: '__computeIconHidden(_icon)'
      }

  	};
  }


  __computeIcon(icon) {
    if (!icon) { return ''; }
  	return `asg-icons:${icon}`;
  }


  __computeIconHidden(icon) {
    return !Boolean(icon);
  }

}

window.customElements.define(SpritefulKeywordItem.is, SpritefulKeywordItem);
