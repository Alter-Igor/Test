
import * as mix from 'laravel-mix';

class Clean implements mix.MixHandler {
  requiresReload?: boolean;
  options: any;

  dependencies(): string[] {
    this.requiresReload = true;
    return ['clean-webpack-plugin'];
  }

  register(options: any = {}): void {
    this.options = options;
  }

  webpackPlugins(): any {
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    return new CleanWebpackPlugin(this.options);
  }
}

mix.extend('clean', new Clean());