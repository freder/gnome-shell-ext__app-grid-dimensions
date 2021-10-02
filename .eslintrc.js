module.exports = {
	'env': {
		'es2021': true,
		'commonjs': true,
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12
	},
	globals: {
		imports: true,
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
