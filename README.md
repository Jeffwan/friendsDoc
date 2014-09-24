# FriendsDoc [website](http://friendsdoc.herokuapp.com/app/index.html#/)

## Background

Humans are social animals who care about their society. Every social network user what's to know his/her friends'
demographies. What's more, users want to get to know theirs friends' actions with strong desire, especially on themselves.

Interaction between users is the most important core competence for a social network site.
With the above analysis as the entry point, I'd like to design a simple website (or third party app) to help
improving interaction between you and your friends. It can show some interesting results and you can also share the
results to Facebook. Rough Function List are as follows( continuously update depend on the API and our algorithem.


## Function list:

* Who share your status/pics most;
* Who care you most
* Who may get a secret crush on you.
* Who is the most narcissistic
* Demographics of your friends ( location, age , gender, university and so on)

## Techs

Facebook SDK, AngularJS, D3(Web Data Visualization), HTML5 Boilerplate


## Group members and Responsibility

Wang Huan:
* User study
* Website wireframe
* User interaction design


Hao Yaxian:
* Facebook Data Analysis
* Algorithm Design


Shan Jiaxin:
* Website Architecture
* Module coding



## How to start the app

Clone the friends repository and start hacking...


### Running the app during development

You can pick one of these options:
* serve this repository with your webserver
* install node.js and run `scripts/web-server.js`

Then navigate your browser to `http://localhost:<port>/app/index.html` to see the app running in
your browser.


### Running unit tests

I will use [jasmine](http://pivotal.github.com/jasmine/) and
[Karma](http://karma-runner.github.io) for this project's unit tests/specs later if I have time, or I will keep same.

Requires [node.js](http://nodejs.org/), Karma (`sudo npm install -g karma`) and a local
or remote browser.

* start `scripts/test.sh` (on windows: `scripts\test.bat`)
  * a browser will start and connect to the Karma server (Chrome is default browser, others can be captured by loading the same url as the one in Chrome or by changing the `config/karma.conf.js` file)
* to run or re-run tests just change any of your source or test javascript files


### End to end testing


Requires a webserver, node.js + `./scripts/web-server.js` or your backend server that hosts the angular static files.

Check out the
[end-to-end runner's documentation](http://docs.angularjs.org/guide/dev_guide.e2e-testing) for more
info.

* create your end-to-end tests in `test/e2e/scenarios.js`
* serve your project directory with your http/backend server or node.js + `scripts/web-server.js`
* to run do one of:
  * open `http://localhost:port/test/e2e/runner.html` in your browser
  * run the tests from console with [Karma](http://karma-runner.github.io) via
    `scripts/e2e-test.sh` or `script/e2e-test.bat`


## Project Architecture

![](http://www.storagelab.org.cn/zhangdi/files/2013/07/web_front_end_before.png)


## Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        bootstrap/
          bootstrap.css --> css style
        app.css         --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      index-async.html  --> just like index.html, but loads js files asynchronously
      js/               --> javascript files
        controllers/    --> custom Angular controllers
        directives/     --> custom Angular directives
        filters/        --> custom Angular filters
        services/       --> custom Angular services
        app.js          --> Angular application bootstrap
      lib/              --> angular and 3rd party javascript libraries
        angular/
          angular.js        --> the latest angular js
          angular.min.js    --> the latest minified angular js
          angular-*.js      --> angular add-on modules
          version.txt       --> version number
        bootstrap/
          bootstrap.js      --> bootstrap js file for some componets
        jquery/
          jquery-1.10.2.js  --> lastest jquery source library
      templates/            --> angular view partials (partial html templates)
        partial1.html
        partial2.html

    config/karma.conf.js        --> config file for running unit tests with Karma
    config/karma-e2e.conf.js    --> config file for running e2e tests with Karma

    scripts/            --> handy shell/js/ruby scripts
      e2e-test.sh       --> runs end-to-end tests with Karma (*nix)
      e2e-test.bat      --> runs end-to-end tests with Karma (windows)
      test.bat          --> autotests unit tests with Karma (windows)
      test.sh           --> autotests unit tests with Karma (*nix)
      web-server.js     --> simple development webserver based on node.js

    test/               --> test source files and libraries
      e2e/              -->
        runner.html     --> end-to-end test runner (open in your browser to run)
        scenarios.js    --> end-to-end specs
      lib/
        angular/                --> angular testing libraries
          angular-mocks.js      --> mocks that replace certain angular services in tests
          angular-scenario.js   --> angular's scenario (end-to-end) test runner library
          version.txt           --> version file
      unit/                     --> unit level specs/tests
        controllersSpec.js      --> specs for controllers
        directivessSpec.js      --> specs for directives
        filtersSpec.js          --> specs for filters
        servicesSpec.js         --> specs for services

