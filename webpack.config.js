const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devServer: {
		historyApiFallback: true,
		contentBase: __dirname,
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env','@babel/react']
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					{loader: 'style-loader'},// inject CSS to page
					{loader: 'css-loader'}, // translates CSS into CommonJS modules
					{loader: 'postcss-loader', // Run post css actions
						options: {
							plugins: function () { // post css plugins, can be exported to postcss.config.js
								return [
									require('precss'),
									require('autoprefixer')
								];
							}
						}
					}, {
						loader: "sass-loader",
						options: {
							includePaths: ['./src/styles/main.scss']
						}
					}]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							disable: true, // webpack@2.x and newer
						},
					},
				],
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({template: './src/index.html'}),
	]
};
