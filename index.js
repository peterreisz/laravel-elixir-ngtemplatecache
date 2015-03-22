var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    sourcemap = require('gulp-sourcemaps'),
	htmlmin = require('gulp-htmlmin'),
	templateCache = require('gulp-angular-templatecache'),
	extend = require('extend'),
    elixir = require('laravel-elixir'),
    utilities = require('laravel-elixir/ingredients/commands/Utilities'),
	Notification = require('laravel-elixir/ingredients/commands/Notification');

elixir.extend('ngTemplateCache', function(src, outputDir, baseDir, options) {

    var config = elixir.config,
	    baseDir = baseDir || config.assetsDir + 'templates',
	    filePattern = '/**/*.html';

	options = extend(true, {
		templateCache: {
			standalone: true
		},
		htmlmin: {
			collapseWhitespace: true,
			removeComments: true
		}
	}, options);

    src = utilities.buildGulpSrc(src, baseDir, filePattern);

    gulp.task('ngTemplateCache', function() {
        return gulp.src(src)
	        .pipe(gulpIf(config.sourcemaps, sourcemap.init()))
	        .pipe(gulpIf(config.production, htmlmin(options.htmlmin)))
	        .pipe(templateCache(options.templateCache))
	        .pipe(gulpIf(config.sourcemaps, sourcemap.write('.')))
            .pipe(gulp.dest(outputDir || config.jsOutput))
	        .pipe(new Notification().message('Angular templatecache generated.'));
    });

    this.registerWatcher('ngTemplateCache', baseDir + filePattern);

    return this.queueTask('ngTemplateCache');
});
