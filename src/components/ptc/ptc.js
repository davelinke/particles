class Ptc extends HTMLElement {
    _props = {};

    /**
    * This is the catch all function for attrribute changes in a web component
    * we essentially execute the onAttrChange function defined in the properties
    * so that we have a standardized way of doing it
    */
    attributeChangedCallback(name, oldValue, newValue) {
        this._props[name] && this._props[name].onAttrChange && this._props[name].onAttrChange(newValue, oldValue);
    }

    /**
    * A private method for creating the style tag within the shadow dom
    */
    _setupStyleElement(stylesCss) {
        const styles = document.createElement('style');
        styles.textContent = stylesCss;
        return styles
    }

    /**
    * A private method that initializes all the properties passed to this function on the componet initialization.
    */
    _initProps(propsArray) {
        const defaultPropValues = {
            defaultValue: null,
            type: 'string',
            reflect: true,
            onAttrChange: null
        }

        const observedAttributes = [];

        for (let baseProp of propsArray) {
            // make an array of observed attributes
            baseProp.onAttrChange && observedAttributes.push(baseProp.name);

            const prop = { ...defaultPropValues, ...baseProp };
            prop.name && this._initProp(prop.name, prop.defaultValue, prop.type, prop.onAttrChange);
        }
    }

    /**
    * A method to initialize a component getter setter property
    */
    _initProp(name, defaultValue, type, onAttrChange) {

        Object.defineProperty(this, name, {
            get: () => {
                return this._props[name].value;
            },
            set: (val) => {
                this._setProp(name, val);
            }
        });

        let attrValue = (type === 'boolean' ? this.hasAttribute(name) : this.getAttribute(name));
        let faceValue = attrValue;

        if (type !== 'boolean') {
            faceValue = (attrValue ? attrValue : defaultValue);
        }

        this._props[name] = {
            value: faceValue,
            type: type,
            onAttrChange: onAttrChange
        }
    }

    /**
    * the standardized method to fet a property value
    */
    _getProp(name) {
        return this._props[name].value;
    }

    /**
    * the standardized method to set a property value
    */
    _setProp(name, val, fromAttribute) {
        const type = this._props[name].type;

        switch (type) {
            // if the declared property type is a boolean
            case 'boolean':
                if (val) {
                    this._props[name].value = true;
                    !fromAttribute && this.setAttribute(name, 'true');
                } else {
                    this._props[name].value = false;
                    !fromAttribute && this.removeAttribute(name);
                }
                break;
            // if the declared property type is a number
            case 'number':
                if (val && !parseInt(val).isNaN()) {
                    this._props[name].value = val
                    !fromAttribute && this.setAttribute(name, val);
                } else {
                    this._props[name].value = this._props[name].defaultValue;
                    !fromAttribute && this.removeAttribute(name);
                }
                break;
            // if the declared property type is a one of an array of possible values
            case 'oneof':
                if (val && this._props[name].typeOptions.includes(val)) {
                    this._props[name].value = val
                    !fromAttribute && this.setAttribute(name, val);
                } else {
                    this._props[name].value = this._props[name].defaultValue;
                    !fromAttribute && this.removeAttribute(name);
                }
                break;
            // we default for if the declared property type is a string
            default:
                if (val) {
                    this._props[name].value = val
                    !fromAttribute && this.setAttribute(name, val);
                } else {
                    this._props[name].value = this._props[name].defaultValue;
                    !fromAttribute && this.removeAttribute(name);
                }
        }

        return val;
    }
}

export default Ptc