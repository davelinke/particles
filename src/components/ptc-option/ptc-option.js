import Ptc from '../ptc/ptc.js'
import styles from './ptc-option.scss';

class ParticleOption extends Ptc {

    /**
     * option attributes to be observed 
     */
    static get observedAttributes() { return [] }

    /**
     * the option constructor
     */
    constructor() {
        super();

        // initalize all the card properties
        this._initProps([{
            name: 'value',
            defaultValue: null,
            type: 'string'
        },{
            name: 'highlighted',
            defaultValue: false,
            type: 'boolean'
        },{
            name: 'selected',
            defaultValue: false,
            type: 'boolean'
        },{
            name: 'disabled',
            defaultValue: false,
            type: 'boolean'
        }
    ]);

        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });

        // add styles
        const styleElement = this._setupStyleElement(styles)
        this._shadow.append(styleElement);

        // create the html
        const slot = document.createElement('slot');

        this._shadow.append(slot);

        // define the state of the option
        this.state = null;

        // define the click behavior
        this.addEventListener('click', this.select.bind(this));

        this.addEventListener('mouseover', this._handleMouseOver.bind(this));
    }

    /**
     * select the option
     * @param {Event} e
     * @returns {void}
     * @private
     * @memberof ParticleOption
     * @todo add the option to the select
     */
    select(e) {
        this.selected = true;
        this.dispatchEvent(new CustomEvent('ptc-option-selected', {
            bubbles: true,
            detail: this
        }));
    }

    _handleMouseOver(e) {
        this.dispatchEvent(new CustomEvent('ptc-option-mouseover', {
            bubbles: true,
            detail: this
        }));
    }

    connectedCallback() {
        // fire an event to handshake with the select
        this.dispatchEvent(new CustomEvent('ptc-option-connected', {
            bubbles: true,
            composed: true,
            detail: this
        }));
    }

    disconnectedCallback() {
        console.log('disconnected', this.state);
        this.cleanOnDisconnect();
    }
}

export default ParticleOption;
