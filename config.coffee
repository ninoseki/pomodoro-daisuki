exports.config =
# See http://brunch.readthedocs.org/en/latest/config.html for documentation.
  paths:
    public: 'build'
  files:
    javascripts:
      defaultExtension: 'coffee'
      joinTo:
        'scripts/app.js': /^(app|vendor)/
        'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        before: [
          'vendor/scripts/console-helper.js'
          'vendor/scripts/jquery-1.7.js'
          'vendor/scripts/underscore-1.1.7.js'
          'vendor/scripts/backbone-0.5.3.js',
          'vendor/scripts/backbone.localStorage.js',
          'vendor/scripts/bootstrap-modal.js',
          'vendor/scripts/highcharts.js',
          'vendor/scripts/jquery-ui.1.8.11.min.js',
          'vendor/scripts/moment.min.js',
          'vendor/scripts/jquery.countdown.js'
        ]

    templates:
      defaultExtension: 'eco'
      joinTo: 'scripts/app.js'

    stylesheets:
      defaultExtension: 'styl'
      joinTo:
        'styles/app.css': /^(app|vendor)/
        'test/stylesheets/test.css': /^test/
      order:
        before: [
          'vendor/styles/bootstrap.css',
          'vendor/styles/jquery-ui-1.8.16.custom.css'
        ]
        after: []
