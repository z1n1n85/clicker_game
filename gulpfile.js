import gulp from 'gulp';
import gclean from 'gulp-clean';                                    // удаление
import rename from 'gulp-rename';                                   // переименование файлов
import sync from 'browser-sync';                                    // автообновляющийся локальный сервер

import htmlmin from 'gulp-htmlmin';                                 // минификация HTML

import dartSass from 'sass';                                        // ядро SASS
import gulpSass from 'gulp-sass';                                   // SASS для Gulp
import autoprefixer from 'gulp-autoprefixer';                       // автопрефиксы
import cssClean from 'gulp-clean-css';                              // минификация CSS
import groupMediaQueries from 'gulp-group-css-media-queries';       // группировка меида-запросов

import jsmin from 'gulp-minify';                                    // минификация JS


const sass = gulpSass(dartSass);

export const clean = () => {
    return gulp.src('dist/media/*', {read: false})
        .pipe(gclean());
}

export const copy = () => {
    return gulp.src('src/media/**/*')
        .pipe(gulp.dest('dist/media'))
        .pipe(sync.stream());
}

export const html = () => {
    return gulp.src('src/*.html')
    .pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
}

export const scss = () => {
    return gulp.src('src/**/main.scss', {sourcemaps: true})
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupMediaQueries())
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 version"],
            cascade: true
        }))
        .pipe(cssClean())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
}

export const js = () => {
    return gulp.src('src/**/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
}

export const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist'
        }
    })
}

export const watch = () => {
    gulp.watch('src/*.html', gulp.series(html));
    gulp.watch('src/**/*.scss', gulp.series(scss));
    gulp.watch('src/**/*.js', gulp.series(js));
    gulp.watch('src/media/**/*', gulp.series(clean, copy));
}

export default gulp.series(
    clean,
    gulp.parallel(
        html,
        scss,
        js,
        copy,
    ),
    gulp.parallel(
        watch,
        server,
    )
);

