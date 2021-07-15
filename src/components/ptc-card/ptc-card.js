import Ptc from '../ptc/ptc.js'
import styles from './ptc-card.css.js';

class ParticleCard extends Ptc {

    constructor() {
        super();

        this._initProps([{
            name: 'elevation',
            defaultValue: null,
            type: 'number'
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
