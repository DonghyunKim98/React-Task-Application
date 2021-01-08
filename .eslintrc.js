// .eslintrc.js
module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "react"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/eslint-recommended", "naver"],
	rules: {
		"linebreak-style": "off",
		"max-len": "off",
		"no-alert": "off",
		"no-use-before-define": "off",
		"no-mixed-spaces-and-tabs": "off",
	},
};
