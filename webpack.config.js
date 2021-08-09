const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        'path': path.resolve(__dirname, 'build'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build'
    },
    module:{
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }

}