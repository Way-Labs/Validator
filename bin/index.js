#! /usr/bin/env node

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const handler = require('./router/router')

/* 
    intake:
    1. geth node url
    2. private key use our own format.
    3. mempool url
*/

yargs(hideBin(process.argv)).command(['start [key]'], 'start the app', {
}, (argv) => {
    //your code start here:
    console.log("starting app...")
    handler.startHandler(argv)
    //need to determine whether argv is valid or not, and then react
}).option('mempool', {
    alias: 'm',
    type: 'string',
    description: 'url of mempool',
    default: 'http://127.0.0.1:10001' //our custom message decryptor! use api server?
}).option('geth', {
    alias: 'g',
    type: 'string',
    description: 'hook geth node json-rpc url',
    default: 'https://api.mycryptoapi.com/eth' //
}).option('network', { //decide which json-rpc package to use to subscribe block header
    alias: 'n',
    type: 'string',
    description: 'network name for block header validation',
    default: 'ethereum'
}).option('verbose', {
    alias: 'v',
    type: 'string',
    description: 'Run with verbose logging',
    default: true
}).parse()

