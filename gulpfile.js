var gulp = require('gulp');
	babel = require('gulp-babel'),
	browserify = require('gulp-browserify'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify')


gulp.task('default', function() {
	return gulp.src(['src/*.js', 'src/lib/*.js'])
		// .pipe(babel({presents: ['es2015']}))
		.pipe(browserify())
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
	        .pipe(gulp.dest('dist'));
});



/*

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
 
gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});
*/
