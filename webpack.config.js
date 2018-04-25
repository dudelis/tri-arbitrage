const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

const BUILD_DIR = path.resolve(__dirname, 'public');
const SRC_DIR = path.resolve(__dirname, 'client');


module.exports = {
    entry: {
        index: [SRC_DIR + '/index.js']
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].bundle.js'
    },
    module:{
        rules:[{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },{
            loader: 'babel-loader',
            test: /\.jsx$/,
            exclude: /node_modules/
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.(scss)$/,
            use: ['css-hot-loader'].concat(extractSCSS.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            alias: {'../img': '../public/img'},
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }))
        },
        {
            test: /\.css$/,
            use: extractCSS.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        },            
        {
            test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
            use: [
                {
                // loader: 'url-loader'
                loader: 'file-loader',
                options: {
                    name: './img/[name].[hash].[ext]'
                }
                }
            ]
        },{
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: './fonts/[name].[hash].[ext]'
            }
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        extractCSS,
        extractSCSS,
        new HtmlWebpackPlugin(
            {
                inject: true,
                template: './client/public/index.html'
            }
        ),
        new CopyWebpackPlugin([
            {from: './client/public/img', to: 'img'}
            ],
            {copyUnmodified: false}
        )
    ],      
}


