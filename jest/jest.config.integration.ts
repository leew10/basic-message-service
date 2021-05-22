import baseConfig from "./jest.config.base";
import { Config } from "@jest/types";

const config : Config.InitialOptionsWithRootDir = {
    ...baseConfig,
    roots: ["<rootDir>/test/integration"],
    globals: {
        ...baseConfig.globals,
        basePath: "http://localhost:3000"
    }
}

export default config;