const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const tildeImporter = require('node-sass-tilde-importer');
const argv = require('yargs').argv;

const production = process.env.NODE_ENV === 'production';
const scssSource = './scss/*.scss';

gulp.task('scss', () => gulp
    .src(scssSource)
    .pipe(gulpIf(!production, sourcemaps.init()))
    .pipe(sass({
        importer: tildeImporter,
        style: 'compressed',
        includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(gulpIf(!production, sourcemaps.write()))
    .pipe(gulpIf(production, cleanCSS({
        compatibility: '*',
        level: 2,
        inline: ['none']
    })))
    .pipe(gulp.dest('out/css'))
);

gulp.task('watch-scss', ['scss'], () => {
    gulp.watch(scssSource, ['scss']);
});
