import Ptc from '../ptc/ptc.js'
import styles from './ptc-checkbox.css.js';

class ParticleCheckbox extends Ptc {

    /**
     * checkbox attributes to be observed 
     */
    static get observedAttributes() { return ['disabled'] }

    /**
     * the checkbox constructor
     */
    constructor() {
        super();

        // initalize all the checkbox properties
        this._initProps([
            {
                // to disable the checkbox
                name: 'disabled',
                defaultValue: false,
                type: 'boolean',
                onAttrChange: () => {
                    this._toggleAriaDisabled();
                }
            },
            {
                // ptc input elements do have status that reflect if the elemnent
                // has an error, warning or success status
                name: 'status',
                defaultValue: null,
                type: 'string'
            },
            {
                // the checkbox value when it is checked
                name: 'value',
                defaultValue: null,
                type: 'text'
            },
            {
                // the checkbox checked/unchecked status
                name: 'checked',
                defaultValue: false,
                type: 'boolean'
            },
            {
                // the checkbox indeterminate status
                name: 'indeterminate',
                defaultValue: false,
                type: 'boolean'
            }
        ]);

        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });

        // add styles
        const styleElement = this._setupStyleElement(styles);
        this._shadow.append(styleElement);

        // create the html
        const slot = document.createElement('slot');
        this._shadow.append(slot);

        // since it is a checkbox, it must be focusable by default
        (!this.getAttribute('tabindex')) && this.setAttribute('tabindex', 0);

        // we allow the label of the checkbox to be clickable
        // but it may nest a clickable element, so we need to
        //determine what was clicked in order to check or uncheck.
        this.addEventListener('click', (e) => {
            const clickedElement = e.path[0];
            if (['A', 'BUTTON', 'INPUT', 'PTC-BUTTON', 'PTC-INPUT'].includes(clickedElement.tagName)) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            this._toggle();
        });

        // checkboxes toggle on space bar, so we emulate that behavior
        this.addEventListener('keydown', (e) => {
            (e.code === "Space") && this._toggle();
        })
    }

    /**
     * a function to toggle the aria-disabled attribute (accessibilty) 
     */
    _toggleAriaDisabled() {
        this.setAttribute('aria-disabled', this.hasAttribute('disabled'));
    }

    /**
     * the toggling handler
     */
    _toggle() {
        const disabled = this.hasAttribute('disabled');
        if (!disabled) {
            this.checked = !this.checked;
            this._setAria();
        }
    }

    /**
     * method to handle the aria checked status for accesibility
     */
    _setAria() {
        this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : this.checked);
    }


    /**
     * all things that must happen when connecting the checkbox to the DOM
     */
    connectedCallback() {
        // we set the role attribute to checkbox for porper accessibility
        this.setAttribute('role', 'checkbox');
        // we invoke the set aria handler to set the adequate aria status.
        this._setAria();
    }
}

export default ParticleCheckbox;
