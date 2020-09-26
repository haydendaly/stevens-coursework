const gulp = require('gulp');
const concatenate = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoPrefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const gulpSASS = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');

const sassFiles = [
	'./src/styles/variables.scss',
	'./src/styles/custom.scss',
	'./src/styles/bootstrap/scss/_variables.scss'
];

const vendorJsFiles = [
	'./node_modules/jquery/dist/jquery.js',
	'./node_modules/popper.js/dist/umd/popper.min.js',
	'./src/styles/bootstrap/dist/js/bootstrap.js'
];

gulp.task('image', done => {
	gulp.src('src/images/*')
	  .pipe(imagemin([
		imagemin.mozjpeg({quality: 75, progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
	  ]))
	  .pipe(gulp.dest('./public/images'));
	done();
});

gulp.task('sass', done => {
	gulp
		.src(sassFiles)
		.pipe(gulpSASS())
		.pipe(concatenate('styles.css'))
		.pipe(gulp.dest('./public/css/'))
		.pipe(autoPrefix())
		.pipe(cleanCSS())
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('./public/css/'));
	done();
});

gulp.task('minify', () => {
	return gulp.src('src/*.html')
	  .pipe(htmlmin({ collapseWhitespace: true }))
	  .pipe(gulp.dest('public'));
});

gulp.task('js:vendor', done => {
	gulp.src(vendorJsFiles).pipe(concatenate('vendor.min.js')).pipe(gulp.dest('./public/js/'));
	done();
});

gulp.task('build', gulp.parallel([ 'sass', 'js:vendor', 'image', 'minify' ]));

gulp.task('watch', done => {
	gulp.watch(sassFiles, gulp.series('sass'));
	gulp.watch(vendorJsFiles, gulp.series('js:vendor'));
	done();
});

gulp.task('default', gulp.series('watch'));