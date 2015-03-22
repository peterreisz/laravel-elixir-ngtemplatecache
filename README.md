## Laravel Elixir ngTemplateCache

[Laravel elixir](https://github.com/laravel/elixir) extension for generation angularjs templatecache module.

Read more about templateCache
* Angularjs API documentation: https://docs.angularjs.org/api/ng/service/$templateCache
* gulp-angular-templatecache: https://github.com/miickel/gulp-angular-templatecache

## Features

* Generate template cache module
 * So the angularjs could load all template with one http request
* Compress html in production mode
* Generate sourcemap

## Install

```
npm install --save-dev laravel-elixir-ngtemplatecache
```

## Usage

### Example *Gulpfile.js*:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-ngtemplatecache');

elixir(function(mix) {
    mix.ngTemplateCache();
});
```

All arguments all optional, meaning of them:
- `src` - template file pattern, these files located inside the base directory and these will be aggregated into one angularjs module, default value: `/**/*.html`
- `outputDir` - where to put the generated module, default value: `elixir.config.jsOutput` which means `public/js` if you left untoched the elixir configuration
- `baseDir` - base directory for searching template files, default value: `elixir.config.assetsDir + 'templates'` which means `resources/assets/templates` in case you haven't configured the elixir in another way
- `options` - configuration options for this plugin and for these 3rdparty libraries used by the plugin.
 - `templateCache` - This plugin use the [gulp-angular-templatecache]https://github.com/miickel/gulp-angular-templatecache#api) for the templatecache module generation. You can configure that plugin here. Default options:
 ```
 {
        standalone: true
 }
 ```
 - `htmlmin` - Options for html minification, you find possible parameter in the [html-minifier](https://github.com/kangax/html-minifier#options-quick-reference) documentation. Default options:
 ```
 {
        collapseWhitespace: true,
        removeComments: true
 }
 ```


### Complex example *Gulpfile.js* containing all default values:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-ngtemplatecache');

elixir(function(mix) {
    mix.ngTemplateCache('/**/*.html', 'public/js', 'resources/assets/templates', {
        templateCache: {
			standalone: true
		},
		htmlmin: {
			collapseWhitespace: true,
			removeComments: true
		}
    });
});
```

### Example Angular Usage:

Include the templates file into your html:
```html
<script src="public/js/templates.js"></script>
```
And then add the `templates` module to the main module of your angularjs application:

```javascript
angular.module('app', ['templates', '...']);
```

Use the template:
```html
<ng-include src='foo/bar.html'></ng-include>
```
This will require a file `BASEDIR/foo/bar.html`, so you don't have to put the `BASEDIR` inside the url.

## Changelog

__0.1.0__
- Initial release

## TODO

- Tests
- Source code documentation

## License

MIT