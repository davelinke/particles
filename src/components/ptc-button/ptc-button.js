import { setupStyleElement, InitProp } from '../ptc/ptc.js'
import styles from './ptc-button.css.js';

class PtcButton extends HTMLElement {
    initProp = InitProp;

    _role = 'button';
    _href = null;
    _target = null;

    // initialize
    constructor() {
        super();

        this.initProp('variant',null,'string');

        // init attributes
        // this._href = this.getAttribute('href');
        // this._role = this.getAttribute('role');
        // this._target = this.getAttribute('target');

        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });

        // add styles
        const styleElement = setupStyleElement(styles)
        this._shadow.append(styleElement);

        // create the html
        const slot = document.createElement('slot');
        this._shadow.append(slot);

        // check if the button is a link
        if (this._href) {
            this.setAttribute('role', this._role);
        }

        // custom initialization of stuff
        this.addEventListener('click', () => {
            if (this._href) {
                switch (this._target) {
                    case (null):
                        window.location.href = this._href;
                        break;
                    case (false):
                        window.location.href = this._href;
                        break;
                    case '_self':
                        window.location.href = this._href;
                        break;
                    case '_blank':
                        window.open(this._href);
                        break;
                    case '_top':
                        window.top.location.href = this._href;
                        break;
                    case '_parent':
                        window.parent.location.href = this._href;
                        break;
                    default:
                        for (let i = 0; i < window.frames.length; i++) {
                            const frame = window.frames[i];
                            if (frame.name === this._target) {
                                frame.location.href = this._href;
                                break;
                            }
                        }
                }
            }
        });
    }

    // observe properties
    static get observedAttributes() { return ['variant', 'disabled'] }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attr',name)
        this.setProp(name, newValue, true);
    }


    connectedCallback() {}
}

export default PtcButton;