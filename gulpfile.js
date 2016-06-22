var gulp = require('gulp');

var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();



gulp.task('jade', function() {
 
  return gulp.src('index.jade')
    .pipe(jade({pretty: true}).on('error', function(err) {
      console.log(err);
	}))
    .pipe(gulp.dest('.'));
});


gulp.task('sass', function () {
  return gulp.src('styles.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer({
	  browsers: ['last 5 versions', '> 5%', 'Firefox ESR']
	}))
    .pipe(gulp.dest('.'));
});



gulp.task('serve', ['jade'], function() {


    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });

	gulp.watch("index.jade", ['jade',  browserSync.reload]);

	gulp.watch("styles.scss", ['sass', browserSync.reload]);

});




gulp.task('default',['serve']);
