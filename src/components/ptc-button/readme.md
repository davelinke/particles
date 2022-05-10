# ptc-button

Class for Button Custom Element.

## Example

```html
<ptc-button variant="primary">Button</ptc-button>
```

## Attributes

| Attribute   | Type                                   | Description                       |
|-------------|----------------------------------------|-----------------------------------|
| `disabled`  | `Boolean`                              | The disabled state of the button. |
| `elevation` | `0\|1\|2\|3`                           | The elevation of the button.      |
| `target`    | `string`                               | The target of the link.           |
| `variant`   | `completion\|primary\|secondary\|text` | The variant of the button.        |

## Properties

| Property | Attribute | Type     | Description             |
|----------|-----------|----------|-------------------------|
| `href`   | `href`    | `string` | The href of the button. |

## Slots

| Name | Description                |
|------|----------------------------|
|      | The content of the button. |

## CSS Custom Properties

| Property             | Type   | Description                                      |
|----------------------|--------|--------------------------------------------------|
| `--background-color` | string | The background color of the button when the variant is completion. |
