import Ptc from '../ptc/ptc.js'
import styles from './ptc-input.css.js';

class PtcInput extends Ptc {

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
                name: 'type',
                defaultValue: 'text',
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
        const input = document.createElement('input');
        input.setAttribute('type',this.type);
        input.addEventListener('focus',this.focusHost.bind(this));

        input.addEventListener('blur',this.blurHost.bind(this));
        this._shadow.append(input);

    }

    focusHost(){
        this.classList.add('selected');
    }

    blurHost(){
        this.classList.remove('selected');
    }

    // observe properties
    static get observedAttributes() { return ['variant', 'type', 'disabled'] }
    attributeChangedCallback(name, oldValue, newValue) {
        
    }

    // on connect
    connectedCallback() { }
}

export default PtcInput;

// input[type=date],
// input[type=datetime],
// input[type=datetime-local],
// input[type=email],
// input[type=month],
// input[type=number],
// input[type=password],
// input[type=range],
// input[type=search],
// input[type=tel],
// input[type=text],
// input[type=time],
// input[type=url],
// input[type=week]