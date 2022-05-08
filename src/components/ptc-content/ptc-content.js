import Ptc from '../ptc/ptc.js'
import styles from './ptc-content.scss';

class ParticleContent extends Ptc {

    constructor() {
        super();

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

export default ParticleContent;
