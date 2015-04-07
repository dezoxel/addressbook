# Addressbook [![Build Status][travis-image]][travis-addressbook-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Code Climate][codeclimate-image]][codeclimate-url]
Implementation of simple addressbook on [AngularJS][angular-url]

If you need real-world application using [AngularJS][angular-url] but you tired from [TodoMVC](http://todomvc.com/) app - this project is for you.

Here you can find the code written in best practices and can be a good platform to catch ideas about structuring and writing the code.

Constantly trying to start writing the tests but you don't understand how to structure and what to test? Your tests looks dirty and too complicated? Checkout the real tests for [services][test-service-url] and [controllers][test-controller-url]. These are following [BetterSpecs][betterspecs-url] guidelines so they looks easy and maintainable.

## Live example
[http://dezoxel.github.io/addressbook](http://dezoxel.github.io/addressbook)

## Installation
```bash
$ cd /tmp
$ git clone https://github.com/dezoxel/addressbook.git
$ cd addressbook
$ npm install
$ bower install
$ grunt serve:dist
```

After running latest command your default browser will be automatically opened with the started Addressbook application.
If browser was not opened, please open the [http://localhost:9000](http://localhost:9000) on your favorite browser.

## Features

- List of addressbook entries
- Search for entries (filtering)
- Add
- Edit
- Delete

## TODO
2. Make protection of adding entries after 200 addresses
3. Add support for promises in Addressbook service
4. E2E tests
5. Fix margins & paddings where needed
6. Google analytics
7. Create adapter for mongolab storage
8. Create adapter for firebase storage
9. Optimize performance for 2000 entries

## Build & development

Run `grunt` for building. Code is built under `dist` directory.
Run `grunt serve` for preview and development.
Run `grunt serve:dist` for production build and preview.

## Testing & code quality

See the build history and tests results on [Travis CI][travis-addressbook-url].
Current build status: [![Build Status][travis-image]][travis-addressbook-url].

See the code coverage reports on [Coveralls.io][coveralls-url].
Current coverage status: [![Coverage Statugs][coveralls-image]][coveralls-url].

See the code quality reports on [Code Climate][codeclimate-url].
Current code quality: [![Code Climate][codeclimate-image]][codeclimate-url].

Running `grunt test` will run the unit tests with [Karma][karma-url].

Tests are following [BetterSpecs][betterspecs-url] guidelines.

Run `grunt plato` for generating code static analysis using [Plato][plato-url].
Visit `reports/static-analysis/index.html` in your browser in order to see the report.
Currently code is **75.45%** maintainable according to [Plato][plato-url]

## Deployment

Currently project supports deployment to the [Github Pages][github-pages-url]. Run the `grunt buildcontrol` in order to deploy latest version of the code.

## Technology stack
- [Twitter Bootstrap][twitter-bootstrap-url] - UI framework
- [AngularJS][angular-url] - base JS framework
- [Yeoman](http://yeoman.io/) - scaffolding tool
- [Bower](http://bower.io/) - frontend package manager
- [NPM](https://www.npmjs.com/) - backend package manager
- [Grunt](http://gruntjs.com/) - task runner
- [JSHint](http://jshint.com/) - built-in code errors detector
- [Karma][karma-url] - frontend test runner
- [Jasmine](http://jasmine.github.io/) - test library
- [PhantomJS](http://phantomjs.org/) - browser for testing
- [Github Pages][github-pages-url] - hosting platform for the live example
- [Plato][plato-url] - tool of code visualization, static analysis and complexity
- [Coveralls](https://coveralls.io/) - code coverage tool
- [Code Climate](https://codeclimate.com) - code quality tool
- [Travis CI][travis-ci-url] - CI server

## Requirements
- One entry in the addressbook is presented by **Name** (full name) and **Address** (full address) fields in the free form
- Both **Name** and **Address** should not be empty
- Browser's local storage should be used as a backend

#### Performance
- Application should not be optimized for big collections (>1000 items)

#### UI
- Should use [Twitter Bootstrap][twitter-bootstrap-url]
- Shoud be simple

#### List of addresses
- URL should be persistent
- Table with a two data columns: **Name** and **Address**
- One special (third) column for options: **Edit** and **Delete** buttons.
- **Edit button** goes to a separate page with an edit entry form
- **Delete** button immediately removes entry from the addressbook without confirmation
- Table header contains **Add address** button
- **Add address** button goes to a separate page with an add entry form
- **Search entry input** should be placed on top of the table with entries
- **Search input** should have width the same as table
- Typing something in the **Seach input** should filter out the table entries immediately
- Search should be performed by **Name** and **Address** columns

#### Add addressbook entry
- URL should be persistent
- Separate page with a form
- Two form fields provided: **Name** and **Address**
- Both fields should not be empty
- **Cancel** and **Add** buttons at the bottom of the form
- **Cancel** button goes to the list
- **Add** button adds the entry and goes to the list
- **Add** button is disabled if the form is not valid
- Enabling and disabling of **Add** button should be immediate
- If some of the field is not passed the validation it's block is highlighted with a red color and hint for user is provided

#### Edit addressbook entry
- The same requirements as for **Add entry**, but with corrections below
- URL contains ID of the entry
- Form should be populated with a data of edited entry
- Instead of **Add** button should be **Save**
- **Delete** button after **Save** should be present
- Clicking on **Delete** button should remove entry from the addressbook and redirect to the list
- **Delete** function should work without confirmation

[travis-image]: https://travis-ci.org/dezoxel/addressbook.png?branch=master
[travis-addressbook-url]: https://travis-ci.org/dezoxel/addressbook
[coveralls-image]: https://coveralls.io/repos/dezoxel/addressbook/badge.svg
[coveralls-url]: https://coveralls.io/r/dezoxel/addressbook
[codeclimate-image]: https://codeclimate.com/github/dezoxel/addressbook/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/dezoxel/addressbook
[angular-url]: https://angularjs.org/
[twitter-bootstrap-url]: http://getbootstrap.com/
[github-pages-url]: https://pages.github.com/
[karma-url]: http://karma-runner.github.io/
[travis-ci-url]: https://travis-ci.org/
[plato-url]: https://github.com/es-analysis/plato
[test-service-url]: https://github.com/dezoxel/addressbook/blob/master/test/spec/services/addressbook.js
[test-controller-url]: https://github.com/dezoxel/addressbook/blob/master/test/spec/controllers/edit.js
[betterspecs-url]: http://betterspecs.org/