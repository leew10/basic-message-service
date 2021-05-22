import { Config } from "@jest/types";

const config : Config.InitialOptionsWithRootDir = {
    testEnvironment: "node",
    rootDir: "..",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    globals: {
        "ts-jest": {
            tsconfig: "test/tsconfig.json"
        }
    }
}

export default config;