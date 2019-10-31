module.exports = {
	verbose: true,
	"setupFilesAfterEnv": [
		"<rootDir>enzyme.jest.config.js"
	],
	"moduleNameMapper": {
		"\\.(css|scss|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
};