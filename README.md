# [DalekJS Homepage](http://dalekjs.com)

This is the repo that should be forked when you want to edit Daleks Homepage.

## How to work with the page

You need to have [Ruby](), [Node.js](http://nodejs.org) installed, as well as [Grunt](http://gruntjs.org), [Sass](http://sass-lang.org) and [Bower](http://bower.org).

After you cloned the repository, you need to install all the frontend and development dependencies. You can do this by running these commands from your command line:

```
npm install
```

```
bower install
```

```
git clone git@github.com:LeaVerou/prism.git bower_components/prism
```

## Develop

Once you installed the dependencies, you can start a development server (port 8888) as well as the sass compiler, by simply running:

```
grunt
```

from the root directory of the homepage.

You can edit all files in the `root` folder, as well as the html files in the `pages` folder and all scss, image and js files in the `css`, `img` and `js` folders.

## Do not edit!

All contents of the `docs` folder are generated automatically, never ever edit them
manually, because all your changes will be overridden!

If you find a typo or want to add smth. to one of the pages in the `docs` folder,
look for the corresponding dalek modules (e.g. if you want to change smth. in the firefox.html file, look for the dalek-browser-firefox module, in the json.html file, look for the dalek-reporter-json file, etc.).

The HTML files will be generated out of the DocBlock comments, every comment that is annotated with the `@api` annotation will be parsed and included in the HTML file (top to bottom). Markdown is supported within the DocBlock comments and should be used to apply some markup to the docs.

Also, to syntax highlight specific parts with Prism, you can add language specific code blocks:

Example:

```
/**
 * I am a dummy comment
 *
 * A list
 *   - One
 *   - Two
 *   - Three
 *
 * Code samples:
 *
 * ```html
 * <div>FooBar</div>
 * ```
 *
 * ```css
 * selector {
 *   key: value
 * }
 * ```
 *
 * ```javascript
 * var some = funky ? one : liner;
 * ```
 *
 * ```bash
 * $ dalek run_dalek_run.js
 * ```
 *
 * @api
 * @part Example
 */
```

## The assets folder

The `header` and `footer` handlebars templates from the `assets` folder
are used to add a header and a footer to all the subpages from the `pages` folder, as well as to the auto generated contents of the `docs` folder.

## How to push changes

If you push changes to this repo or any of the module repos the page gets generated & deployed automatically once you pull request has been accepted.
