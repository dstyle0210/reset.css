module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    less: {
			dist: {
				files: {
					'reset.css':'reset.less'
				}
			}
		},
		

		watch: {
			less:{
				files: ['reset.less'],
				/*tasks: ['less','autoprefixer']*/
				tasks: ['less','autoprefixer','cssmin']
			}
		},
		cssmin: {
			/*combine: {
			    files: {
			      'com/css/dist/public_combine.css': ['com/css/*.css']
			    } 
			  },*/
			dist: {
				expand: true,
				src: ['reset.css'],
				dest:"../",
				ext: '.min.css'
			}
		},
		autoprefixer : {
			options : {
				browsers: ['last 5 version','ie 8','ie 9','ie 10']
			// Task-specific options go here.
			},
			dest:{
				src:'reset.css'
			}
			/*no_dest: {
				src: 'reset.css' // globbing is also possible here
			}*/
		}
	});


	/*
	 * 작업에 필요한 모듈 로드하기 grunt.loadNpmTasks('grunt-ANY-PLUGIN');
	 */ 
	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
	}grunt

	// Default task(s).
	// grunt.registerTask('default', ['less', 'cssmin', 'requirejs', 'watch']);
	grunt.registerTask('default', ['less','autoprefixer','cssmin','watch']);
};