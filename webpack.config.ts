import { Configuration } from "webpack";

const config : Configuration = {
    mode: "development",
    target: "node",
    optimization: {
        moduleIds: "named",
    },
    entry: {
        hello: "./src/lambda/handlers/helloWorld.ts",
        retrieve: "./src/lambda/handlers/retrieveMessages.ts",
        send: "./src/lambda/handlers/sendMessage.ts"
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