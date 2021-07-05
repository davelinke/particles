class Ptc extends HTMLElement {
    _props = {};

    setupStyleElement(stylesCss) {
        const styles = document.createElement('style');
        styles.textContent = stylesCss;
        return styles
    }

    initProps(propsArray) {
        const defaultPropValues = {
            defaultValue: null,
            type: 'string'
        }

        for (let baseProp of propsArray) {
            const prop = { ...defaultPropValues, ...baseProp };
            prop.name && this.initProp(prop.name, prop.defaultValue, prop.type);
        }
    }

    initProp(name, defaultValue, type) {

        let attrValue = this.getAttribute(name);

        (type === 'boolean') && ((attrValue !== null) && (attrValue !== false)) && (attrValue = true);
        this._props[name] = {
            value: (attrValue ? attrValue : defaultValue),
            type: type
        }


        Object.defineProperty(this, name, {
            get: () => {
                return this.getProp(name);
            },
            set: (val) => {
                this.setProp(name, val);
            }
        })
    }

    getProp(name) {
        return this._props[name].value;
    }

    setProp(name, val, fromAttribute) {

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
            default:
                console.log("default");
        }

        return val;
    }
}

export default Ptc