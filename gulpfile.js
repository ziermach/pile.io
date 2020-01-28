var gulp = require('gulp');
var ts = require('gulp-typescript');
var exec = require('child_process').exec;
var tslint = require("gulp-tslint");

const { watch, series, parallel, task } = require('gulp');

const tsBuidConfig = {
    'backend': {
        'project': ts.createProject('gui-backend/tsconfig.json'),
        'src': 'gui-backend/src/**/*.ts',
        'dist': 'dist'
    },
    'frontend': {
        'project': ts.createProject('tsconfig.json'),
        'src': ['**/*.ts', '**/*.html', '**/*.scss'],
        'dist': 'dist'
    }
}

function buildElectron(cb) {
    var buildConfig = tsBuidConfig.backend;
    return gulp.src(buildConfig.src)
        .pipe(buildConfig.project()).js.on("error", (err) => { console.error(err); })
        .pipe(gulp.dest(buildConfig.dist));
}

function startElectron(cb) {
    exec('npm run electron', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    cb();
}

function buildAngular(cb) {
    exec('npm run build:test', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb();
    });
}

task('build', series(buildAngular, buildElectron, ))

function watchTsc(cb) {
    return watch([tsBuidConfig.backend.src, ...tsBuidConfig.frontend.src], {delay: 600}, series('build'));
}

exports.default = series('build', watchTsc);