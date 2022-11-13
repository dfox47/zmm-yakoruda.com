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

const remoteFolder                  = '/wp-content/themes/zmm2020/'
const remoteFolderAdmin             = '/wp-admin/'
const remoteFolderAdminJs           = remoteFolderAdmin + 'js/'
const remoteFolderCss               = remoteFolder + 'css/'
const remoteFolderJs                = remoteFolder + 'js/'
const remoteFolderThemeWoo          = remoteFolder + 'woocommerce/single-product/'
const remoteFolderThemeWooTabs      = remoteFolder + 'woocommerce/single-product/tabs/'
const remoteFolderWooCss            = '/wp-content/plugins/woocommerce/assets/css/'
const remoteFolderWooPackCss        = '/wp-content/plugins/woocommerce/packages/woocommerce-blocks/build/'
const remoteFolderTemplateParts     = remoteFolder + 'template-parts/'

const localFolder                   = 'wp-content/themes/zmm2020/'
const localFolderAdmin              = 'wp-admin/'
const localFolderAdminJs            = localFolderAdmin + 'js/'
const localFolderCss                = localFolder + 'css/'
const localFolderJs                 = localFolder + 'js/'
const localFolderThemeWoo           = localFolder + 'woocommerce/single-product/'
const localFolderThemeWooTabs       = localFolder + 'woocommerce/single-product/tabs/'
const localFolderWooCss             = 'wp-content/plugins/woocommerce/assets/css/'
const localFolderWooPackCss         = 'wp-content/plugins/woocommerce/packages/woocommerce-blocks/build/'
const localFolderTemplateParts      = localFolder + 'template-parts/'

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
	return gulp.src(localFolderCss + 'styles.scss')
		.pipe(sass())
		.pipe(cssMinify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(conn.dest(remoteFolder));
});

gulp.task('copyCss', function () {
	return gulp.src(localFolderCss + '**/*.scss')
		.pipe(conn.dest(remoteFolderCss));
});

gulp.task('copyCssDefault', function () {
	return gulp.src(localFolder + '*.css')
		.pipe(conn.dest(remoteFolder));
});

gulp.task('copyJs', function () {
	return gulp.src(localFolderJs + '**/*')
		.pipe(conn.dest(remoteFolderJs));
});

gulp.task('copyAdminJs', function () {
	return gulp.src(localFolderAdminJs + '**/*')
		.pipe(conn.dest(remoteFolderAdminJs));
});

gulp.task('copyWooCss', function () {
	return gulp.src(localFolderWooCss + '*.css')
		.pipe(conn.dest(remoteFolderWooCss));
});

gulp.task('copyWooPackCss', function () {
	return gulp.src(localFolderWooPackCss + '*.css')
		.pipe(conn.dest(remoteFolderWooPackCss));
});

gulp.task('copyTemplateParts', function () {
	return gulp.src(localFolderTemplateParts + '**/*.php')
		.pipe(conn.dest(remoteFolderTemplateParts));
});



gulp.task('js', function () {
	return gulp.src([
		localFolderJs + 'jquery-3.4.1.min.js',
		localFolderJs + 'jquery-ui.js',
		localFolderJs + 'select2.min.js',
		localFolderJs + 'loader.js',
		localFolderJs + '**/*.js'
	])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(conn.dest(remoteFolder));
});



gulp.task('php', function () {
	return gulp.src(localFolder + '*.php')
		.pipe(conn.dest(remoteFolder));
});

gulp.task('php_woo', function () {
	return gulp.src(localFolderThemeWoo + '*.php')
		.pipe(conn.dest(remoteFolderThemeWoo));
});

gulp.task('php_woo_tabs', function () {
	return gulp.src(localFolderThemeWooTabs + '*.php')
		.pipe(conn.dest(remoteFolderThemeWooTabs));
});



gulp.task('watch', function() {
	gulp.watch(localFolder + '*.css',                           gulp.series('copyCssDefault'))
	gulp.watch(localFolder + '*.php',                           gulp.series('php'))
	gulp.watch(localFolderAdminJs + '**/*',                     gulp.series('copyAdminJs'))
	gulp.watch(localFolderCss + '**/*',                         gulp.series('css', 'copyCss'))
	gulp.watch(localFolderJs + '**/*',                          gulp.series('copyJs'))
	gulp.watch(localFolderThemeWoo + '*.php',                   gulp.series('php_woo'))
	gulp.watch(localFolderThemeWooTabs + '*.php',       gulp.series('php_woo_tabs'))
	gulp.watch(localFolderWooCss + '**/*',              gulp.series('copyWooCss'))
	gulp.watch(localFolderWooPackCss + '**/*',          gulp.series('copyWooPackCss'))
	gulp.watch(localFolderTemplateParts + '**/*',       gulp.series('copyTemplateParts'))
})

gulp.task('default', gulp.series('watch'))