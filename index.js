var gulp = require('gulp'),
    extend = require('extend'),
    htmlmin = require('gulp-htmlmin'),
    templateCache = require('gulp-angular-templatecache'),
    elixir = require('laravel-elixir'),
    gulpIf = elixir.Plugins.if,
    sourcemap = elixir.Plugins.sourcemaps,
    config = elixir.config;

elixir.extend('ngTemplateCache', function(src, output, basedir, options) {

    options = extend(true, {
        templateCache: {
            standalone: true
        },
        htmlmin: {
            collapseWhitespace: true,
            removeComments: true
        }
    }, options);

    var paths = new elixir.GulpPaths()
        .src(src || '**/*.html', basedir || config.assetsPath + '/templates/')
        .output(output || config.get('public.js.outputFolder'));

    new elixir.Task('ngTemplateCache', function() {

        return gulp.src(paths.src.path)
            .pipe(gulpIf(config.sourcemaps, sourcemap.init()))
            .pipe(gulpIf(config.production, htmlmin(options.htmlmin)))
            .pipe(templateCache(options.templateCache))
            .pipe(gulpIf(config.sourcemaps, sourcemap.write('.')))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new elixir.Notification('Angular templatecache generated.'));

    }).watch(paths.src.path);

});
