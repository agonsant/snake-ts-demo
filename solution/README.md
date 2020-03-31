# snake-ts-demo
The Snake game using TypeScript

Initial configuration
======
In this introduction we are setting our project and it´s configuration to develop in TypeScript.

### Steps

#### Set up a new npm package with our configuration.
`$ npm init`

#### Install TypeScript library as a develop dependency.
`$ npm install -D typescript`

#### Init our TypeScript application with the default configuration.
`$ tsc --init`

#### Create the *src* folder and our first TS file: *index.ts* with a console hello world.

#### Define the first npm script in the package.json to transpile our ts to js.
`tsc --p tsconfig.json`

#### Define another npm script to launch our local server with http-server.
`npx http-server`

#### Create our view file index.html and show the hello world.