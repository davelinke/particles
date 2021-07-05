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
            },
            {
                name: 'indeterminate',
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

        (!this.getAttribute('tabindex')) && this.setAttribute('tabindex', 0);

        this.addEventListener('click', (e) => {
            const clickedElement = e.path[0];
            if (['A', 'BUTTON', 'INPUT', 'PTC-BUTTON', 'PTC-INPUT'].includes(clickedElement.tagName)) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            this.toggle();
        });

        this.addEventListener('keydown', (e)=>{
            (e.code==="Space") && this.toggle();
        })
    }

    toggle(){
        this.checked = !this.checked;
        this.setAria();
    }
    setAria() {
        this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : this.checked);
    }
    connectedCallback() {
        this.setAttribute('role', 'checkbox');
        this.setAria();
    }
}

export default ParticleCheckbox;
