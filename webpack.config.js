const webpack = require('webpack')
const path = require('path')
const config = require('sapper/config/webpack.js')
const pkg = require('./package.json')
const { parsed: dotenv } = require('dotenv').config()
const { preprocess } = require('./svelte.config')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const alias = {
    svelte: path.resolve('node_modules', 'svelte'),
    '~': path.resolve('src')
}
const extensions = ['.mjs', '.ts', '.js', '.svelte']
const mainFields = ['svelte', 'module', 'browser', 'main']

module.exports = {
    client: {
        entry: config.client.entry(),
        output: config.client.output(),
        resolve: { alias, extensions, mainFields },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(svelte|html)$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            preprocess,
                            dev,
                            hydratable: true,
                            hotReload: dev
                        }
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [require('tailwindcss'), require('autoprefixer')]
                            }
                        }
                    ]
                }
            ]
        },
        mode,
        plugins: [
            new webpack.DefinePlugin({
                'process.browser': true,
                'process.env': dotenv ? JSON.stringify(dotenv) : JSON.stringify(process.env),
                'process.env.NODE_ENV': JSON.stringify(mode)
            })
        ],
        devtool: dev && 'inline-source-map'
    },

    server: {
        entry: config.server.entry(),
        output: config.server.output(),
        target: 'node',
        resolve: { alias, extensions, mainFields },
        externals: Object.keys(pkg.dependencies).concat('encoding'),
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(svelte|html)$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            preprocess,
                            css: false,
                            generate: 'ssr',
                            dev
                        }
                    }
                }
            ]
        },
        mode: process.env.NODE_ENV,
        performance: {
            hints: false // it doesn't matter if server.js is large
        }
    },

    serviceworker: {
        entry: config.serviceworker.entry(),
        output: config.serviceworker.output(),
        mode: process.env.NODE_ENV
    }
}
