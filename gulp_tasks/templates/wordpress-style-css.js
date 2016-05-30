import _ from 'lodash';
import Config from '../config';

const tconf = Config.theme;

export default {
	develop: `
/*
Theme Name: ${_.has(tconf, 'name') ? tconf.name : ''}-dev
Theme URI:
Author:
Author URI:
Description:
Version: develop
License:
License URI:
Tags:
Text Domain:
*/`,
	production: `
/*
Theme Name: ${_.has(tconf, 'name') ? tconf.name : ''}
Theme URI: ${_.has(tconf, 'uri') ? tconf.uri : ''}
Author: ${_.has(tconf, 'author') ? tconf.author : ''}
Author URI: ${_.has(tconf, 'authorURI') ? tconf.authorURI : ''}
Description: ${_.has(tconf, 'description') ? tconf.description : ''}
Version: ${_.has(tconf, 'version') ? tconf.version : ''}
License: ${_.has(tconf, 'license') ? tconf.license : ''}
License URI: ${_.has(tconf, 'licenseURI') ? tconf.licenseURI : ''}
Tags: ${_.has(tconf, 'tags') ? tconf.tags : ''}
Text Domain: ${_.has(tconf, 'textDomain') ? tconf.textDomain : ''}

This theme, like WordPress, is licensed under the GPL.
Use it to make something cool, have fun, and share what you've learned with others.
*/`,
};
