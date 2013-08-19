YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Browser.FirefoxDriver",
        "FirefoxDriver.Commands.Marionette.Cookie",
        "FirefoxDriver.Commands.Marionette.Execute",
        "FirefoxDriver.Commands.Marionette.Frame",
        "FirefoxDriver.Commands.Marionette.IME",
        "FirefoxDriver.Commands.Marionette.Page",
        "FirefoxDriver.Commands.Marionette.Session",
        "FirefoxDriver.Commands.Marionette.Timeout",
        "FirefoxDriver.Commands.Marionette.Url",
        "FirefoxDriver.Commands.WebDriver.Cookie",
        "FirefoxDriver.Commands.WebDriver.Element",
        "FirefoxDriver.Commands.WebDriver.Frame",
        "FirefoxDriver.Commands.WebDriver.Ime",
        "FirefoxDriver.Commands.WebDriver.Interaction",
        "FirefoxDriver.Commands.WebDriver.Logging",
        "FirefoxDriver.Commands.WebDriver.Page",
        "FirefoxDriver.Commands.WebDriver.Screenshot",
        "FirefoxDriver.Commands.WebDriver.ScriptExecutor",
        "FirefoxDriver.Commands.WebDriver.Session",
        "FirefoxDriver.Commands.WebDriver.Storage",
        "FirefoxDriver.Commands.WebDriver.Timeout",
        "FirefoxDriver.Commands.WebDriver.URL",
        "FirefoxDriver.Commands.WebDriver.Window",
        "FirefoxDriver.Marionette",
        "FirefoxDriver.WebDriverServer"
    ],
    "modules": [
        "DalekJS",
        "FirefoxDriver"
    ],
    "allModules": [
        {
            "displayName": "DalekJS",
            "name": "DalekJS",
            "description": "This module is a browser plugin for [DalekJS](//github.com/dalekjs/dalek).\nIt provides all a WebDriverServer & browser launcher for Mozilla Firefox.\n\nThe browser plugin can be installed with the following command:\n\n```bash\n$ npm install dalek-browser-firefox --save-dev\n```\n\nYou can use the browser plugin by adding a config option to the your Dalekfile\n\n```javascript\n\"browsers\": [\"firefox\"]\n```\n\nOr you can tell Dalek that it should test in this browser via the command line:\n\n```bash\n$ dalek mytest.js -b firefox\n```\n\nBecause of the availability of the Firefox Marionette testing framework,\nDalek atm. can only drive the Firefox Nightly Debug builds.\n\nYou can get them from Mozillas FTP server, for example the one from the 16th August [http://ftp.mozilla.org/pub/mozilla.org/firefox/nightly/2013/08/2013-08-16-mozilla-central-debug/](http://ftp.mozilla.org/pub/mozilla.org/firefox/nightly/2013/06/2013-06-18-mozilla-central-debug/)\n\nDalek looks for the browser in the std. installation directory, if you installed the\nbrowser in a different place, you can add the location of the browser executable to you Dalekfile,\nbecause Dalek isn't capable of finding the executable yet on its own.\n\n```javascript\n\"browsers\": [{\n  \"firefox\": {\n    \"path\": \"~/Apps/FirefoxNightlyDebug.app/Contents/MacOS/firefox-bin\"\n  }\n}]\n```\n\nThe Firefox plugin only implements a subset of Daleks Assertions & Actions, so if you run into any bugs,\nthe issue is most probably related to missing commands.\nPlease report any issues you find, Thank you :)"
        },
        {
            "displayName": "FirefoxDriver",
            "name": "FirefoxDriver",
            "description": "Cookie related Marionette commands\nsee [JsonProtocol](https://wiki.mozilla.org/Auto-tools/Projects/Marionette/JSON_Protocol)"
        }
    ]
} };
});