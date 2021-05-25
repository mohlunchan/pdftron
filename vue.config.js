const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Pdftron-demo',
        },
    },
    publicPath: '/',
    configureWebpack: (config) => {
        //allow pdf loading
        config.module.rules.push(
            {
                test: /\.(pdf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        )

        //copy pdftron folder when building for production
        config.plugins.push(new CopyWebpackPlugin([{
            from: '@pdftron/webviewer/public',
            to: 'webviewer',
            toType: "dir",
            context: 'node_modules',
        }]))
    },
}