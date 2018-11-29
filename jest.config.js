module.exports = {
    globals: {
        "babel-jest": {
            useBabelrc: true
        },
        DEV: true,
        PROD: true
    },
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.(css|scss|less)$": "<rootDir>/config/jest/css.transform.js",
        "^.+\\.(png|jpg|svg|jpeg)$": "<rootDir>/config/jest/file.transform.js"
    },
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: true,
    moduleDirectories: [
        "node_modules",
        "common",
        "i18n",
        "services",
        "store",
        "assets"
    ],
    moduleNameMapper: {
        "^assets(.*)": "<rootDir>/src/assets/$1",
        "^common(.*)": "<rootDir>/src/common/$1",
        "^i18n(.*)": "<rootDir>/src/i18n/$1",
        "^services(.*)": "<rootDir>/src/services/$1",
        "^store(.*)": "<rootDir>/src/store/$1"
    },
    setupFiles: ["<rootDir>/config/jest/browser.mock.js"],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/"
    ],
    testURL: "http://localhost/"
};
