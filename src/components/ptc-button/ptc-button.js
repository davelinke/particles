import Ptc from '../ptc/ptc.js'
import styles from './ptc-button.css.js';

class PtcButton extends Ptc {

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
            // {
            //     name: 'disabled',
            //     defaultValue: false,
            //     type: 'boolean'
            // },
            {
                name: 'woot',
                defaultValue: false,
                type: 'boolean'
            },
            {
                name: 'elevation',
                defaultValue: null,
                type: 'number'
            },
            {
                name: 'type',
                defaultValue: 'button',
                tyle: 'string'
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
        this.href && (this.role = 'link');
        // set the role forcefully for accessibility
        !this.getAttribute('role') && this.setAttribute('role', this.role);

        (!this.getAttribute('tabindex')) && this.setAttribute('tabindex', 0);

        this.toggleAriaDisabled();

        this.addEventListener('mousedown', () => {
            this.classList.add('active')
        })
        this.addEventListener('mouseup', () => {
            this.classList.remove('active')
        })

        // custom initialization of stuff
        this.addEventListener('click', this.handleClick);


        this.addEventListener('keydown', this.handleClick);

    }

    // observe properties
    static get observedAttributes() { return ['variant', 'href', 'target', 'disabled'] }
    attributeChangedCallback(name, oldValue, newValue) {
        (name === 'disabled') ? this.toggleAriaDisabled() : this.setProp(name, newValue, true);
    }

    toggleAriaDisabled() {
        this.setAttribute('aria-disabled', this.hasAttribute('disabled'));
    }

    handleClick(e) {

        const isKeyDown = (e.type === 'keydown');
        const isCorrectKey = (isKeyDown && (e.code === 'Space')) || (isKeyDown && (e.code === 'Enter'));

        const goForIt = (e.type === 'click') || (isKeyDown && isCorrectKey);

        const disabled = this.hasAttribute('disabled');

        if (goForIt && !disabled) {
            if (this.type === 'submit') {
                const form = this.closest('form');
                if (form) return form.submit();
            }
            if ((this.type !== 'submit') && this.href) {
                switch (this.target) {
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
                            if (frame.name === this.target) {
                                frame.location.href = this.href;
                                break;
                            }
                        }
                }
            }
        }
    }

    // on connect
    connectedCallback() { }
}

export default PtcButton;