import type { Compiler, compilation } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import type { ConstructorOptions, Pattern } from './types';
import debug from './lib/debug';
import defaultExtractLocale from './lib/extract-locale';
import resolvePattern from './lib/resolve-pattern';

export * as types from './types';

const pluginName = 'HtmlWebpackInlineI18nPlugin';

export default class HtmlWebpackInlineI18nPlugin {
  constructor(public options: ConstructorOptions = {}) {
    this.options.include = options.include ?? /\.i18n/iu;
    this.options.position = options.position ?? 'before';
    this.options.extractLocale = options.extractLocale ?? defaultExtractLocale;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      debug('Started apply.compiler.compilation');

      let i18nAssetTag: HtmlWebpackPlugin.HtmlTagObject = {
        tagName: 'div',
        voidTag: false,
        attributes: { id: 'i18n' },
      };

      const {
        beforeAssetTagGeneration,
        alterAssetTagGroups,
      } = HtmlWebpackPlugin.getHooks(compilation);

      beforeAssetTagGeneration.tapPromise(pluginName, async (data) => {
        debug('Started hook "beforeAssetTagGeneration"');

        const { include, exclude, modifyTag, extractLocale } = this.options;
        const i18nEntryGroups = (compilation.chunks as compilation.Chunk[]).map(
          (chunk) =>
            chunk.files
              .filter((filename) => {
                const ctx = { ...data, chunk, filename };
                const [inclPattern, exclPattern] = ([
                  ['include', include],
                  ['exclude', exclude],
                ] as [string, Pattern | undefined][]).map(
                  ([name, pattern]) =>
                    pattern && resolvePattern(name, pattern, ctx),
                );
                return (
                  (inclPattern ? filename.match(inclPattern) : true) &&
                  (exclPattern ? !filename.match(exclPattern) : true)
                );
              })
              .map((filename) => {
                const ctx = { ...data, chunk, filename };
                const pattern = resolvePattern(
                  'extractLocale',
                  extractLocale!,
                  ctx,
                );
                const match = filename.match(pattern);
                // If we did not split i18n data by locales, store the file under
                // 'default' key
                const locale = match
                  ? match.groups
                    ? match.groups.locale
                    : match[1]
                  : 'default';
                return [`data-${locale}`, filename];
              }),
        );
        const i18n = Object.fromEntries(
          i18nEntryGroups.flat().sort(([a], [b]) => a.localeCompare(b)),
        );
        Object.assign(i18nAssetTag.attributes, i18n);

        if (modifyTag) {
          debug('Started function "modifyTag"');
          i18nAssetTag = await modifyTag({
            ...data,
            i18nTag: i18nAssetTag,
          });
          debug('Done function "modifyTag"');
        }

        debug('Done hook "beforeAssetTagGeneration"');
        return data;
      });

      alterAssetTagGroups.tapPromise(pluginName, async (data) => {
        debug('Started hook "alterAssetTagGroups"');

        const { position } = this.options;
        const { bodyTags = [] } = data;
        data.bodyTags =
          typeof position === 'function'
            ? position({ ...data, i18nTag: i18nAssetTag })
            : position === 'before'
            ? [i18nAssetTag, ...bodyTags]
            : [...bodyTags, i18nAssetTag];

        debug('Done hook "alterAssetTagGroups"');
        return data;
      });

      debug('Done apply.compiler.compilation');
    });
  }
}
