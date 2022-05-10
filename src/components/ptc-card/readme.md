# ptc-card

Class for Card Custom Element.

## Example

```html
<ptc-card elevation="1" class="cards">
     <img width="100%" src="assets/images/particles.webp" />
     <ptc-content>
         <h3>As you can see...</h3>
         <p>we’ve had our eye on you for some time now, Mr. Anderson. It seems that you’ve been living two lives. In one life...</p>
     </ptc-content>
     <ptc-action-bar></ptc-action-bar>
</ptc-card>
```

## Attributes

| Attribute   | Type         | Description                  |
|-------------|--------------|------------------------------|
| `elevation` | `0\|1\|2\|3` | The elevation of the button. |

## Slots

| Name | Description               |
|------|---------------------------|
|      | The contents of the card. |

## CSS Custom Properties

| Property                                    | Type   | Default                                          | Description                                      |
|---------------------------------------------|--------|--------------------------------------------------|--------------------------------------------------|
| `--ptc-ptc-content__background-color--idle` | string | "--ptc-ptc-container__background-color--idle (#fff)" | The background color of the card on idle state.  |
| `--ptc-ptc-content__padding--idle`          | string | "--ptc-ptc-container__padding--idle (0.75rem)"   | The padding of the card on idle state.           |
| `--ptc-ptc-content__text-color--idle`       | string | "--ptc-ptc-container__text-color--idle (#333)"   | The text color for the card contents on idle state. |
