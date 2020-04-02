# snake-ts-demo
The Snake game using TypeScript

Initial configuration
======
In this introduction we are setting our project and it´s configuration to develop in TypeScript.

### Steps Exercise 1: Project Creation

1. Set up a new npm package with our configuration.
`$ npm init`

2. Install TypeScript library as a develop dependency.
`$ npm install -D typescript`

3. Init our TypeScript application with the default configuration.
`$ tsc --init`

4. Create the *src* folder and our first TS file: *index.ts* with a console hello world.

5. Define the first npm script in the package.json to transpile our ts to js.
`tsc --p tsconfig.json`

6. Define another npm script to launch our local server with http-server using utility npx.
`npx http-server`

7. Create our view file index.html and show the hello world.