import type { StorybookConfig } from '@storybook/angular';
import webpack from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (config) => {
    config.plugins = config.plugins?.filter((plugin) => {
      if (plugin instanceof webpack.DefinePlugin) {
        const defs = (plugin as any).definitions;
        return !('process.env.NODE_ENV' in defs);
      }
      return true;
    });
    return config;
  },
};

export default config;
