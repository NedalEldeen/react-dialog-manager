var path = require('path');

module.exports = {
	watch: true,
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|dist)/,
				use: {
					loader: 'babel-loader'
				}
			}, {
				test: /\.s[ac]ss$/i,
				exclude: /(node_modules|dist)/,
				use : [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			 },
		]
	},
	externals: {
		'react': 'commonjs react' 
	}
};