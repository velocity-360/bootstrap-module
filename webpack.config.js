var webpack = require('webpack')
var path = require('path')

module.exports = {

	entry: {
		app: './src/index.js'
	},
	output: {
		filename: 'dist/bundle.js',
		sourceMapFilename: 'dist/bundle.map'
	},
	devtool: '#source-map',
	plugins: process.env.NODE_ENV === 'production' ? [
	    new webpack.DefinePlugin({
	        'process.env': {
	        	'NODE_ENV': JSON.stringify('production')
	        }
	    }),
    	new webpack.optimize.UglifyJsPlugin({
    		minimize: true,
		    compress: {
		        warnings: true
		    }
    	})
	] : [],
	module: { 
		loaders: [
			// https://medium.com/@victorleungtw/how-to-use-webpack-with-react-and-bootstrap-b94d33765970#.s0vxa8kbi
			//https://github.com/webpack-contrib/file-loader/issues/32
			{
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{ 
				test: /\.css$/, 
				loader: "style-loader!css-loader"
			},
			{ 
				test: /\.png$/, 
				loader: "url-loader?limit=100000" 
			},
			{ 
				test: /\.jpg$/, 
				loader: "file-loader" 
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
				loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./dist/assets/[hash].[ext]'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
				loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=./dist/assets/[hash].[ext]'
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
				loader: 'file-loader?&name=./dist/assets/[hash].[ext]'
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=./dist/assets/[hash].[ext]'
			}			
		]
	}

}