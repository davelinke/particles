import Ptc from '../ptc/ptc.js'
import styles from './ptc-option.css.js';

class ParticleOption extends Ptc {

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

        // create the html
        const slot = document.createElement('slot');

        this._shadow.append(slot);
    }
}

export default ParticleOption;
