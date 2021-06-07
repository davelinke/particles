import Particle from '../ptc/ptc.js'

import styles from './ptc-button.css.js';
import template from './ptc-button.html.js';

class ParticleButton extends Particle {
    constructor() {
        super();
        const props = {
            shadow: 'closed',
            template: template,
            styles: styles,
            properties: [
                {
                    name: 'variant',
                    defaultValue: 'regular',
                    type: 'string',
                    observe: true
                }
            ]
        }
        this.initialize(props);
    }
}

export default ParticleButton;