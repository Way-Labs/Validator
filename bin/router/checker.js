//mempool checker
function urlChecker(argv, name) {
    console.log(argv[name])
}

function filePathChecker(argv, name) {
    console.log(argv[name])
}

module.exports = { urlChecker, filePathChecker }