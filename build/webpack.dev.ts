import { commonConfig } from './webpack.common';
import { merge } from 'webpack-merge';

const devConfig = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  devServer: {
    contentBase: './dist',
    open: false,
    port: 8000,
  },
});

export default devConfig;
