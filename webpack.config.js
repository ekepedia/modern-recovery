const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    context: path.join(__dirname, ''),
    entry: './app/script.js',
    output: {
        filename: 'script.min.js',
        path: path.resolve(__dirname, 'app/public/js')
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/react'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']

                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins: [
        new LiveReloadPlugin()
    ]
};