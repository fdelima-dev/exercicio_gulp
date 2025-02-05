const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// Compila e minifica o Sass
function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init()) // Inicia o mapeamento
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // Compila o Sass
        .pipe(cleanCSS()) // Minifica o CSS
        .pipe(rename({ suffix: '.min' })) // Renomeia para main.min.css
        .pipe(sourcemaps.write('./')) // Salva o mapa de origem
        .pipe(gulp.dest('./build/styles/'));
}

// Otimiza imagens
function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images/'));
}

// Minifica e renomeia JavaScript
function comprimeJavascript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./build/scripts/'));
}

// Exporta as funções para uso no terminal
exports.default = gulp.series(compilaSass, comprimeImagens, comprimeJavascript);    
