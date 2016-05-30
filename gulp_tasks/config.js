export default {
	/*
	 * wordpress theme infomations & resources
	 */
	theme: {
		name: 'theme name',
		// uri: ,
		author: 'author name',
		// authorURI: ,
		// description: ,
		version: '0.0',
		// license:' GNU General Public License v2 or later',
		// licenseURI: 'http://www.gnu.org/licenses/gpl-2.0.html',
		// tags: ,
		// textDomain: ,
		resources: '*.{php,twig,png,gif,jpg,css,js,svg,ttf,eot,woff,woff2}',
	},

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
		resources: '*.{js,jsx,scss,css,json,png,jpg,gif}',
	},

	/*
	 * if you use container-based environment(like vagrant, etc),
	 * need to some extra settings: replace paths for PHP, proxy hostname, etc.
	 */
	proxy: {
		origin: '/host/machine/directory',
		replaced: '/container/directory',
		hostname: 'hostname',
	},
};
