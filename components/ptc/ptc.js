export default class Particle extends HTMLElement {
    constructor() {
        super();
    }
    initialize(compProps) {
        // initialize the properties
        this._props = {
            ...{
                shadow: 'closed',
                properties: [],
                template: ``,
                styles: ``,
                styleSheets: [],
                ariaRole: null
            },
            ...compProps
        };
        // create the shadow dom
        this._shadow = this.attachShadow({ mode: this._props.shadow });

        // initialize properties

        this._props.properties.forEach((prop) => {
            const propAttrExists = this.hasAttribute(prop.name);

            const propAttrValue = this.getAttribute(prop.name);

            this[prop.name] = propAttrValue ? propAttrValue : (prop.defaultValue ? prop.defaultValue : propAttrExists);
        });

        // append stylesheets
        this._props.styleSheets.forEach((ssUrl) => {
            const ssTag = document.createElement('link');
            ssTag.setAttribute('href', ssUrl);
            ssTag.setAttribute('rel', 'stylesheet');
            ssTag.setAttribute('type', 'text/css');
            this._shadow.append(ssTag);
        });

        // append the styles
        const styles = document.createElement('style');
        styles.textContent = this._props.styles;

        this._shadow.append(styles);

        this.parseTemplate = (htmlString)=>{
            // replace variables
            const theArray = htmlString.split(/({{\s*[\w\.]+\s*}})/g);
            const outputArray = [];
            theArray.forEach((piece)=>{
                if (piece.match(/{{\s*[\w\.]+\s*}}/)){
                    const varname = piece.replace('{{','').replace('}}','');
                    outputArray.push(this[varname]);
                } else {
                    outputArray.push(piece)
                }
            });
            const htmlOutput = outputArray.join('');
            return htmlOutput;
        }

        // parse and append the html
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.parseTemplate(this._props.template);
        Array.from(tempDiv.children).forEach((childNode) => {
            // lets see if it's the host special tag
            if (childNode.tagName==='HOST'){
                // let's add all of the attributes and events to the host itself
                const atts = childNode.attributes;
                Array.from(atts).forEach((att)=>{
                    // let's treat classes to add up to what the actual html has
                    if (att.name==='class'){
                        childNode.classList.forEach((classname)=>{
                            this.classList.add(classname);
                        });
                    } else {
                        this.setAttribute(att.name, att.value);
                    }
                });
                // lest append the host childnodes to the shadow dom
                Array.from(childNode.children).forEach((hostChild)=>{
                    this._shadow.append(hostChild);
                });
            } else {
                this._shadow.append(childNode);
            }
            
        });
    }
}