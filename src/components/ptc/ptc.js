class Ptc extends HTMLElement {
    _props = {};

    _setupStyleElement(stylesCss) {
        const styles = document.createElement('style');
        styles.textContent = stylesCss;
        return styles
    }

    _initProps(propsArray) {
        const defaultPropValues = {
            defaultValue: null,
            type: 'string',
            reflect: true
        }

        for (let baseProp of propsArray) {
            const prop = { ...defaultPropValues, ...baseProp };
            prop.name && this._initProp(prop.name, prop.defaultValue, prop.type);
        }
    }

    _initProp(name, defaultValue, type) {

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
            type: type
        }
    }

    _getProp(name) {
        return this._props[name].value;
    }

    _setProp(name, val, fromAttribute) {
        console.log(name);
        const type = this._props[name].type;

        switch (type) {
            case 'string':
                if (val) {
                    this._props[name].value = val
                    !fromAttribute && this.setAttribute(name, val);
                } else {
                    this._props[name].value = this._props[name].defaultValue;
                    !fromAttribute && this.removeAttribute(name);
                }
                break;
            case 'boolean':
                if (val) {
                    this._props[name].value = true;
                    !fromAttribute && this.setAttribute(name, 'true');
                } else {
                    this._props[name].value = false;
                    !fromAttribute && this.removeAttribute(name);
                }
                break;
            case 'number':
                if (val && !parseInt(val).isNaN()) {
                    this._props[name].value = val
                    !fromAttribute && this.setAttribute(name, val);
                } else {
                    this._props[name].value = this._props[name].defaultValue;
                    !fromAttribute && this.removeAttribute(name);
                }
                break;
            case 'oneof':
                const options = this._props[name].typeOptions;
                if (val && options.includes(val)) {
                    this._props[name].value = val
                    !fromAttribute && this.setAttribute(name, val);
                } else {
                    this._props[name].value = this._props[name].defaultValue;
                    !fromAttribute && this.removeAttribute(name);
                }
                break;
            default:
                console.log("default");
        }

        return val;
    }
}

export default Ptc