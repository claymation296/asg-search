/**
 * `sets-sort-filter`
 * simple sort and filter controls for sets-overlay
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
import {
  SpritefulElement, 
  html
}                       from '@spriteful/spriteful-element/spriteful-element.js';
import htmlString       from './sets-sort-filter.html';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import './direction-button.js';


class SpritefulSetsSortFilter extends SpritefulElement {
  static get is() { return 'sets-sort-filter'; }

  static get template() {
    return html([htmlString]);
  }


  static get properties() {
    return {

      _direction: {
        type: String,
        value: 'desc'
      },

      _filter: {
        type: String,
        value: ''
      },
      // paper-input label
      _label: {
        type: String,
        value: 'Set Name',
        computed: '__computeLabel(_prop)'
      },
      // set property to sort/filter by
      _prop: {
        type: String,
        value: 'released_at'
      }

    };
  }


  static get observers() {
    return [
      '__valuesChanged(_direction, _filter, _prop)'
    ];
  }


  __computeLabel(prop) {
    return prop === 'name' ? 'Set Name' : 'Release Year';
  }


  __selectedPropChanged(event) {
    this._prop = event.detail.value;
  }


  __directionChanged(event) {
    this._direction = event.detail.value;
  }


  __inputValueChanged(event) {
    this._filter = event.detail.value;
  }


  __valuesChanged(direction, filter, prop) {
    if (
      typeof direction !== 'string' || 
      typeof filter    !== 'string' || 
      typeof prop      !== 'string'
    ) { return; }

    this.fire('sets-sort-filter-value-changed', {
      value: {
        direction,
        filter,
        prop
      }
    });
  }


  reset() {
    this._prop         = 'released_at';
    this._direction    = 'desc';
    this.$.input.value = '';
  }

}

window.customElements.define(SpritefulSetsSortFilter.is, SpritefulSetsSortFilter);
