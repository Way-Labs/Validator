//for compatibility of different library like cosmos or ethersjs

//should return an interface where we could subscribe data
function initial(network) {
    //
    if (network == 'ethereum') {
        return evmInit()
    }

}

function evmInit() {
    let res = {

    }
    res.subscribe = function (url, network, callback) {

    }
}