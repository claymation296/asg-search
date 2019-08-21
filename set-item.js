
/**
	*
	*	set-item
	*
	*	styled dropdown item
	*
	*
	**/

import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import htmlString from './set-item.html';
import '@polymer/paper-ripple/paper-ripple.js';


class SpritefulSetItem extends SpritefulElement {
  static get is() { return 'set-item'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
  	return {

  		item: Object,

      _iconHidden: {
        type: Boolean,
        computed: '__computeIconHidden(item.icon_svg_uri)'
      }

  	};
  }


  static get observers() {
    return [
      '__svgChanged(item.icon_svg_uri)'
    ];
  }


  __computeIconHidden(uri) {
    return !Boolean(uri);
  }


  __svgChanged(uri) {
    if (uri) {
      this.updateStyles({
        '--mask-svg': `url(${uri})`
      });
    }
  }

}

window.customElements.define(SpritefulSetItem.is, SpritefulSetItem);
