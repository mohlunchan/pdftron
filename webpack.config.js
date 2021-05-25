module.exports = {
    module: {
        rules: [
            {
                test: /\.(pdf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
};