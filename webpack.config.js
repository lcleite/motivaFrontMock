module.exports = {
    devtool: 'source-map',
    entry: './src/main.ts',
    output: {
        filename: './out/build.js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
};
