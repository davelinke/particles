export async function LoadParticles(particles) {
    // 
    let skeletonCss = '';
    const moduleCalls = [];

    particles.forEach(async (particle) => {
        skeletonCss += `${particle}:not(:defined){display:inline-block;background-color:#e0e0e0; color:transparent;};`
        moduleCalls.push(import(`./${particle}/${particle}.js`));
    });

    const style = document.createElement('style');
    style.textContent = skeletonCss;
    document.querySelector('head').appendChild(style);
    
    const loadedModules = await Promise.all(moduleCalls);
    
    particles.forEach((particle, i) => {
        const loadedModule = loadedModules[i];
        customElements.define(particle, loadedModule.default);
    });    
}