var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var protractor = require('gulp-protractor').protractor;


// argv.suite
var argv = require('yargs').argv;

gulp.task('jshint', function() {
	return gulp.src('./test/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

function runProtractor(done) {
	
	var suite = argv.suite;
	var args = suite.length > 0 ? suite : 'all'; 
	console.log('suite', suite);

	return gulp.src('./test/**/*.js')
		.pipe(protractor({
			configFile: './test/config.js',
			args: ['--suite', args]
		}))
		.on('error', function(e) {
			throw e
		})

}

gulp.task('test', ['jshint'], runProtractor);