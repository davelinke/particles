export function LoadParticles(particles) {
    particles.forEach(async (particle) => {
        const component = await import(`./${particle}/${particle}.js`);
        customElements.define(particle, component.default);
    });
}