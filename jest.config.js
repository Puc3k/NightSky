module.exports = {
	transform: {
		'^.+\\.(js|jsx)?$': 'babel-jest',
	},
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	transformIgnorePatterns: ['node_modules/(?!(modern-module)/)'],
	testEnvironment: 'jsdom',
	
};
