var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del')
var nodemon = require('gulp-nodemon')

var config = {
    paths: {
        sass: './src/sass/*.scss',
        css: './public/styles/',
        nodeServer: './server.js'
    }
}

gulp.task('styles', ['clean-styles'], function (cb) {
    console.log("running styles")
    return gulp
        .src(config.paths.sass)
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer({browsers: ['last 2 version', '> 0.8%']}))
        .pipe(gulp.dest(config.paths.css));
});

gulp.task('clean-styles', function (cb) {
    console.log("running clean-styles")
    
    del([config.paths.css + "main.css"]).then(function () {
      cb(null)
    });
});

gulp.task('sass-watcher', function () {
    gulp.watch(config.paths.sass, ['styles'])
});

gulp.task('start', ['styles'], function () {
  
var nodeOptions = {
    script: 'server.js'
  , ext: 'js html scss'
  , env: { 'NODE_ENV': 'development'}
  , tasks: ['styles'] 
  }

  return nodemon(nodeOptions)
        .on('restart', function () {
            console.log('restarted!')
        })
        .on('start', function () {
            console.log('it started')
        });
      // .on('crash', function () {console.log('it crashed')})
      // .on('exit', function () {console.log('on exit')});
})

// function clean (path, done) {
//     console.log("running clean")
//     console.log("cleaning file: ", path)
//     del(path, done)
// }