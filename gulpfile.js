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
var runSequence = require('run-sequence');
var concatStream = false;



// gulp value setting
var gval = {}
gval.scss = {
    base:"./src/scss",
    src:"./src/scss/*.scss",
    dist:"./src/css"
};
gval.css = {
    base:"./src/css",
    src:"./src/css/*.css",
    dist:"./dist"
};

gulp.task("default",function(callback) {
    runSequence("scss:build", "scss:watch", function () {
        console.log(getTimeStamp() + "WORKSPACE READY!");
    });
});

gulp.task("scss:build",function(){
    return pipeLineScss(gulp.src([gval.scss.src],{"base":gval.scss.base}) , gval.scss.dist);
});

gulp.task("scss:watch",function() {
    return gulp.watch([scss]).on("change",function(file){
        var name = path.parse(file.path).base;
        pipeLineScss( gulp.src(file.path,{"base":gval.scss.base}) , gval.scss.dist);
        console.log(getTimeStamp() + " [scss:watch] "+name+" changed");
    });
});

gulp.task("css:concat",function() {
    return gulp.src([gval.css.src])
        .pipe(concat("reset.css"))
        .pipe(csso({restructure: false}))
        .pipe(replace('@charset "UTF-8";',''))
        .pipe(replace('@charset "utf-8";',''))
        .pipe(insert.prepend('@charset "UTF-8";\n'))
        .pipe(replace(/}/g,'}\n'))
        .pipe(replace('/*!','\n/*!'))
        .pipe(replace('{.','{\n\t.'))
        .pipe(gulp.dest(gval.css.dist));
});

gulp.task("css:minify",function() {
    return gulp.src([gval.css.src])
        .pipe(concat("reset.min.css"))
        .pipe(replace('@charset "UTF-8";',''))
        .pipe(replace('@charset "utf-8";',''))
        .pipe(replace('/*!','/*'))
        .pipe(csso({restructure: false}))
        .pipe(insert.prepend('@charset "UTF-8";\n/* Dstyle reset.css , minify by '+getDateStamp()+'*/\n'))
        .pipe(gulp.dest(gval.css.dist));
});

function pipeLineScss(gulpFile , dest){
    return gulpFile.pipe(sass().on('error', sass.logError))
        .pipe(csscomb("./zen.json"))
        .pipe(csso())
        .pipe(replace(/}/g,'}\n'))
        .pipe(replace('/*!','\n/*!'))
        .pipe(replace('{.','{\n\t.'))
        .pipe(replace('"UTF-8";','"UTF-8";\n'))
        .pipe(gulp.dest(dest));
};

function getTimeStamp() {
    var now = new Date();
    return ""+(now.getHours() + ':' +((now.getMinutes() < 10)? ("0" + now.getMinutes()): (now.getMinutes())) + ':' +((now.getSeconds() < 10)? ("0" + now.getSeconds()): (now.getSeconds())))+"";
}
function getDateStamp() {
    var now = new Date();
    var month = ((now.getMonth()+1)<10) ? "0"+ (now.getMonth()+1) : (now.getMonth()+1);
    var date = (now.getDate()<10) ? "0"+ now.getDate() : now.getDate();
    return ""+now.getFullYear()+"-"+month+"-"+date;
}




/*
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


*/