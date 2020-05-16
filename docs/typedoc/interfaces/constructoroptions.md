[html-webpack-inline-i18n-plugin](../README.md) › [ConstructorOptions](constructoroptions.md)

# Interface: ConstructorOptions <**T**>

Options passed on instantiation.

## Type parameters

▪ **T**: *[ConstructorTypeArgs](constructortypeargs.md)*

## Hierarchy

* **ConstructorOptions**

## Index

### Properties

* [exclude](constructoroptions.md#optional-exclude)
* [extractLocale](constructoroptions.md#optional-extractlocale)
* [include](constructoroptions.md#optional-include)
* [modifyTag](constructoroptions.md#optional-modifytag)
* [position](constructoroptions.md#optional-position)

## Properties

### `Optional` exclude

• **exclude**? : *[Pattern](../README.md#pattern)‹[Default](../README.md#default)‹T["patternContext"], [PatternContext](../README.md#patterncontext)››*

*Defined in [types.ts:89](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L89)*

RegExp pattern that specifies which assets should be excluded from the
matched assets and NOT made available.

Only the assets that matched the `include` pattern are subjected to this
test.

Can be one of:
- `RegExp` - the RegExp pattern
- `string` - string that will be interpreted as a RegExp pattern
- `(ctx: object) => RegExp | string` - Function that returns one of the
  former.

___

### `Optional` extractLocale

• **extractLocale**? : *[Pattern](../README.md#pattern)‹[Default](../README.md#default)‹T["patternContext"], [PatternContext](../README.md#patterncontext)››*

*Defined in [types.ts:102](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L102)*

RegExp pattern that specifies which part of the asset name is the locale.

The regex must have a match group. The locale has to be either the first
match group, or a match group labeled `locale`.

Can be one of:
- `RegExp` - the RegExp pattern
- `string` - string that will be interpreted as a RegExp pattern
- `(ctx: object) => RegExp | string` - Function that returns one of the
  former.

___

### `Optional` include

• **include**? : *[Pattern](../README.md#pattern)‹[Default](../README.md#default)‹T["patternContext"], [PatternContext](../README.md#patterncontext)››*

*Defined in [types.ts:75](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L75)*

RegExp pattern that specifies which assets should be recognized and made
available.

Can be one of:
- `RegExp` - the RegExp pattern
- `string` - string that will be interpreted as a RegExp pattern
- `(ctx: object) => RegExp | string` - Function that returns one of the
  former.

___

### `Optional` modifyTag

• **modifyTag**? : *[ModifyTagFunction](../README.md#modifytagfunction)‹[Default](../README.md#default)‹T["modifyTagContext"], [ModifyTagContext](../README.md#modifytagcontext)››*

*Defined in [types.ts:110](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L110)*

Function that is given (among other) the object representation of the
to-be-generated HTML tag with i18n data, and returns the updated object.

This function should be used if you need to modify either the properties,
the tag type, or other aspects of the HTML tag.

___

### `Optional` position

• **position**? : *[Position](../README.md#position)‹[Default](../README.md#default)‹T["positionContext"], [PositionContext](../README.md#positioncontext)››*

*Defined in [types.ts:125](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L125)*

Specify the position where the i18n tag should be inserted into the HTML
body.

Can be one of:
- `'before'` - insert the i18n tag before other HTML tags in body
- `'after'` - insert the i18n tag after other HTML tags in body
- `(ctx: object) => HtmlWebpackPlugin.HtmlTagObject[]` - Function that is
  given (among other) the list of tags to be inserted into the HTML body,
  and returns the update list of tags. The order of the returned list
  decides the order in which the tags will be rendered in the HTML body.
