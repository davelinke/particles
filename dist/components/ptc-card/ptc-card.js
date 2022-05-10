import Ptc from '../ptc/ptc.js'
import styles from './ptc-card.css.js';

/** 
 * Class for Card Custom Element.
 * 
 * @element ptc-card
 * 
 * @attr {0|1|2|3} [elevation] - The elevation of the button.
 * 
 * @slot - The contents of the card.
 * 
 * @cssprop {string} [--ptc-ptc-content__background-color--idle=--ptc-ptc-container__background-color--idle (#fff)] - The background color of the card on idle state.
 * @cssprop {string} [--ptc-ptc-content__text-color--idle=--ptc-ptc-container__text-color--idle (#333)] - The text color for the card contents on idle state.
 * @cssprop {string} [--ptc-ptc-content__padding--idle=--ptc-ptc-container__padding--idle (0.75rem)] - The padding of the card on idle state.
 * 
 * @alias PtcCard
 * @extends Ptc 
 * @hideconstructor
 * @customElement
 * 
 * @example
 * <ptc-card elevation="1" class="cards">
 *      <img width="100%" src="assets/images/particles.webp" />
 *      <ptc-content>
 *          <h3>As you can see...</h3>
 *          <p>we’ve had our eye on you for some time now, Mr. Anderson. It seems that you’ve been living two lives. In one life...</p>
 *      </ptc-content>
 *      <ptc-action-bar></ptc-action-bar>
 * </ptc-card>
 * */
class ParticleCard extends Ptc {

    /**
     * Card attributes to be observed 
     */
    static get observedAttributes() {
        return [
            /**
             * The visual elevation (shading) of the button
             */
            'elevation'
        ]
    }

    /**
     * Constructor of {@link PtcCard}
     */
    constructor() {
        super();

        // initalize all the card properties
        this._initProps([{
            // the elevation defines a visual effect of drop shadow to simulate z axis elevation
            name: 'elevation',
            defaultValue: null,
            type: 'number',
            onAttrChange: (newValue) => { this._setProp('elevation', newValue, true) }
        }]);

        // attach shadow dom
        this._shadow = this.attachShadow({ mode: 'open' });

        // add styles
        const styleElement = this._setupStyleElement(styles)
        this._shadow.append(styleElement);

        // create the html
        const slot = document.createElement('slot');
        this._shadow.append(slot);
    }
}

export default ParticleCard;
