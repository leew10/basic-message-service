import { Configuration } from "webpack";

const config : Configuration = {
    mode: "development",
    target: "node",
    optimization: {
        moduleIds: "named",
    },
    entry: {
        lambda: "./src/index.ts"
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.(ts)$/,
            loader: "ts-loader"
        }]
    },
    output: {
        libraryTarget: "commonjs",
        filename: 'api/[name].js'
    }
}

export default config;