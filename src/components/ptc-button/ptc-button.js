import Ptc from '../ptc/ptc.js'
import styles from './ptc-button.scss';

class PtcButton extends Ptc {

    /**
     * button attributes to be observed 
     */
    static get observedAttributes() { return ['variant', 'href', 'target', 'disabled', 'elevation'] }

    /**
     * the button constructor
     */
    constructor() {
        super();

        // initalize all the button properties
        this._initProps([
            {
                // to enable or disable a button
                name: 'disabled',
                defaultValue: false,
                type: 'boolean',
                onAttrChange: (v) => this._toggleAriaDisabled()
            },
            {
                // the visual variant of the button
                name: 'variant',
                defaultValue: null,
                type: 'string',
                onAttrChange: (newValue) => { this._setProp('variant', newValue, true) }
            },
            {
                // the aria role of the button
                name: 'role',
                defaultValue: 'button',
                type: 'string'
            },
            {
                // if the button is a simlple link, this is the href attribute
                name: 'href',
                defaultValue: null,
                type: 'string',
                onAttrChange: (newValue) => this._setProp('href', newValue, true)
            },
            {
                // if the button is a simple link, this is the target attribute
                name: 'target',
                defaultValue: null,
                type: 'text',
                onAttrChange: (newValue) => this._setProp('target', newValue, true)
            },
            {
                // the elevation defines a visual effect of drop shadow to simulate z axis elevation
                name: 'elevation',
                defaultValue: null,
                type: 'number',
                onAttrChange: (newValue) => { this._setProp('elevation', newValue, true) }
            },
            {
                // the type of the button, simple button or submit button
                name: 'type',
                defaultValue: 'button',
                tyle: 'string'
            }
        ]);

        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });

        // add styles
        const styleElement = this._setupStyleElement(styles);
        this._shadow.append(styleElement);

        // create the html
        const slot = document.createElement('slot');
        this._shadow.append(slot);

        // check if the button is a link
        this.href && (this.role = 'link');
        // set the role forcefully for accessibility
        !this.getAttribute('role') && this.setAttribute('role', this.role);

        // since it its a button, it should be focusable by default
        (!this.getAttribute('tabindex')) && this.setAttribute('tabindex', 0);

        // set the adequate aria disabled attribute
        this._toggleAriaDisabled();

        // add an event listener to handle button press
        this.addEventListener('mousedown', () => {
            this.classList.add('active')
        });

        // add an event listener to handle button release
        this.addEventListener('mouseup', () => {
            this.classList.remove('active')
        });

        // add an event listener to handle button click behavior
        this.addEventListener('click', this._handleClick);

        // add an event listener to handle key press behavior (hitting enter or space while the button is focused)
        this.addEventListener('keydown', this._handleClick);

    }

    /**
     * a function to toggle the aria-disabled attribute (accessibilty) 
     */
    _toggleAriaDisabled() {
        this.setAttribute('aria-disabled', this.hasAttribute('disabled'));
    }

    /**
     * a function to handle the button click mouse, touch or keyboard
     */
    _handleClick(e) {
        const isKeyDown = (e.type === 'keydown');
        const isCorrectKey = (isKeyDown && (e.code === 'Space')) || (isKeyDown && (e.code === 'Enter'));

        const goForIt = (e.type === 'click') || (isKeyDown && isCorrectKey);

        const disabled = this.hasAttribute('disabled');

        if (goForIt && !disabled) {
            // emulating the submit input/button, behavior
            if (this.type === 'submit') {
                const form = this.closest('form');
                if (form) return form.submit();
            }

            // emulating the default behavior of a hyperlink
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
}

export default PtcButton;