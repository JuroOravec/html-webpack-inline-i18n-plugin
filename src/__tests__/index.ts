import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import MiniI18nExtractPlugin, {
  types as i18nExtractTypes,
} from 'mini-i18n-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import HtmlWebpackInlineI18nPlugin from '..';

import {
  runWebpack,
  config as defaultConfig,
} from '../../test/fixtures/webpack';
import { prepare, restore, reset } from '../../test/lib/fs';
import * as content from '../../test/lib/content';

function prepConfig(plugin?: any, loader?: object) {
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './index.ejs',
  });
  const i18nExtractPlugin = new MiniI18nExtractPlugin();

  const config: webpack.Configuration = {
    module: {
      rules: [{ test: /\.json$/u, use: [i18nExtractPlugin.asLoader] }],
    },
    plugins: [i18nExtractPlugin, htmlWebpackPlugin],
  };

  if (plugin) {
    config.plugins = [...(config.plugins || []), plugin];
  }
  if (loader) {
    const loaders = (config.module?.rules[0]?.use || []) as any[];
    config.module!.rules[0].use = [loader, ...loaders];
  }
  return config;
}

function getOutputFile(file: string) {
  return path.resolve(defaultConfig.output!.path!, file);
}

function getExpectedFile(file: string) {
  return require.resolve(path.join('../../test/fixtures/webpack', file));
}

describe('HtmlWebpackInlineI18nPlugin', () => {
  const localesTestParam = [
    ['split locales', ['en', 'de']],
    ['merged locales', null],
  ] as [string, string[] | null][];

  let createdDirRoot: string;

  beforeAll(async () => {
    const { tempDirRoot } = await prepare();
    createdDirRoot = tempDirRoot;
    createdDirRoot + createdDirRoot;
  });

  afterAll(async () => {
    await restore(createdDirRoot);
  });

  describe('setup', () => {
    test('[meta] setup works', () => {
      expect(true).toBe(true);
    });

    test('[meta] class HtmlWebpackInlineI18nPlugin initializes', () => {
      const plugin = new HtmlWebpackInlineI18nPlugin();
      expect(plugin).toBeTruthy();
    });
  });

  describe('setup - webpack', () => {
    beforeEach(async () => {
      await reset();
    });

    test('[meta] webpack works with js entrypoint', async () => {
      const config = { entry: './entry-null.js' };
      const { stats, each } = await runWebpack(config);
      expect(stats).toBeTruthy();
      await each.runInBrowser();
      // Uncomment to verify that the call indeed doesn't throw Error
      // await each.runInBrowser({ waitForError: true });
    });

    test.each(localesTestParam)(
      '[meta] webpack emits i18n files (%s)',
      async (comment, locales) => {
        const config = prepConfig();
        const i18nExtractPlugin = config.plugins!.find(
          (plgn) => plgn instanceof MiniI18nExtractPlugin,
        ) as i18nExtractTypes.MiniI18nExtractPlugin;
        i18nExtractPlugin.options.splitLocales = Boolean(locales);

        await runWebpack(config);

        const i18nFiles = (locales || ([null] as any[])).map((locale) => {
          const localeExt = locale ? `.${locale}` : '';
          const outputPath = defaultConfig.output!.path!;
          return path.resolve(outputPath, `main${localeExt}.i18n.json`);
        });
        for (const file of i18nFiles) {
          expect(fs.existsSync(file)).toBe(true);
        }
      },
    );

    test('[meta] html is as expected without HtmlWebpackInlineI18nPlugin', async () => {
      const config = {
        ...prepConfig(),
        entry: './entry.js',
      };

      await runWebpack(config);

      const outputPath = getOutputFile('index.html');
      const expectedPath = getExpectedFile('index-null-expected.html');
      await content.validate(outputPath, expectedPath);
    });
  });

  describe('output', () => {
    beforeEach(async () => {
      await reset();
    });

    test('tag with no dataset is inserted if no i18n files exist (%s)', async () => {
      const config = {
        ...prepConfig(),
        entry: './entry-null.js',
      };
      config.plugins!.push(new HtmlWebpackInlineI18nPlugin());

      await runWebpack(config);

      const outputPath = getOutputFile('index.html');
      const expectedPath = getExpectedFile('index-empty-expected.html');
      await content.validate(outputPath, expectedPath);
    });

    test.each(localesTestParam)(
      'tag with dataset with i18n files is inserted if i18n files exist (%s)',
      async (comment, locales) => {
        const config = {
          ...prepConfig(),
          entry: './entry.js',
        };
        config.plugins!.push(new HtmlWebpackInlineI18nPlugin());
        const i18nExtractPlugin = config.plugins!.find(
          (plgn) => plgn instanceof MiniI18nExtractPlugin,
        ) as i18nExtractTypes.MiniI18nExtractPlugin;
        i18nExtractPlugin.options.splitLocales = Boolean(locales);

        await runWebpack(config);

        const outputPath = getOutputFile('index.html');
        const expectedPath = getExpectedFile(
          `index-${locales ? 'split' : 'merged'}-expected.html`,
        );
        await content.validate(outputPath, expectedPath);
      },
    );
  });
});
