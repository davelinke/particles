export const setupStyleElement = (stylesCss) => {
    const styles = document.createElement('style');
    styles.textContent = stylesCss;
    return styles
}

export function InitProp(name, defaultValue, type){

    !this.getProp && (this.getProp = GetProp.bind(this));
    !this.setProp && (this.setProp = SetProp.bind(this));

    !this.props && (this._props = {});
    
    this._props[name] = {
        value: defaultValue,
        type: type
    }

    Object.defineProperty(this,name,{
        get: ()=>{
            return this.getProp(name);
        },
        set: (val)=>{
            return this.setProp(name,val);
        }
    })
}

export function GetProp(name){
    return this._props[name].value;
}

export function SetProp(name,val, fromAttribute){

    const type = this._props[name].type;
    
    switch (type){
        case 'string':
            if(val){
                this._props[name].value = val
                !fromAttribute && this.setAttribute(name, val);
            } else {
                this._props[name].value = this._props[name].defaultValue;
                !fromAttribute && this.removeAttribute(name);
            }
            break;
        case 'boolean':
            if(val){
                this._props[name].value = true;
                !fromAttribute && this.setAttribute(name,'true');
            } else {
                this._props[name].value = false;
                !fromAttribute && this.removeAttribute(name);
            }
            break;
        default:
            console.log('default')
    }

    return val;
}