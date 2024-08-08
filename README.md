# 🎨 a11y-contrast-color 🎨

**a11y-contrast-color** is a utility library for calculating [luminance](https://www.w3.org/TR/WCAG20/relative-luminance.xml), [contrast ratio](https://www.w3.org/TR/WCAG20/#contrast-ratiodef), and recommending appropriate contrast colors to ensure accessibility compliance in web applications.

It helps developers easily determine whether text and background color combinations meet the [Web Content Accessibility Guidelines(WCAG) standards](https://www.w3.org/WAI/older-users/developing/#color) by providing functions to recommend contrast colors that can improve readability and accessibility.

## Installation

```sh
npm install a11y-contrast-color
```

Or

```sh
yarn add a11y-contrast-color
```

## Usage

### `getLuminance`

Calculates the luminance of a color.

#### Parameters

- color: RGB (required): An array of three numbers representing the `RGB values(value in the range of [0,255])` of the color.

#### Returns

- number: The calculated luminance value.

```ts
import { getLuminance } from 'a11y-contrast-color';

const luminance = getLuminance([255, 0, 0]);
console.log(luminance); // Output: 0.2126
```

### `getContrastRatio`

Calculates the contrast ratio between two colors.

#### Parameters

- color1: RGB (required): The first color value in RGB format.
- color2: RGB (required): The second color value in RGB format.

#### Returns

- number: The contrast ratio between the two luminance values.

```ts
import { getContrastRatio } from 'a11y-contrast-color';

const color1 = [128, 128, 128];
const color2 = [255, 255, 255];
const contrastRatio = getContrastRatio(color1, color2);
console.log(contrastRatio); // Output: 3.949439...
```

### `getContrastColor`

Determines the appropriate contrast color (black or white) for a given background color to ensure readability.

#### Parameters

- color: RGB (required): An array of three numbers representing the RGB values of the background color.
- luminance: number (required): The target luminance ratio to be achieved or exceeded.

#### Returns

- RGB | null: An array representing the RGB values of the contrast color, or null if no suitable color is found.

```ts
import { getContrastColor } from 'a11y-contrast-color';

const contrastColor = getContrastColor([255, 0, 0], 4.5);
console.log(contrastColor); // Output: [R, G, B] || null depending on the contrast requirement
```

---

All projects are under the MIT license. Please refer to the [LICENSE](LICENSE) file for more information.
