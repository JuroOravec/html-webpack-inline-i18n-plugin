import type { compilation } from 'webpack';
import type HtmlWebpackPlugin from 'html-webpack-plugin';

type Default<T1, T2> = T1 extends T2 ? T1 : T2;

export type HtmlWebpackPluginHookKeys = keyof HtmlWebpackPlugin.Hooks;

export type HookArgs<K extends HtmlWebpackPluginHookKeys> = NonNullable<
  Parameters<HtmlWebpackPlugin.Hooks[K]['call']>[0]
>;

export type PatternContext<
  CTX extends object = HookArgs<'beforeAssetTagGeneration'>
> = CTX & {
  chunk: compilation.Chunk;
  filename: string;
};

export type PatternFunction<CTX extends PatternContext = PatternContext> = (
  ctx: PatternContext<CTX>,
) => RegExp | string;

export type Pattern<CTX extends PatternContext = PatternContext> =
  | string
  | RegExp
  | PatternFunction<CTX>;

export type PositionContext<
  CTX extends object = HookArgs<'alterAssetTagGroups'>
> = CTX & {
  i18nTag: HtmlWebpackPlugin.HtmlTagObject;
};

export type PositionFunction<CTX extends PositionContext = PositionContext> = (
  ctx: CTX,
) => HtmlWebpackPlugin.HtmlTagObject[];

export type Position<CTX extends PositionContext = PositionContext> =
  | 'before'
  | 'after'
  | PositionFunction<CTX>;

export type ModifyTagContext<
  CTX extends object = HookArgs<'beforeAssetTagGeneration'>
> = CTX & {
  i18nTag: HtmlWebpackPlugin.HtmlTagObject;
};

export type ModifyTagFunction<
  CTX extends ModifyTagContext = ModifyTagContext
> = (ctx: CTX) => CTX['i18nTag'];

export interface ConstructorTypeArgs {
  patternContext?: PatternContext;
  modifyTagContext?: ModifyTagContext;
  positionContext?: PositionContext;
}

/**
 * Options passed on instantiation.
 */
export interface ConstructorOptions<
  T extends ConstructorTypeArgs = ConstructorTypeArgs
> {
  /**
   * RegExp pattern that specifies which assets should be recognized and made
   * available.
   *
   * Can be one of:
   * - `RegExp` - the RegExp pattern
   * - `string` - string that will be interpreted as a RegExp pattern
   * - `(ctx: object) => RegExp | string` - Function that returns one of the
   *   former.
   */
  include?: Pattern<Default<T['patternContext'], PatternContext>>;
  /**
   * RegExp pattern that specifies which assets should be excluded from the
   * matched assets and NOT made available.
   *
   * Only the assets that matched the `include` pattern are subjected to this
   * test.
   *
   * Can be one of:
   * - `RegExp` - the RegExp pattern
   * - `string` - string that will be interpreted as a RegExp pattern
   * - `(ctx: object) => RegExp | string` - Function that returns one of the
   *   former.
   */
  exclude?: Pattern<Default<T['patternContext'], PatternContext>>;
  /**
   * RegExp pattern that specifies which part of the asset name is the locale.
   *
   * The regex must have a match group. The locale has to be either the first
   * match group, or a match group labeled `locale`.
   *
   * Can be one of:
   * - `RegExp` - the RegExp pattern
   * - `string` - string that will be interpreted as a RegExp pattern
   * - `(ctx: object) => RegExp | string` - Function that returns one of the
   *   former.
   */
  extractLocale?: Pattern<Default<T['patternContext'], PatternContext>>;
  /**
   * Function that is given (among other) the object representation of the
   * to-be-generated HTML tag with i18n data, and returns the updated object.
   *
   * This function should be used if you need to modify either the properties,
   * the tag type, or other aspects of the HTML tag.
   */
  modifyTag?: ModifyTagFunction<
    Default<T['modifyTagContext'], ModifyTagContext>
  >;
  /**
   * Specify the position where the i18n tag should be inserted into the HTML
   * body.
   *
   * Can be one of:
   * - `'before'` - insert the i18n tag before other HTML tags in body
   * - `'after'` - insert the i18n tag after other HTML tags in body
   * - `(ctx: object) => HtmlWebpackPlugin.HtmlTagObject[]` - Function that is
   *   given (among other) the list of tags to be inserted into the HTML body,
   *   and returns the update list of tags. The order of the returned list
   *   decides the order in which the tags will be rendered in the HTML body.
   */
  position?: Position<Default<T['positionContext'], PositionContext>>;
}
