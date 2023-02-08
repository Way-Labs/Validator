const { keyFileExistChecker, keyGenerator, keyRead } = require("./checker")
const path = require('path')
const os = require('os')

const KEY_PATH = path.join(os.homedir(), '.way/key-pair')
let keypair = {}
function startHandler({ network, mempool, geth }) {
    //console.log('hello world')
    //initializing...
    //working directory ~/.way/private-key.

    if (!keyFileExistChecker(KEY_PATH)) {
        //generate key
        keypair = keyGenerator(KEY_PATH)
    } else {
        //read from file.
        keypair = keyRead(KEY_PATH)
    }
    console.log('router!s', keypair)
    //now check the url and then subscribe to header

    console.log(mempool)
    console.log(geth)
    console.log(network)

}



module.exports = { startHandler }