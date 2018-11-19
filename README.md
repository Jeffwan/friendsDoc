# FriendsDoc
[Click here to play with the application](http://friendsdoc.herokuapp.com/app/index.html#/)

[Full Report](https://drive.google.com/file/d/0B1VKHlZ80zq9cXRhYmhicGNSYXM/view?usp=sharing)

## Background

Humans are social animals who care about their society. Every social network user what's to know his/her friends'
demographies. What's more, users want to get to know theirs friends' actions with strong desire, especially on themselves.

Interaction between users is the most important core competence for a social network site.
With the above analysis as the entry point, I'd like to design a simple website (or third party app) to help
improving interaction between you and your friends. It can show some interesting results and you can also share the
results to Facebook. Rough Function List are as follows( continuously update depend on the API and our algorithem.

[Full Report](https://drive.google.com/file/d/0B1VKHlZ80zq9cXRhYmhicGNSYXM/view?usp=sharing)

## Function list:

* Who share your status/pics most;
* Who care you most
* Who may get a secret crush on you.
* Who is the most narcissistic
* Demographics of your friends ( location, age , gender, university and so on)

## Techs

Facebook SDK, AngularJS(UI-Bootstrap, UI-router), D3(Web Data Visualization), Google Chart, BootStrap, local storage


## Group members and Responsibility

Shan Jiaxin:
* Website Architecture
* Module coding

Wang Huan:
* User study
* Website wireframe
* User interaction design


Hao Yaxian:
* Facebook Data Analysis
* Algorithm Design


## Uber related
This app focus on front-end works, since we find the solution to make it without any backend or database works.
There's only a node server running on backend, and all the other computing and data visualization works handled by
angular, FB Graph API is the data source.

*Trade off*:

We use local storage instead of database to store user information, the user accessToken will be stored there.
In addition, I all cache some friends picture there since most of the functions will use that and it avoid retrieving it
all the time.

*Improvements*:

1. Optimize some algorithm to make computing faster.
2. May add some backend functions on nodeJS to boost the performance because Facebook Graph API I think will have rate limit,
I can cache API query result for user. Next time, We just visit cache to retrieve data.
3. Improve test coverage

*Jiaxin's contribution*:

I come up this idea and hire my teammates in my class. I contribute most of the codes (80%) and manage our project from
version control, wiki sharing and bug management perspective on github.

*Other projects I am proud of (Uber may know more of me)*

[Relative Care](https://github.com/Jeffwan/RelativeCare)

[Slides](https://docs.google.com/presentation/d/1UI9bUen22pBwlIPlwHGimwiphbfJuMX4Sea1ZacGn-I/edit?usp=sharing)

## How to start the app

Clone the friends repository and start hacking...

(Since I have my facebook app token configured for heroku domain, we can't play with it,
you should create your own token)

### Running the app on Heroku
[Heroku link](http://friendsdoc.herokuapp.com/app/index.html#/)

The most interesting part is Network Map, Try it! You can drag nodes on screen!

### Running the app during development

You can pick one of these options:
* serve this repository with your webserver
* install node.js and run `node web.js`

Then navigate your browser to `http://localhost:<port>/app/index.html` to see the app running in
your browser.


(Since limited time for this project, test will be added later)
### Running unit tests

I will use [jasmine](https://jasmine.github.io/) and
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
      views/            --> angular view partials (partial html templates)
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

    public/                   --> bower lib folder
      components/
        angular               --> Core angular libs
        angular-bootstrap     --> Native AngularJS directives based on Bootstrap's markup and CSS
        angular-facebook      --> Facebook API wrapper
        angular-ui-bootstrap  --> Angular directives specific to Bootstrap
        angular-ui-router     --> Angular states UI-Router
        bootstrap             --> Bootstrap js file for some components
        bootstrap-css         --> css style
        d3                    --> data visualization lib
        jquey                 --> jquery source library
        nvd3                  --> data visualization lib

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

