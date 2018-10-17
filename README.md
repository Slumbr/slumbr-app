# WIP

Slumbr is under development, check back soon

# Slumbr

Slumbr is a sleep health app that is open-source.

This README is intended for people who are building Slumbr, regular users should go to [slumbr.io]

## Setup

* Install node and yarn
* Install git-crypt for secrets management
* Clone this repo
```bash
cd slumbr-app
yarn install
yarn start
```

This will run expo, please follow the instructions to run the app

## Coding style

This repo uses Prettier to enforce an aesthetic style. It is *highly* recommended to set up your IDE to run Prettier on save.

It also uses eslint to enforce other aspects of style. This is consistent with Prettier but also adds some rules from Airbnb style, and some additional tweaks.

Beyond this try to use a FRP style as much as is possible. Redux actions should all be past tense and redux selectors should all be of the form `selectX`.