import Ptc from '../ptc/ptc.js'
import styles from './ptc-select.css.js';

class ParticleSelect extends Ptc {

    /**
     * select attributes to be observed 
     */
    static get observedAttributes() { return ['value'] }

    /**
     * the select constructor
     */
    constructor() {
        super();

        // state
        this._isOpen = false;

        this._options = [];

        this._keyQuery = '';

        this._keyQueryTimeout = null;

        // initalize all the card properties
        this._initProps([{
            name: 'value',
            defaultValue: null,
            type: 'string'
        },
        {
            name: 'open',
            defaultValue: false,
            type: 'boolean'
        }]);

        // let's deal with the focus behavior
        // if it doesnt have a tabindex, set it to 0 so it can focus
        if (!this.hasAttribute('tabindex') && this.tabIndex === -1) {
            this.tabIndex = 0;
        }
        this.addEventListener('focus', this._handleFocus)
        this.addEventListener('blur', this._handleBlur)


        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });


        // add styles
        const styleElement = this._setupStyleElement(styles)
        this._shadow.append(styleElement);


        // create the clicker element
        const box = document.createElement('div');
        box.classList.add('box');
        this._shadow.append(box);

        box.addEventListener('click', this.toggle);


        // create the output window
        const boxOutput = document.createElement('div');
        boxOutput.classList.add('box__output');
        boxOutput.innerHTML = 'select';

        this._boxOutput = boxOutput;

        box.append(boxOutput);


        // create the chevron
        const chevron = document.createElement('div');
        chevron.classList.add('chevron');
        chevron.innerHTML = `
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="feather feather-chevron-down"
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>`;

        box.append(chevron)

        // create the backdrop
        const backdrop = document.createElement('div');
        backdrop.classList.add('dropdown__backdrop');
        backdrop.addEventListener('click', this.hideOptions);

        this._shadow.append(backdrop);


        // create the dropdown
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        // add the dropdown to the state so we can access it later
        this._dropdown = dropdown;

        // and if prop open is true, then show the dropdown
        if (this.open) {
            dropdown.classList.add('dropdown--open');
        }

        // create the dropdown list
        const dropdownScroller = document.createElement('div');
        dropdownScroller.classList.add('dropdown__scroller');

        dropdown.appendChild(dropdownScroller);


        // create the slot for the options
        const slot = document.createElement('slot');
        dropdownScroller.append(slot);

        this._shadow.append(dropdown);


        // handle the selection
        this.addEventListener('ptc-option-selected', this._handleOptionSelection);

        // handle the adding of an option
        this.addEventListener('ptc-option-connected', this._handleOptionConnected);

        // handle the mouseover of an option
        this.addEventListener('ptc-option-mouseover', this._handleOptionMouseover);
    }

    /**
     * a method that handles an option being hovered
     */
    _handleOptionMouseover = (e) => {
        // let's highlight the option
        const option = e.detail;
        this._highlightOption(option);
    }

    /**
     * the methods that define how to handle the keystrokes
     */
    _keyMethods = {
        'Enter': () => {
            // if it's open, then select the option highlighted
            const highlightedOption = this._getHighlightedOption();
            if (this._isOpen) {
                highlightedOption && highlightedOption.select();
            } else {

            // then close
            this.toggle();
            }

        },
        'Escape': () => {
            // just close without selecting nothing
            this.hideOptions();
        },
        'ArrowDown': () => {
            // check the option that's highlighted and highlight the next one
            // if there is no highlighted option, then highlight the first one
            // if the last option is highlighted, then highlight the first one

            // if there are no options, then do nothing
            if (!this._options.length) return;

            if (!this._isOpen) return this.toggle();

            const highlightedOption = this._getHighlightedOption();
            let nextOption = null;
            if (highlightedOption) {
                const index = this._options.indexOf(highlightedOption);
                const nextIndex = index + 1;
                nextOption = this._options[nextIndex];
            }

            !nextOption && (nextOption = this._options[0]);

            this._highlightOption(nextOption, highlightedOption);

            nextOption.scrollIntoView({ block: 'nearest' });
        },
        'ArrowUp': () => {
            // check the option that's highlighted and highlight the next one
            // if there is no highlighted option, then highlight the first one
            // if the first option is highlighted, then highlight the last one

            // if there are no options, then do nothing
            if (!this._options.length) return;

            if(!this._isOpen) return;

            const highlightedOption = this._getHighlightedOption();
            let nextOption = null;

            if (highlightedOption) {
                const index = this._options.indexOf(highlightedOption);
                const nextIndex = index - 1;
                nextOption = this._options[nextIndex];
            }

            !nextOption && (nextOption = this._options[this._options.length - 1]);

            this._highlightOption(nextOption, highlightedOption);

            nextOption.scrollIntoView({ block: 'nearest' });
        },
        default: (key) => {
            // if it's open, then search for the first option that starts with the key
            // if it's not open, then search for the first option that starts with the key
            // if it's not found, then do nothing

            // todo - add an event listener to be able to focus not only with one character
            
            if (!this._isOpen) return;

            const isChar = (key.length === 1);

            if (isChar) {
                const keyChar = key.toLowerCase();
                const options = this._options.filter(option => option.innerText.toLowerCase().startsWith(keyChar));
                if (options.length) {
                    const option = options[0];
                    this._highlightOption(option);
                    option.scrollIntoView({ block: 'nearest' });
                }
            }

        }
    }

    /**
     * a method to get the option highlighted
     */
    _getHighlightedOption = () => {
        return this._options.find(option => option.highlighted);
    }

    /**
     * a method to unhighlight an option
     */
    _unhighlightOption = (optionToUnhighlight) => {
        // look for a highlighted option and unhighlight it
        optionToUnhighlight && (optionToUnhighlight.highlighted = false);
    }

    /**
     * a method to highlight an option
     */
    _highlightOption = (optionToHighlight, optionToUnhighlight = null) => {
        // look for a highlighted option and unhighlight it
        !optionToUnhighlight && (optionToUnhighlight = this._getHighlightedOption());
        optionToUnhighlight && this._unhighlightOption(optionToUnhighlight);

        // highlight the new option
        optionToHighlight && (optionToHighlight.highlighted = true);

    }


    /**
     * a method to handle what happens when we focus the component
     */
    _handleFocus = () => {
        // let's start keystroke listening to emulate an actual select
        this.addEventListener('keydown', this._handleKeyDown);
    }
    /**
     * a method to handle what happens when we focus the component
     */
    _handleBlur = () => {
        // let's start keystroke listening to emulate an actual select
        this.removeEventListener('keydown', this._handleKeyDown);
    }

    /**
     * a method to handle what happens when we type while focused
     */
    _handleKeyDown = (e) => {
        // let's start keystroke listening to emulate an actual select
        const key = e.key;
        console.log(key);

        if (this._keyMethods[key]) return this._keyMethods[key](e);

        this._keyMethods.default(key);
    }


    /**
     * a method to handle what happens when we select an option
     */
    _handleOptionSelection = (e) => {
        e.stopPropagation();

        const option = e.detail;
        this.value = option.value;
        this.classList.add('has-value');
        this._boxOutput.innerText = option.innerText;
        this.hideOptions();

        // fire up the change event
        this.dispatchEvent(new CustomEvent('ptc-change', {
            bubbles: true,
            detail: this.value
        }));
    }


    /**
     * a method to handle an option being added to the slot
     */
    _handleOptionConnected = (e) => {
        // let's start keystroke listening to emulate an actual select
        this._options.push(e.detail);
        e.detail.cleanOnDisconnect = () => {
            this._options.forEach((option, index) => {
                if (option === e.detail) {
                    this._options.splice(index, 1);
                }
            })
        };
    }


    /**
     * the method to toggle the options
     */
    toggle = () => {
        if (this._isOpen) {
            this.hideOptions();
        } else {
            this.showOptions();
        }
    }


    /**
     * the method to show the options
     */
    showOptions = () => {
        this._isOpen = true;
        this.classList.add('open');
    }


    /**
     * the method to hide the options
     */
    hideOptions = () => {
        this._isOpen = false;
        this.classList.remove('open');
    }
}

export default ParticleSelect;
