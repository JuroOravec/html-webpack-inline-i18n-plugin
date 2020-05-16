# html-webpack-inline-i18n-plugin

[![Latest Version](https://img.shields.io/npm/v/html-webpack-inline-i18n-plugin/latest.svg)](https://www.npmjs.com/package/html-webpack-inline-i18n-plugin)
[![Documentation](https://img.shields.io/badge/docs-yes-brightgreen.svg)](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/tree/master/docs)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](#-contributing)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://tldrlegal.com/license/mit-license)
[![Package Size](https://img.shields.io/bundlephobia/min/html-webpack-inline-i18n-plugin)](https://bundlephobia.com/result?p=html-webpack-inline-i18n-plugin)

[![Build Status](https://travis-ci.org/JuroOravec/html-webpack-inline-i18n-plugin.svg?branch=master)](https://travis-ci.org/JuroOravec/html-webpack-inline-i18n-plugin)
![Dependencies](https://david-dm.org/JuroOravec/html-webpack-inline-i18n-plugin.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/JuroOravec/html-webpack-inline-i18n-plugin/badge.svg)](https://snyk.io/test/github/JuroOravec/html-webpack-inline-i18n-plugin)
[![codecov](https://codecov.io/gh/JuroOravec/html-webpack-inline-i18n-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/JuroOravec/html-webpack-inline-i18n-plugin)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/JuroOravec/html-webpack-inline-i18n-plugin.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/JuroOravec/html-webpack-inline-i18n-plugin/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/JuroOravec/html-webpack-inline-i18n-plugin.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/JuroOravec/html-webpack-inline-i18n-plugin/context:javascript)
[![Maintainability](https://api.codeclimate.com/v1/badges/eb4da8c3b8fd4c65ffb4/maintainability)](https://codeclimate.com/github/JuroOravec/html-webpack-inline-i18n-plugin/maintainability)

---

<!--
One-liner explaining the purpose of the module
-->

[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) plugin for inlining i18n assets, like those from [mini-i18n-extract-plugin](https://github.com/JuroOravec/mini-i18n-extract-plugin).

#### 🏠 [Homepage](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin#readme) | 🗃 [Repository](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin) | 📦 [NPM](https://www.npmjs.com/package/html-webpack-inline-i18n-plugin) | 📚 [Documentation](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/tree/master/docs) | 🐛 [Issue Tracker](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/issues)

## 🪑 Table of Content

- [🧰 Features](#-features)
- [👶 Install](#-install)
- [🚀 Usage](#-usage)
- [🤖 API](#-api)
- [⏳ Changelog](#-changelog)
- [🛠 Developing](#-developing)
- [🏗 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [🧙 Contributors](#-contributors)
- [⭐ Show your support](#-show-your-support)
- [🐙 Community](#-community)
- [🔗 Related Projects](#-related-projects)
- [👨‍🔧 Maintainers](#-maintainers)
- [📝 License](#-license)

## 🧰 Features

<!--
A brief description of your project, what it is used for and how does life get
awesome when someone starts to use it.

- Note and briefly describe any key concepts (technical, philosophical, or both) important to the user’s understanding.
- Link to any supplementary blog posts or project main pages.
- State if it is out-of-the-box user-friendly, so it’s clear to the user.
- List its most useful/innovative/noteworthy features.
- State its goals/what problem(s) it solves.
-->

Automatically inline information on all available translation files.

- Indexed by locales.
- Fetch the files when you need them.
- Included assets, locale detection, and the inserted HTML tag and its position
  can all be overriden.

## 👶 Install

```sh
npm install -D html-webpack-inline-i18n-plugin
```

## 🚀 Usage

The plugin looks for translation (i18n) files among the assets
emitted by Webpack, detects which locale the files relate to, and inserts the
information to the HTML file created by [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin):

```html
<!-- ./dist/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Webpack App</title>
  </head>
  <body>
    <!-- Following div is inserted by the plugin -->
    <div
      id="i18n"
      data-de="main.de.i18n.json"
      data-en="main.en.i18n.json"
    ></div>
    <script src="main.js"></script>
  </body>
</html>
```

The locales files can then be accessed on the webpage to fetch individual
locales files when needed:

```js
const localesData = window.document.querySelect('#i18n').dataset;
// or window.document.getElementById('i18n').dataset;

console.log(localesData);
// {
//    de: "main.de.i18n.json",
//    en: "main.en.i18n.json"
// }

// Get available locales
Object.keys(localesData);

// Fetch the translations
const response = await fetch(localesData.de);
const deData = response.json();

console.log(deData);
// {
//    greeting: "Tschüß!"
// }
```

The keys are extracted from the asset names. If you have a single file with all
translations, or the regex that parses the asset name fails to match a locale
name, the asset is stored under the `default` key instead.

```js
const localesData = window.document.querySelect('#i18n').dataset;
// or window.document.getElementById('i18n').dataset;

console.log(localesData);
// {
//    default: "main.i18n.json"
// }

// Fetch the translations
const response = await fetch(localesData.default);
const data = response.json();

console.log(data);
// {
//    en: {
//      greeting: "Hello!"
//    },
//    de: {
//      greeting: "Tschüß!"
//    }
// }
```

When using this package, it is recommended to wrap it in a service that manages
the retrieval of the asset files and loading of the data onto a package that
provides the i18n functionality, like
[vue-18n](https://github.com/intlify/vue-i18n-next).

### Webpack config

The plugin requires [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) among the webpack plugins.

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineI18nPlugin = require('html-webpack-inline-i18n-plugin')
  .default;
// or import HtmlWebpackInlineI18nPlugin from 'html-webpack-inline-i18n-plugin';

const htmlWebpackPlugin = new HtmlWebpackPlugin();
const inlineI18nPlugin = new HtmlWebpackInlineI18nPlugin();

module.exports = {
  ...
  plugins: [
    htmlWebpackPlugin, // creates index.html
    inlineI18nPlugin // inserts info on i18n files to index.html
  ],
};
```

### Webpack config with MiniI18nExtractPlugin

By default, the plugin works with the default format of assets
exported by [MiniI18nExtractPlugin](https://github.com/JuroOravec/mini-i18n-extract-plugin).

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniI18nExtractPlugin = require('mini-i18n-extract-plugin').default;
// or import MiniI18nExtractPlugin from 'mini-i18n-extract-plugin';
const HtmlWebpackInlineI18nPlugin = require('html-webpack-inline-i18n-plugin')
  .default;
// or import HtmlWebpackInlineI18nPlugin from 'html-webpack-inline-i18n-plugin';

const i18nExtractPlugin = new MiniI18nExtractPlugin();
const htmlWebpackPlugin = new HtmlWebpackPlugin();
const inlineI18nPlugin = new HtmlWebpackInlineI18nPlugin();

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.i18n\.json$/i,
        use: [i18nExtractPlugin.asLoader],
      },
    ],
  },
  plugins: [
    i18nExtractPlugin, // extracts i18n files
    htmlWebpackPlugin, // creates index.html
    inlineI18nPlugin // inserts info on i18n files to index.html
  ],
};
```

### Typing

This project is written in TypeScript and the typings are included in the distribution. Available types can be imported as:

```ts
import { types } from 'html-webpack-inline-i18n-plugin';
```

### Debugging

This project uses [debug](https://www.npmjs.com/package/debug). To show debug logs, activate debug for `html-webpack-inline-i18n-plugin`.

CLI example:

```sh
DEBUG=html-webpack-inline-i18n-plugin node path/to/my/html-webpack-inline-i18n-plugin-project
```

## 🤖 API

TypeDoc documentation can be [found here](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/master/docs/typedoc/README.md).

### Options

Options are passed to the plugin on instantiation.

```js
const MiniI18nExtractPlugin = require('mini-i18n-extract-plugin');

const i18nExtractPlugin = new MiniI18nExtractPlugin({
  // pass them configs here
  include: /\.i18n/iu,
  ...
});
```

The plugin accepts the following options:

#### include

- Type: `RegExp | string | (`[`PatternContext`](#PatternContext)`) => (RegExp | string)`
- RegExp pattern that specifies which assets should be recognized and made
  available as locales files.

  Can be either a RegExp, string regex, or a function that returns one of the
  former.

- Defaults to `/\.i18n/iu`.

#### exclude

- Type: `RegExp | string | (`[`PatternContext`](#PatternContext)`) => (RegExp | string)`
- RegExp pattern that specifies which assets should be excluded from the
  assets matched by [the include option](#include).

  Can be either a RegExp, string regex, or a function that returns one of the
  former.

- No default.

#### extractLocale

- Type: `RegExp | string | (`[`PatternContext`](#PatternContext)`) => (RegExp | string)`
- RegExp pattern that specifies which part of the asset name is the locale.

  The regex must have a match group. The locale has to be either the first
  match group, or a match group labeled `locale`.

  Can be either a RegExp, string regex, or a function that returns one of the
  former.

- Defaults to function defined at
  [src/lib/extract-locale](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/master/src/lib/extract-locale.ts).

#### modifyTag

- Type: `(`[`ModifyTagContext`](#ModifyTagContext)`) =>`
  [`HtmlTagObject`](https://github.com/jantimon/html-webpack-plugin/blob/07070c34560617c688eb73b0f90951711d59041b/typings.d.ts#L226)

- Function that is given (among other) the object representation of the
  to-be-generated HTML tag with i18n data, and returns the updated object.

  This function should be used if you need to modify either the properties,
  the tag type, or other aspects of the HTML tag.

- No default.

#### position

- Type: `'before' | 'after' | (`[`PositionContext`](#PositionContext)`) =>`
  [`HtmlTagObject[]`](https://github.com/jantimon/html-webpack-plugin/blob/07070c34560617c688eb73b0f90951711d59041b/typings.d.ts#L226)

- Specify the position where the i18n tag should be inserted into the HTML
  body.

- Can be one of:

  - `'before'` - insert the i18n tag before other HTML tags in body
  - `'after'` - insert the i18n tag after other HTML tags in body
  - `Function` - Function that is given (among other) the list of tags to be
    inserted into the HTML body, and returns the update list of tags. The order
    of the returned list decides the order in which the tags will be rendered
    in the HTML body.

- Defaults to `'before'`.

### Contexts

Options that can be functions are passed the data (context) that's available
at their invokation.

Here is the list of used contexts:

#### ModifyTagContext

The context object passed to [modifyTag](#modifyTag) function.

| Property     | Description                                                                                                                                                                                 | Type                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `i18nTag`    | [`HtmlTagObject`](https://github.com/jantimon/html-webpack-plugin/blob/07070c34560617c688eb73b0f90951711d59041b/typings.d.ts#L226) for the to-be-generated tag containing i18n information. | [`HtmlTagObject`](https://github.com/jantimon/html-webpack-plugin/blob/07070c34560617c688eb73b0f90951711d59041b/typings.d.ts#L226) |
| `assets`     | Object with assets data, as [defined by HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/tree/07070c34560617c688eb73b0f90951711d59041b#beforeassettaggeneration-hook)     | `object`                                                                                                                           |
| `outputName` | HTML file output name, as [defined by HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/tree/07070c34560617c688eb73b0f90951711d59041b#beforeassettaggeneration-hook)       | `string`                                                                                                                           |
| `plugin`     | HtmlWebpackPlugin instance, as [defined by HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/tree/07070c34560617c688eb73b0f90951711d59041b#beforeassettaggeneration-hook)  | [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin)                                                             |

#### PatternContext

The context object passed to functions that return RegExp patterns for filtering assets and extracting locale info from asset filenames.

| Property     | Description                                                                                                                                                                                | Type                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `filename`   | Name of the asset at hand.                                                                                                                                                                 | `string`                                                               |
| `chunk`      | [Webpack's Chunk](https://github.com/webpack/webpack/blob/master/lib/Chunk.js) that the asset at hand relates to.                                                                          | [`Chunk`](https://github.com/webpack/webpack/blob/master/lib/Chunk.js) |
| `assets`     | Object with assets data, as [defined by HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/tree/07070c34560617c688eb73b0f90951711d59041b#beforeassettaggeneration-hook)    | `object`                                                               |
| `outputName` | HTML file output name, as [defined by HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/tree/07070c34560617c688eb73b0f90951711d59041b#beforeassettaggeneration-hook)      | `string`                                                               |
| `plugin`     | HtmlWebpackPlugin instance, as [defined by HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/tree/07070c34560617c688eb73b0f90951711d59041b#beforeassettaggeneration-hook) | [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) |

#### PositionContext

The context object passed to the [position option](#position) if it is a function.

| Property     | Description                                                                                                                                                                                                                                                                                                                                       | Type                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `i18nTag`    | [`HtmlTagObject`](https://github.com/jantimon/html-webpack-plugin/blob/07070c34560617c688eb73b0f90951711d59041b/typings.d.ts#L226) for the to-be-generated tag containing i18n information.                                                                                                                                                       | [`HtmlTagObject`](https://github.com/jantimon/html-webpack-plugin/blob/07070c34560617c688eb73b0f90951711d59041b/typings.d.ts#L226)   |
| `headTags`   | List of [`HtmlTagObjects`](https://github.com/jantimon/html-webpack-plugin/blob/07070c34560617c688eb73b0f90951711d59041b/typings.d.ts#L226) that will be inserted as HTML tags to head, as [defined by HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/tree/07070c34560617c688eb73b0f90951711d59041b#alterassettaggroups-hook) | [`HtmlTagObject[]`](https://github.com/jantimon/html-webpack-plugin/blob/07070c34560617c688eb73b0f90951711d59041b/typings.d.ts#L226) |
| `bodyTags`   | List of [`HtmlTagObjects`](https://github.com/jantimon/html-webpack-plugin/blob/07070c34560617c688eb73b0f90951711d59041b/typings.d.ts#L226) that will be inserted as HTML tags to body, as [defined by HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/tree/07070c34560617c688eb73b0f90951711d59041b#alterassettaggroups-hook) | [`HtmlTagObject[]`](https://github.com/jantimon/html-webpack-plugin/blob/07070c34560617c688eb73b0f90951711d59041b/typings.d.ts#L226) |
| `outputName` | HTML file output name, as [defined by HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/tree/07070c34560617c688eb73b0f90951711d59041b#alterassettaggroups-hook)                                                                                                                                                                  | `string`                                                                                                                             |
| `plugin`     | HtmlWebpackPlugin instance, as [defined by HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/tree/07070c34560617c688eb73b0f90951711d59041b#alterassettaggroups-hook)                                                                                                                                                             | [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin)                                                               |

## ⏳ Changelog

This projects follows semantic versioning. The
[changelog can be found here](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/master/CHANGELOG.md).

## 🛠 Developing

If you want to contribute to the project or have forked it,
[this guide will get you up and going](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/master/docs/developing.md).

## 🏗 Roadmap

There is no explicit roadmap for this project. However, if you have ideas how it
could be improved, please be sure to share it with us by [opening an issue](#🤝-contributing).

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Thank you ❤️

Feel free to dive in! See [current issues](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/issues),
[open an issue](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/issues/new), or [submit PRs](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/compare).

How to report bugs, feature requests, and how to contribute and what conventions we use is all described in the [contributing guide](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/tree/master/docs/CONTRIBUTING.md).

When contributing we follow the
[Contributor Covenant](https://contributor-covenant.org/version/1/3/0/).
See our [Code of Conduct](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/master/docs/CODE_OF_CONDUCT.md).

## 🧙 Contributors

Contributions of any kind welcome. Thanks goes to these wonderful people ❤️

### Recent and Top Contributors

<!-- Hall of Fame uses 8 links (7 users + 1 stats), see https://github.com/sourcerer-io/hall-of-fame#faq -->

[![Hall of Fame Contributor 1](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/images/0)](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/links/0)
[![Hall of Fame Contributor 2](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/images/1)](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/links/1)
[![Hall of Fame Contributor 3](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/images/2)](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/links/2)
[![Hall of Fame Contributor 4](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/images/3)](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/links/3)
[![Hall of Fame Contributor 5](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/images/4)](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/links/4)
[![Hall of Fame Contributor 6](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/images/5)](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/links/5)
[![Hall of Fame Contributor 7](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/images/6)](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/links/6)
[![Hall of Fame Contributor 8](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/images/7)](https://sourcerer.io/fame/JuroOravec/JuroOravec/html-webpack-inline-i18n-plugin/links/7)

<!-- markdownlint-disable -->

<sub><em>Generated using [Hall of Fame](https://github.com/sourcerer-io/hall-of-fame#readme).</em></sub>

<!-- markdownlint-enable -->

### All Contributors

Contribution type [emoji legend](https://allcontributors.org/docs/en/emoji-key)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

_No additional contributors. Be the first one!_

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- markdownlint-disable -->

<sub><em>This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.</em></sub>

<!-- markdownlint-enable -->

## ⭐ Show your support

Give a ⭐️if this project helped you!

## 🐙 Community

- [Stack Overflow](https://stackoverflow.com/questions/tagged/html-webpack-inline-i18n-plugin)
- [Quora](https://www.quora.com/search?q=%22html-webpack-inline-i18n-plugin%22)
- [Spectrum community](https://spectrum.chat/html-webpack-inline-i18n-plugin)

## 🔗 Related Projects

- This plugin is meant to work with
  [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).
- It works out-of-the-box with [mini-i18n-extract-plugin](https://github.com/JuroOravec/mini-i18n-extract-plugin).

## 👨‍🔧 Maintainers

👤 **Juro Oravec**

- Twitter: [@JuroOravec](https://twitter.com/JuroOravec)
- GitHub: [@JuroOravec](https://github.com/JuroOravec)
- LinkedIn: [@jurooravec](https://linkedin.com/in/jurooravec)
- Sourcerer: [@JuroOravec](https://sourcerer.io/JuroOravec)

## 📝 License

Copyright © 2020 [Juro Oravec](https://github.com/JuroOravec).

This project is [MIT](https://tldrlegal.com/license/mit-license) licensed.
