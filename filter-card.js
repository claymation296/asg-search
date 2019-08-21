/**
 * `filter-card`
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
import htmlString from './filter-card.html';
import '@polymer/paper-card/paper-card.js';


class SpritefulFilterCard extends SpritefulElement {
  static get is() { return 'filter-card'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
  	return {

  		heading: String

  	};
  }

}

window.customElements.define(SpritefulFilterCard.is, SpritefulFilterCard);
