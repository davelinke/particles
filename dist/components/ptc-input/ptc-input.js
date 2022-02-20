import Ptc from '../ptc/ptc.js'
import styles from './ptc-input.css.js';

class PtcInput extends Ptc {

    /**
     * the input constructor
     */
     constructor() {
        super();

        // define all properties
        const props = [
            {
                name: 'variant',
                defaultValue: null,
                type: 'oneof',
                typeOptions: [null, 'standard', 'filled', 'outlined']
            },
            {
                name: 'type',
                defaultValue: 'text',
                type: 'oneof',
                typeOptions: ['date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week']
            },
            {
                name: 'autocomplete',
                defaultValue: null,
                type: 'string'
            },
            {
                name: 'autofocus',
                defaultValue: false,
                type: 'boolean'
            },
            {
                name: 'dirname',
                defaultValue: null,
                type: 'string'
            },
            {
                name: 'disabled',
                defaultValue: false,
                type: 'boolean'
            },
            {
                name: 'form',
                defaultValue: null,
                type: 'string'
            },
            {
                name: 'list',
                defaultValue: null,
                type: 'string'
            },
            {
                name: 'maxlength',
                defaultValue: null,
                type: 'number'
            },
            {
                name: 'minlength',
                defaultValue: null,
                type: 'number'
            },
            {
                name: 'pattern',
                defaultValue: null,
                type: 'text'
            },
            {
                name: 'placeholder',
                defaultValue: null,
                type: 'text'
            },
            {
                name: 'readonly',
                defaultValue: false,
                type: 'boolean'
            },
            {
                name: 'required',
                defaultValue: false,
                type: 'boolean'
            },
            {
                name: 'value',
                defaultValue: null,
                type: 'string'
            }
        ]

        // initialize all properties
        this._initProps(props);

        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });

        // add styles
        const styleElement = this._setupStyleElement(styles);
        this._shadow.append(styleElement);

        // create the html input
        const input = document.createElement('input');
        input.setAttribute('type',this.type);

        // add the event listeners for diverse common input functionlities
        input.addEventListener('focus',this._focusHost.bind(this));
        input.addEventListener('blur',this._blurHost.bind(this));
        input.addEventListener('input',this._setValue.bind(this));

        // append the html input to the shadow dom
        this._shadow.append(input);

    }

    /*
    * private method for setting the value internally
    */
    _setValue(e) {
        this.value = e.target.value;


        // fire up the change event
        this.dispatchEvent(new CustomEvent('ptc-change', {
            bubbles: true,
            detail: this.value
        }));
    }

    /*
    * Private method for handling the focus grab
    */
    _focusHost(){
        this.classList.add('selected');
    }

    /*
    * Private method for handling the focus blur
    */
    _blurHost(){
        this.classList.remove('selected');
    }

    // observe properties
    // static get observedAttributes() { return ['variant', 'type', 'disabled'] }
    // attributeChangedCallback(name, oldValue, newValue) {
        
    // }
}

export default PtcInput;