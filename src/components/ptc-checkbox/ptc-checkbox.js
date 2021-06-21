import Ptc from '../ptc/ptc.js'
import styles from './ptc-checkbox.css.js';

class ParticleCheckbox extends Ptc {

    constructor() {
        super();

        const props = [
            {
                name: 'status',
                defaultValue: null,
                type: 'string'
            },
            {
                name: 'disabled',
                defaultValue: false,
                type: 'boolean'
            },
            {
                name: 'value',
                defaultValue: null,
                type: 'text'
            },
            {
                name: 'checked',
                defaultValue: false,
                type: 'boolean'
            }
        ]

        this.initProps(props);

        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });

        // add styles
        const styleElement = this.setupStyleElement(styles);
        this._shadow.append(styleElement);

        // create the html
        const slot = document.createElement('slot');
        this._shadow.append(slot);
    }
}

export default ParticleCheckbox;
