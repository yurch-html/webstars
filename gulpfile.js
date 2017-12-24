var gulp  		= require('gulp'),
	sass  		= require('gulp-sass'),
	uglify 		= require('gulp-uglifyjs'),
	concat 		= require('gulp-concat'),
	cssnano 	= require('gulp-cssnano'),
	rename  	= require('gulp-rename'),
	imagemin	= require('gulp-imagemin'),
	pngquant	= require('imagemin-pngquant'),
	rigger 		= require('gulp-rigger'),
	prefix		= require('gulp-autoprefixer'),
	del         = require('del'),
	cache 		= require('gulp-cache');


gulp.task('del', function() {
	return del.sync('dist'); 
});


gulp.task('html', function(){
	gulp.src('src/html/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('src'))
});

gulp.task('sass', function(){
	return gulp.src('src/sass/**/*.scss')
	.pipe(sass())
	.pipe(prefix(['last 7 versions', '> 1%', 'ie 8', "ie 7"]))
	.pipe(gulp.dest('src/css'))
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['css-min', 'minjs','css-min-style', 'libjs', 'html'], function(){
	gulp.watch('src/html/**/*.html', ['html']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/css/**/*.css', ['css-min-style']);
	gulp.watch('src/libsjs/*.js', ['libjs']);
  gulp.watch('src/custom-js/*.js', ['minjs']);
});

gulp.task('libjs', function(){
	return gulp.src([
		'src/libs-js/jquery-1.11.0.min.js',
    'src/libs-js/slick.min.js',
    'src/libs-js/auto-height.js',
    'src/libs-js/map.js',
    'src/libs-js/dynamics.min.js',
		
//		LIBJS
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/min-js'));
});

gulp.task('minjs', function(){
	return gulp.src([
		'src/custom-js/main.js',
	])
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/min-js'));
});

gulp.task('css-min', ['sass'], function(){
	return gulp.src('src/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/css'));
});


gulp.task('css-min-style', function(){
	return gulp.src('src/css/style.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css'));
});


gulp.task('build', ['del', 'minjs', 'img'], function(){
	
	var buildCss = gulp.src([
		'src/css/style.css',
		'src/css/style.min.css',
		'src/css/libs.min.css',
	])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

  var buildJS = gulp.src('src/min-js/**/*')
  .pipe(gulp.dest('dist/min-js'));

	var buildHtml = gulp.src('src/*.html')
	.pipe(gulp.dest('dist/'));
});
