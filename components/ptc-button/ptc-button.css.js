export default `
:host{
    background-color: var(--p-button--default__bgcolor, var(--p-cta__color-primary-idle, rgb(100, 149, 237)));
    padding:0.5rem 1.25rem;
    color: var(--p-button--default__textcolor, var(--p-cta__color-secondary-idle, #fff));
    border-radius: var(--p-button--default__border-radius, var(--p-cta__border-radius, 2px));
    cursor:pointer;
}
@media(hover:hover){
    :host(:hover){
        background-color: rgb(109 201 228);  
    }
}
`