# Frontsteps

Bootstrap 5 theme for Frontsteps

## Requirements

* Node >=16.14.0 (see `package.json`)
  * Install NVM using Homebrew with `brew install nvm`
  * Install using NVM with `nvm install && nvm use`
* Yarn >= 1.16.0 (see `package.json`)
  * Install using Homebrew with `brew install yarn`

## Usage

* Install via npm with `npm i @dfreerksen/frontsteps` or via yarn with `yarn add @dfreerksen/frontsteps`
* Include assets
  * Non-min: `@dfreerksen/frontsteps/dist/js/frontsteps` and `@dfreerksen/frontsteps/dist/css/frontsteps`
  * Min: `@dfreerksen/frontsteps/dist/js/frontsteps.min` and `@dfreerksen/frontsteps/dist/css/frontsteps.min`

## Developer

### Getting Started

* Install dependencies with `yarn`

#### Scripts

* `yarn run build` builds the project - this builds assets, HTML, JS, and CSS into `dist`
* `yarn run build:assets` copies the files in the `src/assets/` directory into `dist`
* `yarn run build:pug` compiles the Pug located in the `src/pug/` directory into `dist`
* `yarn run build:scripts` compiles the Javascript files located in the `src/js/` directory into `dist`
* `yarn run build:scss` compiles the SCSS files located in the `src/scss/` directory into `dist`
* `yarn run clean` deletes the `dist` directory to prepare for rebuilding the project
* `yarn run start:debug` runs the project in debug mode
* `yarn start` or `yarn run start` runs the project, launches a live preview in your default browser, and watches for changes made to files in `src`

## Linting

Several tools are used to ensure code is styled, linted and formatted correctly.

### ESLint

[ESLint](https://github.com/eslint/eslint) is for Javascript linting. ESLint is installed with Yarn.

Manually run ESLint for the repo

```
$ yarn run eslint .
```

### Stylelint

[Stylelint](https://github.com/stylelint/stylelint) is for SASS and SCSS linting. Stylelint is installed with Yarn.

Manually run Stylelint for the repo

```
$ yarn run stylelint "**/*.scss"
```

### pug-lint

[pug-lint](https://github.com/pugjs/pug-lint) is a linter and style checker for Pug. pug-lint is installed with Yarn.

Manually run pug-lint for the repo

```
$ yarn run pug-lint ./src/pug/
```

## Publishing

Publish a new version

1. Note all changes in `CHANGELOG.md`
2. Change version in `package.json`
3. Make sure the version change gets added to the compiled asset files with `yarn run build`
4. Dry run to see the content changes `npm publish --dry-run`
5. Publish new version to NPM with `npm publish`
