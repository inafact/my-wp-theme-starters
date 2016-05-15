export default {
	/*
	 * working with webpack resources
	 */
	assets: {
		entryPoints: {
			main: './assets/scripts/entrypoint',
      site: './assets/styles/site.scss',
		},
		src: 'assets/**',
		dest: 'assets',
		resources: '*.{js,jsx,scss,css,json,png,jpg}',
	},

	/*
	 * other wordpress theme resources
	 */
	theme: {
		name: 'test-theme',
		resources: '*.{php,twig,png,jpg,css,js,svg,ttf,eot,woff,woff2}',
	},

	/*
	 * if you use container-based environment(like vagrant, etc),
	 * need to some extra settings: replace paths for PHP, proxy hostname, etc.
	 */
	proxy: {
		origin: '/Users/inafact/Desktop/vccw.yushinada',
		replaced: '/var',
		hostname: 'no-2.dev',
	},
};
