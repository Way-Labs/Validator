#! /usr/bin/env node

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const handler = require('./router/router')

/* 
    intake:
    1. geth node url
    2. private key
    3. mempool url
*/

yargs(hideBin(process.argv)).command(['start [key]'], 'start the app', (yargs) => {
    //
    return yargs.positional('key', {
        describe: 'file path to private key',
        default: "./id_ed25519",
        type: "string"
    })
}, (argv) => {
    //your code start here:
    console.log("starting app...")
    handler.startHandler(argv)
    //need to determine whether argv is valid or not, and then react
}).command(['keygen'], 'generate key for further encryption', {}, (argv) => {
    //your code start here:
    //generate private key
    console.log(argv)
    handler.genkeyHandler(argv)
}).option('verbose', {
    alias: 'v',
    type: 'string',
    description: 'Run with verbose logging',
    default: true
}).parse()

