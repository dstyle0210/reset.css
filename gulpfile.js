/**
 * Gulp Setting for immall.co.kr v1.0
 * @ahther 디스타일(마봉아빠 , dstyle0210@gmail.com)
 * @url : https://dstyle0210.github.io/gulp-setting/
 * @blog : http://dstyleitsme.tistory.com
 */

'use strict';

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var csscomb = require('gulp-csscomb');
var replace = require('gulp-replace');
var concatStream = false;

gulp.task("default",["scss"],function(){
    gulp.watch(["./src/css/*.css"]).on("change",function(){
        if(concatStream){
            console.log(getTimeStamp() + "[concat] 'reset.css' concat failed");
            return false;
        }else{
            concatStream = true;
            gulp.src(["./src/css/*.css"])
                .pipe(concat("reset.css"))
                .pipe(replace('@charset "UTF-8";',''))
                .pipe(insert.prepend('@charset "UTF-8";\n'))
                .pipe(replace('/*!','\n/*!'))
                .pipe(replace(/[\n]{3}/g,"\n"))
                .pipe(gulp.dest("./dist"))
                .on("end",function(){
                    concatStream = false;
                    console.log(getTimeStamp() + "[concat] 'reset.css' concated");
                });
        };
    });
});

gulp.task("scss",function(){
    gulp.watch(["./src/scss/*.scss"]).on("change",function(){
        gulp.src(["./src/scss/*.scss"],{"base":"./src/scss"})
            .pipe(sass())
            .pipe(csscomb("./zen.json"))
            .pipe(csso())
            .pipe(replace(/}/g,'}\n'))
            .pipe(replace('/*!','\n/*!'))
            .pipe(replace('{.','{\n\t.'))
            .pipe(replace('"UTF-8";','"UTF-8";\n'))
            .pipe(gulp.dest("./src/css"));
            console.log(getTimeStamp() + "[scss] build");
    });
});

gulp.task("dist",function(){
    gulp.src(["./src/css/*.css"])
        .pipe(concat("reset.css"))
        .pipe(replace('@charset "UTF-8";',''))
        .pipe(insert.prepend('@charset "UTF-8";\n'))
        .pipe(replace('/*!','\n/*!'))
        .pipe(replace(/[\n]{3}/g,"\n"))
        .pipe(gulp.dest("./dist"))
        .on("end",function(){
            console.log(getTimeStamp() + "[concat] 'reset.css' concated");
        });

    return gulp.src(["./src/css/*.css"])
        .pipe(concat("reset.min.css"))
        .pipe(csscomb("./zen.json"))
        .pipe(replace('@charset "UTF-8";',''))
        .pipe(replace('/*!','/*'))
        .pipe(csso({restructure: false}))
        .pipe(insert.prepend('@charset "UTF-8";\n'))
        .pipe(replace(/}/g,'}\n'))
        .pipe(replace('{.','{\n\t.'))
        .pipe(gulp.dest("./dist"))
        .on("end",function(){
            console.log(getTimeStamp() + "[concat] 'reset.min.css' concated");
        });
});

function getTimeStamp() {
    var now = new Date();
    return "["+(now.getHours() + ':' +((now.getMinutes() < 10)? ("0" + now.getMinutes()): (now.getMinutes())) + ':' +((now.getSeconds() < 10)? ("0" + now.getSeconds()): (now.getSeconds())))+"]";
}