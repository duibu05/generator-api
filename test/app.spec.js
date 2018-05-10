/* global describe before it */

const helpers = require('yeoman-test')
const assert = require('yeoman-assert')
const path = require('path')

describe('generator-api', () => {
  describe('Run yeoman generator-api with no docker support', () => {
    before(() => helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      serverName: 'serverName',
      serverDescription: 'serverDescription',
      serverVersion: 'serverVersion',
      authorName: 'authorName',
      authorEmail: 'authorEmail',
      models: ['foo', 'bar', 'BazFoo'],
      databaseName: 'databaseName',
      useDocker: false
    })
      .toPromise())

    // Test included files
    ;[{
      desc: 'generates an index.js file',
      files: ['index.js']
    }, {
      desc: 'generates a router.js file',
      files: ['routes.js']
    }, {
      desc: 'generates a package.json file',
      files: ['package.json']
    }, {
      desc: 'generates a .eslintignore file',
      files: ['.eslintignore']
    }, {
      desc: 'generates a .eslintrc.json file',
      files: ['.eslintrc.json']
    }, {
      desc: 'generates a .gitignore file',
      files: ['.gitignore']
    }, {
      desc: 'generates a config.js file',
      files: ['config.js']
    }, {
      desc: 'generates a README.md file',
      files: ['README.md']
    }].forEach((fileCase) => {
      it(fileCase.desc, () => {
        assert.file(fileCase.files)
      })
    })

    // Test not included files
    ;[{
      desc: 'doest not generate docker files when useDocker = false',
      files: ['Dockerfile', 'docker-compose.yml']
    }].forEach((fileCase) => {
      it(fileCase.desc, () => {
        assert.noFile(fileCase.files)
      })
    })

    it('generated README.md does not include references to docker', () => {
      assert.noFileContent('README.md', /Docker/)
    })

    describe('models', () => {
      it('generates a folder for each model', () => {
        assert.file([
          'modules/foo',
          'modules/bar',
          'modules/baz-foo'
        ])
      })

      describe('controllers', () => {
        it('generates a controller for each model', () => {
          assert.file([
            'modules/foo/controller.js',
            'modules/bar/controller.js',
            'modules/baz-foo/controller.js'
          ])
        })
      })

      describe('facades', () => {
        it('generates a facade for each model', () => {
          assert.file([
            'modules/foo/facade.js',
            'modules/bar/facade.js',
            'modules/baz-foo/facade.js'
          ])
        })
      })

      describe('routes', () => {
        it('generates a router for each model', () => {
          assert.file([
            'modules/foo/router.js',
            'modules/bar/router.js',
            'modules/baz-foo/router.js'
          ])
        })
      })

      describe('schemas', () => {
        it('generates a schema for each model', () => {
          assert.file([
            'modules/foo/schema.js',
            'modules/bar/schema.js',
            'modules/baz-foo/schema.js'
          ])
        })
      })
    })

    describe('libs', () => {
      it('generates a lib/controller.js file', () => {
        assert.file(['lib/controller.js'])
      })

      it('generates a lib/facade.js file', () => {
        assert.file(['lib/facade.js'])
      })
    })
  })

  describe.skip('Run yeoman generator-api with docker support', () => {
    before(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        serverName: 'serverName',
        serverDescription: 'serverDescription',
        serverVersion: 'serverVersion',
        authorName: 'authorName',
        authorEmail: 'authorEmail',
        models: ['foo'],
        databaseName: 'databaseName',
        useDocker: true
      })
      .toPromise())

    it('generates docker files when use Docker options is set to true', () => {
      assert.file('Dockerfile', 'docker-compose.yml')
    })

    it('generated README.md does include references to docker', () => {
      assert.fileContent('README.md', /Docker/)
    })
  })
})
