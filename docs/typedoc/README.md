[html-webpack-inline-i18n-plugin](README.md)

# html-webpack-inline-i18n-plugin

## Index

### Classes

* [HtmlWebpackInlineI18nPlugin](classes/htmlwebpackinlinei18nplugin.md)

### Interfaces

* [ConstructorOptions](interfaces/constructoroptions.md)
* [ConstructorTypeArgs](interfaces/constructortypeargs.md)

### Type aliases

* [Default](README.md#default)
* [HookArgs](README.md#hookargs)
* [HtmlWebpackPluginHookKeys](README.md#htmlwebpackpluginhookkeys)
* [ModifyTagContext](README.md#modifytagcontext)
* [ModifyTagFunction](README.md#modifytagfunction)
* [Pattern](README.md#pattern)
* [PatternContext](README.md#patterncontext)
* [PatternFunction](README.md#patternfunction)
* [Position](README.md#position)
* [PositionContext](README.md#positioncontext)
* [PositionFunction](README.md#positionfunction)

### Variables

* [debug](README.md#const-debug)
* [pluginName](README.md#const-pluginname)

### Functions

* [extractLocale](README.md#const-extractlocale)
* [getDebugLogger](README.md#getdebuglogger)
* [resolvePattern](README.md#const-resolvepattern)

## Type aliases

###  Default

Ƭ **Default**: *T1 extends T2 ? T1 : T2*

*Defined in [types.ts:4](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L4)*

___

###  HookArgs

Ƭ **HookArgs**: *NonNullable‹Parameters<Hooks[K]["call"]>[0]›*

*Defined in [types.ts:8](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L8)*

___

###  HtmlWebpackPluginHookKeys

Ƭ **HtmlWebpackPluginHookKeys**: *keyof Hooks*

*Defined in [types.ts:6](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L6)*

___

###  ModifyTagContext

Ƭ **ModifyTagContext**: *CTX & object*

*Defined in [types.ts:43](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L43)*

___

###  ModifyTagFunction

Ƭ **ModifyTagFunction**: *function*

*Defined in [types.ts:49](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L49)*

#### Type declaration:

▸ (`ctx`: CTX): *CTX["i18nTag"]*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | CTX |

___

###  Pattern

Ƭ **Pattern**: *string | RegExp | [PatternFunction](README.md#patternfunction)‹CTX›*

*Defined in [types.ts:23](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L23)*

___

###  PatternContext

Ƭ **PatternContext**: *CTX & object*

*Defined in [types.ts:12](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L12)*

___

###  PatternFunction

Ƭ **PatternFunction**: *function*

*Defined in [types.ts:19](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L19)*

#### Type declaration:

▸ (`ctx`: [PatternContext](README.md#patterncontext)‹CTX›): *RegExp | string*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [PatternContext](README.md#patterncontext)‹CTX› |

___

###  Position

Ƭ **Position**: *"before" | "after" | [PositionFunction](README.md#positionfunction)‹CTX›*

*Defined in [types.ts:38](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L38)*

___

###  PositionContext

Ƭ **PositionContext**: *CTX & object*

*Defined in [types.ts:28](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L28)*

___

###  PositionFunction

Ƭ **PositionFunction**: *function*

*Defined in [types.ts:34](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/types.ts#L34)*

#### Type declaration:

▸ (`ctx`: CTX): *HtmlTagObject[]*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | CTX |

## Variables

### `Const` debug

• **debug**: *log* = getDebugLogger()

*Defined in [lib/debug.ts:16](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/lib/debug.ts#L16)*

___

### `Const` pluginName

• **pluginName**: *"HtmlWebpackInlineI18nPlugin"* = "HtmlWebpackInlineI18nPlugin"

*Defined in [index.ts:11](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/index.ts#L11)*

## Functions

### `Const` extractLocale

▸ **extractLocale**<**CTX**>(`__namedParameters`: object): *RegExp‹›*

*Defined in [lib/extract-locale.ts:6](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/lib/extract-locale.ts#L6)*

Default implementation of extracting locale type from filename

**Type parameters:**

▪ **CTX**: *[PatternContext](README.md#patterncontext)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`chunk` | Chunk‹› |

**Returns:** *RegExp‹›*

___

###  getDebugLogger

▸ **getDebugLogger**(): *log*

*Defined in [lib/debug.ts:4](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/lib/debug.ts#L4)*

**Returns:** *log*

___

### `Const` resolvePattern

▸ **resolvePattern**<**T**>(`name`: string, `pattern`: [Pattern](README.md#pattern), `ctx`: T): *string | RegExp‹›*

*Defined in [lib/resolve-pattern.ts:7](https://github.com/JuroOravec/html-webpack-inline-i18n-plugin/blob/ff683cc/src/lib/resolve-pattern.ts#L7)*

Default implementation of extracting locale type from filename

**Type parameters:**

▪ **T**: *[PatternContext](README.md#patterncontext)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`pattern` | [Pattern](README.md#pattern) |
`ctx` | T |

**Returns:** *string | RegExp‹›*
