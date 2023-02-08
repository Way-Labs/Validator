const { urlChecker } = require("./checker")

function startHandler(argv) {
    console.log('hello world')
    //first check argument
    urlChecker(argv, 'key')
}

function genkeyHandler(argv) {

}

module.exports = { startHandler, genkeyHandler }