import { LoadParticles } from '/components/index.js'

LoadParticles(['ptc-button', 'ptc-card', 'ptc-content', 'ptc-checkbox', 'ptc-input', 'ptc-select', 'ptc-option']);

(function () {
    //button = document.querySelector('ptc-button');
    document.querySelectorAll('ptc-checkbox').forEach((checkbox) => {
        checkbox.addEventListener('blur', () => {
            console.log('blur')
        }, true)
    })
    const feather = feather || undefined;
    if (feather) {
        feather.replace({
            'stroke-width': 2,
            width: 22,
            height: 22
        });
    }

})();