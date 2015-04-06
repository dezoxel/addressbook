# Addressbook [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Code Climate][codeclimate-image]][codeclimate-url]
Implementation of simple addressbook on AngularJS

## Requirements notices
- Application is not optimized for big collections as this was not a requirement
- You can easily optimize the performance if needed, because algorithm is placed in the one method
- Application UI is not rich because there was not a requirement

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

Addressbook supports these features:
- List of addressbook entries
- Search for entries (filtering)
- Add entry
- Edit entry
- Delete entry

## TODO
1. Cover by unit tests
2. Fix margins & paddings where needed
3. Google analytics


## Build & development

Run `grunt` for building and `grunt serve` for preview.

Run `grunt plato` for generating code static analysis. Visit reports/static-analysis/index.html in your browser in order
to see the report. Currently code is ~75% (74.84) maintainable according to [Plato](https://www.npmjs.com/package/plato).

## Testing

Running `grunt test` will run the unit tests with karma.

Tests are following [BetterSpecs](http://betterspecs.org/) guidelines.

## Deployment

Currently project supports deployment to the Github Pages. Run the `grunt buildcontrol` in order to deploy latest
version of the code.

[travis-image]: https://travis-ci.org/dezoxel/addressbook.png?branch=master
[travis-url]: https://travis-ci.org/dezoxel/addressbook
[coveralls-image]: https://coveralls.io/repos/dezoxel/addressbook/badge.svg
[coveralls-url]: https://coveralls.io/r/dezoxel/addressbook
[codeclimate-image]: https://codeclimate.com/repos/5522ad486956806eb60045c4/badges/099e87585f06d5605e20/gpa.svg
[codeclimate-url]: https://codeclimate.com/repos/5522ad486956806eb60045c4/feed