export default `*{-webkit-font-smoothing:antialiased}:host([elevation="1"]){box-shadow:var(--ptc-elevation__one-shadow-horizontal, 0) var(--ptc-elevation__one-shadow-vertical, 2px) var(--ptc-elevation__one-shadow-blur, 3px) var(--ptc-elevation__one-shadow-color, rgba(0, 0, 0, 0.35))}:host([elevation="2"]){box-shadow:var(--ptc-elevation__two-shadow-horizontal, 0) var(--ptc-elevation__two-shadow-vertical, 4px) var(--ptc-elevation__two-shadow-blur, 5px) var(--ptc-elevation__two-shadow-color, rgba(0, 0, 0, 0.35))}:host([elevation="3"]){box-shadow:var(--ptc-elevation__three-shadow-horizontal, 0) var(--ptc-elevation__three-shadow-vertical, 8px) var(--ptc-elevation__three-shadow-blur, 8px) var(--ptc-elevation__three-shadow-color, rgba(0, 0, 0, 0.35))}:host{background-color:var(--ptc-button__background-color--idle, var(--ptc-color-cta__background-color--idle, #238196));color:var(--ptc-button__color--idle, var(--ptc-color-cta__color--idle, #fff));padding:var(--ptc-button__padding--idle, var(--ptc-color-cta__padding--idle, 0 1.25rem));height:var(--ptc-button__height--idle, var(--ptc-color-cta__height--idle, 2.125rem));margin:var(--ptc-button__margin--idle, var(--ptc-color-cta__margin--idle, 0));font-weight:var(--ptc-button__font-weight--idle, var(--ptc-color-cta__font-weight--idle, 600));font-size:var(--ptc-button__font-size--idle, var(--ptc-color-cta__font-size--idle, 1rem));border-color:var(--ptc-button__border-color--idle, var(--ptc-color-cta__border-color--idle, #238196));border-width:var(--ptc-button__border-width--idle, var(--ptc-color-cta__border-width--idle, 0.125rem));border-style:var(--ptc-button__border-style--idle, var(--ptc-color-cta__border-style--idle, solid));border-radius:var(--ptc-button__border-radius--idle, var(--ptc-color-cta__border-radius--idle, 0));white-space:var(--ptc-button__white-space--idle, var(--ptc-color-cta__white-space--idle, nowrap));outline:none;cursor:pointer;display:inline-flex;align-items:center;user-select:none}:host(.active){background-color:var(--ptc-button__background-color--active, var(--ptc-color-cta__background-color--active, #1d697b));border-color:var(--ptc-button__border-color--active, var(--ptc-color-cta__border-color--active, #1d697b))}:host(:focus){background-color:var(--ptc-button__background-color--selected, var(--ptc-color-cta__background-color--selected, #2b9eb8));border-color:var(--ptc-button__border-color--selected, var(--ptc-color-cta__border-color--selected, #2b9eb8))}:host([disabled]),:host([disabled]:focus){background-color:var(--ptc-button__background-color--disabled, var(--ptc-color-cta__background-color--disabled, hsl(0deg, 0%, 50%)));border-color:var(--ptc-button__border-color--disabled, var(--ptc-color-cta__border-color--disabled, hsl(0deg, 0%, 50%)));opacity:var(--ptc-button__opacity--disabled, var(--ptc-color-cta__opacity--disabled, 0.6));pointer-events:none;cursor:not-allowed}:host([variant=completion]){background-color:var(--ptc-button-completion__background-color--idle, var(--ptc-color-success__background-color--idle, #2a8562));border-color:var(--ptc-button-completion__border-color--idle, var(--ptc-color-success__border-color--idle, #2a8562))}:host([variant=completion].active){background-color:var(--ptc-button-completion__background-color--active, var(--ptc-color-success__background-color--active, #247153));border-color:var(--ptc-button-completion__border-color--active, var(--ptc-color-success__border-color--active, #247153))}:host([variant=completion]:focus){background-color:var(--ptc-button-completion__background-color--selected, var(--ptc-color-success__background-color--selected, rgb(11, 177, 20)));border-color:var(--ptc-button-completion__border-color--selected, var(--ptc-color-success__border-color--selected, rgb(11, 177, 20)))}:host([variant=secondary]){background-color:var(--ptc-button-secondary__background-color--idle, var(--ptc-color-success__background-color--idle, #fff));color:var(--ptc-button-secondary__color--idle, var(--ptc-color-success__color--idle, #238196));border-color:var(--ptc-button-secondary__border-color--idle, var(--ptc-color-success__border-color--idle, #238196));border-width:var(--ptc-button-secondary__border-width--idle, var(--ptc-color-success__border-width--idle, 0.125rem));border-style:var(--ptc-button-secondary__border-style--idle, var(--ptc-color-success__border-style--idle, solid))}:host([variant=secondary][disabled]),:host([variant=secondary][disabled]:focus){border-color:var(--ptc-button__border-color--disabled, var(--ptc-color-cta__border-color--disabled, hsl(0deg, 0%, 50%)));color:var(--ptc-button__color--disabled, var(--ptc-color-cta__color--disabled, hsl(0deg, 0%, 50%)))}:host([variant=secondary].active){color:var(--ptc-button-secondary__color--active, var(--ptc-color-success__color--active, #1d697b));border-color:var(--ptc-button-secondary__border-color--active, var(--ptc-color-success__border-color--active, #1d697b));background-color:var(--ptc-button-secondary__background-color--active, var(--ptc-color-success__background-color--active, #fff))}:host([variant=secondary]:focus){color:var(--ptc-button-secondary__color--selected, var(--ptc-color-success__color--selected, #2b9eb8));border-color:var(--ptc-button-secondary__border-color--selected, var(--ptc-color-success__border-color--selected, #2b9eb8));background-color:var(--ptc-button-secondary__background-color--selected, var(--ptc-color-success__background-color--selected, #fff))}:host([variant=text]){color:var(--ptc-button-secondary__color--idle, var(--ptc-color-success__color--idle, #238196));border:none;background:none;box-shadow:none !important;padding:0;margin:0}:host([variant=text][disabled]){color:var(--ptc-button__color--disabled, var(--ptc-color-cta__color--disabled, hsl(0deg, 0%, 50%)))}:host([variant=text].active){color:var(--ptc-button-text__color--active, var(--ptc-color-success__color--active, #1d697b))}:host([variant=text]:focus){color:var(--ptc-button-text__color--selected, var(--ptc-color-success__color--selected, #2b9eb8))}@media(hover: hover){:host(:hover){background-color:var(--ptc-button__background-color--selected, var(--ptc-color-cta__background-color--selected, #2b9eb8));border-color:var(--ptc-button__border-color--selected, var(--ptc-color-cta__border-color--selected, #2b9eb8))}:host(:hover.active){background-color:var(--ptc-button__background-color--active, var(--ptc-color-cta__background-color--active, #1d697b));border-color:var(--ptc-button__border-color--active, var(--ptc-color-cta__border-color--active, #1d697b))}:host([variant=completion]:hover){background-color:var(--ptc-button-completion__background-color--selected, var(--ptc-color-success__background-color--selected, rgb(11, 177, 20)));border-color:var(--ptc-button-completion__border-color--selected, var(--ptc-color-success__border-color--selected, rgb(11, 177, 20)))}:host([variant=completion]:hover.active){background-color:var(--ptc-button-completion__background-color--active, var(--ptc-color-success__background-color--active, #247153));border-color:var(--ptc-button-completion__border-color--active, var(--ptc-color-success__border-color--active, #247153))}:host([variant=secondary]:hover){color:var(--ptc-button-secondary__color--selected, var(--ptc-color-success__color--selected, #2b9eb8));border-color:var(--ptc-button-secondary__border-color--selected, var(--ptc-color-success__border-color--selected, #2b9eb8));background-color:var(--ptc-button-secondary__background-color--selected, var(--ptc-color-success__background-color--selected, #fff))}:host([variant=secondary]:hover.active){color:var(--ptc-button-secondary__color--active, var(--ptc-color-success__color--active, #1d697b));border-color:var(--ptc-button-secondary__border-color--active, var(--ptc-color-success__border-color--active, #1d697b));background-color:var(--ptc-button-secondary__background-color--active, var(--ptc-color-success__background-color--active, #fff))}:host([variant=text]:hover){color:var(--ptc-button-text__color--selected, var(--ptc-color-success__color--selected, #2b9eb8));background:none}:host([variant=text]:hover.active){color:var(--ptc-button-text__color--active, var(--ptc-color-success__color--active, #1d697b))}}`