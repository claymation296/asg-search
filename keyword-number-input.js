
/**
	*
	*	keyword-number-input
	*
	*	number input for scryfall search operators
	*
	*
	**/

import {
  SpritefulElement, 
  html
}                 from '@spriteful/spriteful-element/spriteful-element.js';
import htmlString from './keyword-number-input.html';
import '@polymer/paper-input/paper-input.js';
import './operator-selector.js';


class SpritefulKeywordNumberInput extends SpritefulElement {
  static get is() { return 'keyword-number-input'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
  	return {

  		keyword: String,

  		name: String,

  		operator: String,

  		number: Number

  	};
  }


  static get observers() {
  	return [
  		'__valuesChanged(keyword, operator, number)'
  	];
  }


  __menuValueChanged(event) {
  	event.stopImmediatePropagation();
    event.stopPropagation();
    this.operator = event.detail.selected;
  }


  __inputChanged(event) {
  	const {value} = event.detail;
  	this.number   = Number(value);
  }


  __valuesChanged(keyword, operator, number) {
  	if (
  		!keyword || 
  		typeof operator !== 'string' || 
  		typeof number 	!== 'number'
  	) { return; }

    this.fire('keyword-number-input-value-changed', {
      value: {        
        keyword,
        operator,
        number
      }
    });
  }

}

window.customElements.define(SpritefulKeywordNumberInput.is, SpritefulKeywordNumberInput);
