import Ptc from '../ptc/ptc.js'
import styles from './ptc-select.css.js';

class ParticleSelect extends Ptc {

    /**
     * select attributes to be observed 
     */
    static get observedAttributes() { return ['value'] }

    /**
     * the select constructor
     */
    constructor() {
        super();

        // state
        this._isOpen = false;

        // initalize all the card properties
        this._initProps([{
            name: 'value',
            defaultValue: null,
            type: 'string'
        },
        {
            name: 'open',
            defaultValue: false,
            type: 'boolean'
        }]);

        // let's deal with the focus behavior
        // if it doesnt have a tabindex, set it to 0 so it can focus
        if (!this.hasAttribute('tabindex') && this.tabIndex === -1) {
            this.tabIndex = 0;
        }
        this.addEventListener('focus', this._handleFocus)


        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });


        // add styles
        const styleElement = this._setupStyleElement(styles)
        this._shadow.append(styleElement);


        // create the clicker element
        const box = document.createElement('div');
        box.classList.add('box');
        this._shadow.append(box);

        box.addEventListener('click', this.toggle.bind(this));


        // create the output window
        const boxOutput = document.createElement('div');
        boxOutput.classList.add('box__output');
        boxOutput.innerHTML = 'select';

        box.append(boxOutput);


        // create the chevron
        const chevron = document.createElement('div');
        chevron.classList.add('chevron');
        chevron.innerHTML = `
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="feather feather-chevron-down"
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>`;

        box.append(chevron)


        // create the dropdown
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        // add the dropdown to the state so we can access it later
        this._dropdown = dropdown;

        // and if prop open is true, then show the dropdown
        if (this.open) {
            dropdown.classList.add('dropdown--open');
        }


        // create the dropdown list
        const dropdownScroller = document.createElement('div');
        dropdownScroller.classList.add('dropdown__scroller');

        dropdown.appendChild(dropdownScroller);


        // create the slot for the options
        const slot = document.createElement('slot');
        dropdownScroller.append(slot);

        this._shadow.append(dropdown);
    }


    /**
     * a method to handle what happens when we focus the component
     */
    _handleFocus() {
        // let's start keystroke listening to emulate an actual select
    }


    /**
     * the method to toggle the options
     */
    toggle() {
        if (this._isOpen) {
            this.hideOptions();
        } else {
            this.showOptions();
        }

    }


    /**
     * the method to show the options
     */
    showOptions() {
        this._isOpen = true;
        this._dropdown.classList.add('visible');
    }


    /**
     * the method to hide the options
     */
    hideOptions() {
        this._isOpen = false;
        this._dropdown.classList.remove('visible');
    }
}

export default ParticleSelect;
