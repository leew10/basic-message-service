import baseConfig from "./jest.config.base";
import { Config } from "@jest/types";

const config : Config.InitialOptionsWithRootDir = {
    ...baseConfig,
    roots: ["<rootDir>/test/unit"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
    coverageThreshold: {
        global: {
            branches: 80,
            function: 80,
            lines: 80,
            statements: -10
        }
    }
}

export default config;