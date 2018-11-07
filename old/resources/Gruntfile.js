module.exports = function(grunt) {
	
	/*
	 * 작업에 필요한 모듈 로드하기 grunt.loadNpmTasks('grunt-ANY-PLUGIN');
	 */ 
	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
	}
	
	
	
	
	
	// Project configuration.
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    less: {
			dev: {
				files:[{
						expand: true,
						cwd: './',
						src: ['*.less'],
						dest: './',
						ext: '.css'
					}]
			}
		},
		watch: {
			less:{
				files: ['*.less'],
				tasks: ['dev']
			}
		},
		cssmin: {
			dist: {
				expand: true,
				src: ['*.css'],
				dest:"../",
				ext: '.min.css'
			}
		},
		// Autoprefixer - new postCSS
		postcss: {
		  options: {
		    map: false,
		    processors: [
		      require('autoprefixer-core')({browsers: ['last 3 version']})
		    ]
		  },
		  dev: {
		    src: '*.css'
		  }
		},
		// text Replace by CSS
		csscomb: {
			options:{
				config:"zen.json"
			},
		    dynamic_mappings: {
		        expand: true,
		        cwd: './',
		        src: ['*.css'],
		        dest: './',
		        ext: '.css'
		    }
		}
	});


	// Default task(s).
	// grunt.registerTask('default', ['less', 'cssmin', 'requirejs', 'watch']);
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('dev', ['newer:less:dev','newer:postcss:dev','newer:csscomb']);
};