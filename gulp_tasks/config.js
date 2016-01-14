const basepath = '../theme-out';

export default {
  paths: {
    src: 'theme/**/*.{json,php,png,jpg,twig}',
    dest: basepath,
    clean: [
      basepath + '/**/*.{css,json,php,png,twig}',
      '!' + basepath + '/assets/**/*',
    ],
    watch: 'theme/**/*.{json,php,png,jpg,twig}',
    assets: {
      src: 'assets',
      dest: basepath + '/assets',
    },
  },
};
