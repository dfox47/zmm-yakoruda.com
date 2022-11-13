// npm install -g gulp-cli
// npm install gulp gulp-csso gulp-concat vinyl-ftp gulp-util gulp-rename gulp-sass gulp-uglify --save-dev

const fs            = require('fs')
const config        = JSON.parse(fs.readFileSync('../config.json'))
const concat        = require('gulp-concat')
const cssMinify     = require('gulp-csso')
const ftp           = require('vinyl-ftp')
const gulp          = require('gulp')
const gutil         = require('gulp-util')
const rename        = require('gulp-rename')
const sass          = require('gulp-sass')(require('sass'))
const uglify        = require('gulp-uglify')

// FTP config
const host          = config.host
const password      = config.password
const port          = config.port
const user          = config.user

const remoteFolder            = '/wp-content/themes/zmm2020/'
const remoteAdmin             = '/wp-admin/'
const remoteAdminJs           = remoteAdmin + 'js/'
const remoteCss               = remoteFolder + 'css/'
const remoteJs                = remoteFolder + 'js/'
const remoteTemplateParts     = remoteFolder + 'template-parts/'
const remoteThemeWoo          = remoteFolder + 'woocommerce/single-product/'
const remoteThemeWooTabs      = remoteFolder + 'woocommerce/single-product/tabs/'
const remoteWooCss            = '/wp-content/plugins/woocommerce/assets/css/'
const remoteWooPackCss        = '/wp-content/plugins/woocommerce/packages/woocommerce-blocks/build/'

const localFolder             = 'wp-content/themes/zmm2020/'
const localAdmin              = 'wp-admin/'
const localAdminJs            = localAdmin + 'js/'
const localCss                = localFolder + 'css/'
const localJs                 = localFolder + 'js/'
const localTemplateParts      = localFolder + 'template-parts/'
const localThemeWoo           = localFolder + 'woocommerce/single-product/'
const localThemeWooTabs       = localThemeWoo + 'tabs/'
const localWooCss             = 'wp-content/plugins/woocommerce/assets/css/'
const localWooPackCss         = 'wp-content/plugins/woocommerce/packages/woocommerce-blocks/build/'

function getFtpConnection() {
	return ftp.create({
		host:           host,
		log:            gutil.log,
		password:       password,
		parallel:       3,
		port:           port,
		user:           user
	})
}

const conn = getFtpConnection()

gulp.task('css', function () {
	return gulp.src(localCss + 'styles.scss')
		.pipe(sass())
		.pipe(cssMinify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(conn.dest(remoteFolder))
})

gulp.task('copyCss', function () {
	return gulp.src(localCss + '**/*.scss')
		.pipe(conn.dest(remoteCss))
})

gulp.task('copyCssDefault', function () {
	return gulp.src(localFolder + '*.css')
		.pipe(conn.dest(remoteFolder))
})

gulp.task('copyJs', function () {
	return gulp.src(localJs + '**/*')
		.pipe(conn.dest(remoteJs))
})

gulp.task('copyAdminJs', function () {
	return gulp.src(localAdminJs + '**/*')
		.pipe(conn.dest(remoteAdminJs))
})

gulp.task('copyWooCss', function () {
	return gulp.src(localWooCss + '*.css')
		.pipe(conn.dest(remoteWooCss))
})

gulp.task('copyWooPackCss', function () {
	return gulp.src(localWooPackCss + '*.css')
		.pipe(conn.dest(remoteWooPackCss))
})

gulp.task('copyTemplateParts', function () {
	return gulp.src(localTemplateParts + '**/*.php')
		.pipe(conn.dest(remoteTemplateParts))
})

gulp.task('js', function () {
	return gulp.src([
		localJs + 'jquery-3.4.1.min.js',
		localJs + 'jquery-ui.js',
		localJs + 'select2.min.js',
		localJs + 'loader.js',
		localJs + '**/*.js'
	])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(conn.dest(remoteFolder))
})

gulp.task('php', function () {
	return gulp.src(localFolder + '*.php')
		.pipe(conn.dest(remoteFolder))
})

gulp.task('php_woo', function () {
	return gulp.src(localThemeWoo + '*.php')
		.pipe(conn.dest(remoteThemeWoo))
})

gulp.task('php_woo_tabs', function () {
	return gulp.src(localThemeWooTabs + '*.php')
		.pipe(conn.dest(remoteThemeWooTabs))
})

gulp.task('watch', function() {
	gulp.watch(localAdminJs + '**/*',             gulp.series('copyAdminJs'))
	gulp.watch(localCss + '**/*',                 gulp.series('css', 'copyCss'))
	gulp.watch(localFolder + '*.css',             gulp.series('copyCssDefault'))
	gulp.watch(localFolder + '*.php',             gulp.series('php'))
	gulp.watch(localJs + '**/*',                  gulp.series('copyJs'))
	gulp.watch(localTemplateParts + '**/*',       gulp.series('copyTemplateParts'))
	gulp.watch(localThemeWoo + '*.php',           gulp.series('php_woo'))
	gulp.watch(localThemeWooTabs + '*.php',       gulp.series('php_woo_tabs'))
	gulp.watch(localWooCss + '**/*',              gulp.series('copyWooCss'))
	gulp.watch(localWooPackCss + '**/*',          gulp.series('copyWooPackCss'))
})

gulp.task('default', gulp.series('watch'))