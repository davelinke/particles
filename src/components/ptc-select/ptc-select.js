import Ptc from '../ptc/ptc.js'
import styles from './ptc-select.css.js';

class ParticleSelect extends Ptc {

    /**
     * card attributes to be observed 
     */
    static get observedAttributes() { return [] }

    /**
     * the card constructor
     */
    constructor() {
        super();

        // initalize all the card properties
        this._initProps([{
            name: 'value',
            defaultValue: null,
            type: 'string'
        }]);

        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });

        // add styles
        const styleElement = this._setupStyleElement(styles)
        this._shadow.append(styleElement);

        const box = document.createElement('div');
        box.classList.add('box');
        box.innerText = 'Select';
        this._shadow.append(box);

        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        const dropdownScroller = document.createElement('div');
        dropdownScroller.classList.add('dropdown__scroller');

        dropdown.appendChild(dropdownScroller);

        // create the html
        const slot = document.createElement('slot');
        dropdownScroller.append(slot);

        this._shadow.append(dropdown);
    }
}

export default ParticleSelect;
