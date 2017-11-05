'use strict';
// 安装 gulp gulp-less gulp-cssnano gulp-autoprefixer gulp-concat gulp-uglify gulp-htmlmin browser-sync babel-preset-es2015
// 创建任务
/*gulp.task('taskname',() => {
	gulp.src('filepath').pipe(gulptaskname).pipe(gulp.dest('tofilepath'))
})*/

// 载入模块
const gulp = require('gulp');

// less编译 压缩任务
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

// js合并 压缩混淆
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require("gulp-babel");
// 图片压缩
const imagemin = require('gulp-imagemin');
// html 压缩
const htmlmin = require('gulp-htmlmin');
// browsersync
const browserSync = require('browser-sync').create();

gulp.task('less',() => {
  gulp.src(['src/css/*.less','!src/stycssles/_*.less'])
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('dist/css/')) //自动创建路径和文件夹
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',() => {
  gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream:true}));
});

// 图片复制
gulp.task('img',() => {
  gulp.src('src/images/*.*')
    // .pipe(imagemin({progressive: true}))
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('html',() => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true,removeComments:true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('server', () =>  {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  // 监听文件变化并自动执行任务
  gulp.watch('src/css/*.less',['less']);
  gulp.watch('src/js/*.js',['js']);
  gulp.watch('src/images/*.*',['img']);
  gulp.watch('src/*.html',['html']);
});

gulp.task('default', ['less', 'js', 'img', 'html']);