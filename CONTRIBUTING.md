# Contributing to FriendsDoc

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to FriendsDoc and its packages, which are hosted in the [Atom Organization](https://github.com/Jeffwan/friendsDoc/) on GitHub.
These are just guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.



## Group members and Responsibility
This project was a course project for Social Computing in Information Science School of University of Pittsburgh. We open source this project to attract people who's interest in this project to contribute your code.

Thanks for the original Team.

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


[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [JavaScript Styleguide](#javascript-styleguide)
  * [Documentation Styleguide](#documentation-styleguide)


  ## Styleguides

  ### Git Commit Messages

  * Use the present tense ("Add feature" not "Added feature")
  * Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
  * Limit the first line to 72 characters or less
  * Reference issues and pull requests liberally
  * When only changing documentation, include `[ci skip]` in the commit description

  ### JavaScript Styleguide

  All JavaScript must adhere to [JavaScript Standard Style](http://standardjs.com/).

  * Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
  * Inline `export`s with expressions whenever possible
    ```js
    // Use this:
    export default class ClassName {

    }

    // Instead of:
    class ClassName {

    }
    export default ClassName
    ```

  ### Documentation Styleguide

  * Use [Markdown](https://daringfireball.net/projects/markdown).
  * Reference methods and classes in markdown with the custom `{}` notation:
      * Reference classes with `{ClassName}`
      * Reference instance methods with `{ClassName::methodName}`
      * Reference class methods with `{ClassName.methodName}`

  #### Example

  ```coffee
  # Public: Disable the package with the given name.
  #
  # * `name`    The {String} name of the package to disable.
  # * `options` (optional) The {Object} with disable options (default: {}):
  #   * `trackTime`     A {Boolean}, `true` to track the amount of time taken.
  #   * `ignoreErrors`  A {Boolean}, `true` to catch and ignore errors thrown.
  # * `callback` The {Function} to call after the package has been disabled.
  #
  # Returns `undefined`.
  disablePackage: (name, options, callback) ->
  ```
