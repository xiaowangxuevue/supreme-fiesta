var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less= require('gulp-less');
var cleanCSS = require('gulp-clean-css')

gulp.task('minifyjs', function() {
    return gulp.src('src/js/*.js') //操作的源文件
        .pipe(concat('built.js')) //合并到临时文件     
        .pipe(gulp.dest('dist/js')) //生成到目标文件夹
        .pipe(rename({suffix: '.min'})) //重命名  
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'));
});


gulp.task('lessTask',function () {
  return gulp.src('src/less/*.less')
  .pipe(less())
  .pipe(gulp.dest('src/css'));
})

// css处理任务，指定依赖的任务
gulp.task('cssTask',['lessTask'],function () {

  return gulp.src('src/css/*.css')
  .pipe(concat('built.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(rename({suffix:'.min'}))
  .pipe(cleanCSS({compatibility:'ie8'}))
  .pipe(gulp.dest("dist/css"))
})

gulp.task('default', ['minifyjs','cssTask']);
