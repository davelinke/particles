import Ptc from '../ptc/ptc.js'
import styles from './ptc-card.css.js';

class ParticleCard extends Ptc {

    /**
     * button attributes to be observed 
     */
    static get observedAttributes() { return ['elevation'] }

    /**
     * the card constructor
     */
    constructor() {
        super();

        // initalize all the card properties
        this._initProps([{
            // the elevation defines a visual effect of drop shadow to simulate z axis elevation
            name: 'elevation',
            defaultValue: null,
            type: 'number',
            onAttrChange: (newValue) => { this._setProp('elevation', newValue, true) }
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

export default ParticleCard;
