# a11y-contrast-color

a11y-contrast-color is a utility library for calculating luminance, contrast ratio, and appropriate contrast colors to ensure accessibility compliance in web applications. It helps developers easily determine whether text and background color combinations meet the WCAG (Web Content Accessibility Guidelines) standards.

- [a11y-contrast-color](#a11y-contrast-color)
  - [Installation](#installation)
  - [Usage](#usage)
    - [getLuminance](#getLuminance)
    - [getContrastRatio](#getContrastRatio)
    - [getContrastColor](#getContrastColor)

## Installation

```sh
npm i a11y-contrast-color
```

Or

```sh
yarn add a11y-contrast-color
```

## Usage

### `getLuminance`

Calculates the luminance of a color.

#### Parameters

- color: RGB (required): An array of three numbers representing the RGB values of the color.

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

- lum1: number (required): The first luminance value.
- lum2: number (required): The second luminance value.

#### Returns

- number: The contrast ratio between the two luminance values.

```ts
import { getContrastRatio } from 'a11y-contrast-color';

const contrastRatio = getContrastRatio(0.2126, 1.0);
console.log(contrastRatio); // Output: 5.252
```

### `getContrastColor`

Determines the appropriate contrast color (black or white) for a given background color to ensure readability.

#### Parameters

- color: RGB (required): An array of three numbers representing the RGB values of the background color.
- luminance: number (required): The target luminance ratio to achieve.

#### Returns

- RGB | null: An array representing the RGB values of the contrast color, or null if no suitable color is found.

```ts
import { getContrastColor } from 'a11y-contrast-color';

const contrastColor = getContrastColor([255, 0, 0], 4.5);
console.log(contrastColor); // Output: [R, G, B] || null depending on the contrast requirement
```

This library provides essential functions to help you maintain high accessibility standards in your web applications by ensuring that text is readable against various background colors.
