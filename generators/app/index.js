'use strict'
var yeoman = require('yeoman-generator')

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log('Budo Starter Kit')
    return this.prompt([{
      type: 'input',
      name: 'title',
      message: 'Project title',
      default: this.appname
    }]).then(function (props) {
      this.projectContext = {
        title: props.title,
        name: this.appname.replace(/\s+/g, '-')
      }
    }.bind(this))
  },

  _projectTpl: function (tmplPath, destPath) {
    console.log(this.projectContext)
    this.fs.copyTpl(
      this.templatePath(tmplPath),
      this.destinationPath(destPath),
      this.projectContext)
  },

  writing: {
    root: function () {
      this.copy('_babelrc', '.babelrc')
      this.copy('_editorconfig', '.editorconfig')
      this.copy('_eslintrc', '.eslintrc')
      this.copy('_gitattributes', '.gitattributes')
      this.copy('_gitignore', '.gitignore')
      this._projectTpl('_LICENSE', 'LICENSE')
      this._projectTpl('_package.json', 'package.json')
      this._projectTpl('_README.md', 'README.md')
      this._projectTpl('index.html', 'index.html')
      this.copy('rollup.config.js', 'rollup.config.js')
    },

    scripts: function () {
      this._projectTpl('scripts/build.sh', 'scripts/build.sh')
      this._projectTpl('scripts/copy_assets.sh', 'scripts/copy_assets.sh')
      this._projectTpl('scripts/preprocess.js', 'scripts/preprocess.js')
      this._projectTpl('scripts/start.sh', 'scripts/start.sh')
      this._projectTpl('scripts/test_lint.sh', 'scripts/test_lint.sh')
      this._projectTpl('scripts/test_unit.sh', 'scripts/test_unit.sh')
    },

    src: function () {
      this.directory('src')
    },

    styles: function () {
      this.directory('styles')
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    })
  }
})
