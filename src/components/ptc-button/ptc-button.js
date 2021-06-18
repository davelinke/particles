import Ptc from '../ptc/ptc.js'
import styles from './ptc-button.css.js';

class PtcButton extends Ptc {

    // observe properties
    static get observedAttributes() { return ['variant', 'disabled','href','target'] }
    attributeChangedCallback(name, oldValue, newValue) {
        this.setProp(name, newValue, true);
    }

    // initialize
    constructor() {
        super();

        const props = [
            {
                name: 'variant',
                defaultValue: null,
                type: 'string'
            },
            {
                name: 'role',
                defaultValue: 'button',
                type: 'string'
            },
            {
                name: 'href',
                defaultValue: null,
                type: 'string'
            },
            {
                name: 'target',
                defaultValue: null,
                type: 'text'
            },
            {
                name: 'disabled',
                defaultValue: false,
                type: 'boolean'
            }
        ]

        this.initProps(props);

        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });

        // add styles
        const styleElement = this.setupStyleElement(styles)
        this._shadow.append(styleElement);

        // create the html
        const slot = document.createElement('slot');
        this._shadow.append(slot);

        // check if the button is a link
        if (this.href) {
            this.setAttribute('role', this._role);
        }

        // custom initialization of stuff
        this.addEventListener('click', () => {
            if (this.href) {
                switch (this._target) {
                    case (null):
                        window.location.href = this.href;
                        break;
                    case (false):
                        window.location.href = this.href;
                        break;
                    case '_self':
                        window.location.href = this.href;
                        break;
                    case '_blank':
                        window.open(this.href);
                        break;
                    case '_top':
                        window.top.location.href = this.href;
                        break;
                    case '_parent':
                        window.parent.location.href = this.href;
                        break;
                    default:
                        for (let i = 0; i < window.frames.length; i++) {
                            const frame = window.frames[i];
                            if (frame.name === this._target) {
                                frame.location.href = this.href;
                                break;
                            }
                        }
                }
            }
        });
    }

    // on connect
    connectedCallback() { }
}

export default PtcButton;