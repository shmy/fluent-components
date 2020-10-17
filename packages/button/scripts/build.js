const rollup = require('rollup');
const yargs = require('yargs');
const filesize = require('rollup-plugin-filesize');
const {terser} = require('rollup-plugin-terser');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const argv = yargs.argv;
const plugins = [
	replace({'Reflect.decorate': 'undefined'}),
	typescript({
		tsconfig: './tsconfig.json',
	}),
	postcss({
		minimize: true
	}),
	terser({
		module: false,
		warnings: false,
		output: {
			comments: false,
		},
		mangle: {
			properties: {
				regex: /^__/,
			},
		},
	}),
	filesize({
		showBrotliSize: true,
	}),
]
const inputOptions = {
	input: './src/index.ts',
	plugins,
	external: 'lit-element',
};
const format = argv.format;
if (format === 'iife') {
	plugins.unshift(resolve());
	delete inputOptions.external;
}
const getOutputName = format => {
	if (format === 'esm') {
		format = '';
	} else {
		format = `.${format}`;
	}
	return `index${format}.js`;
}
;(async () => {
	const bundle = await rollup.rollup(inputOptions);
	await bundle.write({
		sourcemap: false,
		format,
		entryFileNames: getOutputName(format),
		dir: './dist',
		exports: 'default'
	});
})();
