export default `*{-webkit-font-smoothing:antialiased}:host{display:inline-block;user-select:none;padding-inline-start:calc(16px + 0.5rem);position:relative;cursor:pointer;outline:none}:host::before{content:" ";display:block;width:var(--ptc-checkbox__width--idle, var(--ptc-toggle__width--idle, 16px));height:var(--ptc-checkbox__height--idle, var(--ptc-toggle__height--idle, 16px));border-style:var(--ptc-checkbox__border-style--idle, var(--ptc-toggle__border-style--idle, solid));border-width:var(--ptc-checkbox__border-width--idle, var(--ptc-toggle__border-width--idle, 1px));border-color:var(--ptc-checkbox__border-color--idle, var(--ptc-toggle__border-color--idle, hsl(0deg, 0%, 50%)));border-radius:var(--ptc-checkbox__border-radius--idle, var(--ptc-toggle__border-radius--idle, 0));background-color:var(--ptc-checkbox__background-color--idle, var(--ptc-toggle__background-color--idle, #fff));margin-inline-end:.5rem;position:absolute;top:0;left:0}:host(:focus)::before{border-color:var(--ptc-checkbox__border-color--focus, var(--ptc-toggle__border-color--focus, #2b9eb8))}:host([checked])::before{background-color:var(--ptc-checkbox__background-color--checked, var(--ptc-toggle__background-color--checked, #238196));background-image:var(--ptc-checkbox__background-image--checked, var(--ptc-toggle__background-image--checked, url(data:image/svg+xml,%3Csvg%20width%3D%22500%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M500%200v500H0V0h500zM380.816%20100L202.632%20282.637l-83.464-79.121-58.642%2058.673L202.632%20400l236.842-241.342L380.816%20100z%22%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)));background-size:cover}:host([indeterminate])::before{background-color:var(--ptc-checkbox__background-color--indeterminate, var(--ptc-toggle__background-color--indeterminate, hsl(0deg, 0%, 50%)));background-image:var(--ptc-checkbox__background-image--indeterminate, var(--ptc-toggle__background-image--indeterminate, url(data:image/svg+xml,%3Csvg%20width%3D%22500%22%20height%3D%22500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M500%200v500H0V0h500zm-60.526%20206H60.526v88h378.948v-88z%22%20fill%3D%22%23FFF%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)));background-size:cover}:host([disbled]){pointer-events:none;cursor:not-allowed}:host([disabled]:focus)::before{border-color:var(--ptc-checkbox__border-color--focus, var(--ptc-toggle__border-color--focus, hsl(0deg, 0%, 50%)))}:host([disabled])::before{opacity:var(--ptc-checkbox__opacity--disabled, var(--ptc-toggle__opacity--disabled, 0.6))}:host([checked][disabled])::before,:host([indeterminate][disabled])::before{background-color:var(--ptc-checkbox__background-color--disabled, var(--ptc-toggle__background-color--disabled, hsl(0deg, 0%, 50%)))}`