import Particle from '../ptc/ptc.js'

import styles from './ptc-card.css.js';
import template from './ptc-card.html.js';

class ParticleCard extends Particle {
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
                    validator: (value) => { return ['regular', 'flat'].includes(value) },
                    observe: true
                }
            ]
        }
        this.initialize(props);
    }
}

export default ParticleCard;
