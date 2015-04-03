# Addressbook
Implementation of simple addressbook on AngularJS

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
3. Travis CI
4. Test coverage tool
5. Google analytics


## Build & development

Run `grunt` for building and `grunt serve` for preview.

Run `grunt plato` for generating code static analysis. Visit reports/static-analysis/index.html in your browser in order
to see the report.

## Testing

Running `grunt test` will run the unit tests with karma.

## Deployment

Currently project supports deployment to the Github Pages. Run the `grunt buildcontrol` in order to deploy latest
version of the code.