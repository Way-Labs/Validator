//mempool checker
const fs = require('fs')
const path = require('path')
const { generateKeyPair, sign, verify, privateDecrypt, createPrivateKey, createPublicKey, generateKeyPairSync } = require('crypto')
function urlChecker(argv, name) {
    console.log(argv[name])
}
function keyFileExistChecker(filePath) {

    console.log(path.dirname(filePath))
    console.log(path.basename(filePath))
    try {
        if (fs.existsSync(filePath)) {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.error(e)
    }
}
function keyGenerator(filePath) {
    console.log(`generating key in ${filePath}`)
    let dirname = path.dirname(filePath)
    try {
        let { privateKey, publicKey } = generateKeyPairSync('ed25519', {
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: '' //TODO:should ask for passphrase!
            }
        })
        console.log(publicKey)
        console.log(privateKey)
        const storageKeyObject = {
            publicKey: publicKey,
            privateKey: privateKey
        }
        const storageString = JSON.stringify(storageKeyObject)
        //save to filepath
        console.log(storageString)
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname)
        }
        fs.writeFileSync(filePath, storageString)
        let private = createPrivateKey({
            key: privateKey,
            passphrase: '',
            type: 'pkcs8',
            format: 'pem',
        })
        let public = createPublicKey({
            key: publicKey,
            format: 'pem',
            type: 'spki'
        })
        // const data = Buffer.from("i love GeeksForGeeks")
        // console.log(private)
        // const signa = sign(null, data, private)
        // const signature = signa.toString('base64')
        // const sigBuf = Buffer.from(signature, 'base64')
        // console.log(`verification: ${verify(null, data, public, sigBuf)}`)
        return {
            publicKey: public,
            privateKey: private
        }
    } catch (e) {
        console.log(e)
        process.exit(0)
    }


}
function keyRead(filePath) {
    console.log("reading key file")
    let buffer = fs.readFileSync(filePath, 'utf-8')
    let keyObject = JSON.parse(buffer)
    console.log(keyObject)
    //should prompt for passphrase
    let private = createPrivateKey({
        key: keyObject.privateKey,
        passphrase: '',
        type: 'pkcs8',
        format: 'pem',
    })
    let public = createPublicKey({
        key: keyObject.publicKey,
        format: 'pem',
        type: 'spki'
    })
    // const data = Buffer.from("i love GeeksForGeeks")
    // const signa = sign(null, data, private)
    // const signature = signa.toString('base64')
    // const sigBuf = Buffer.from(signature, 'base64')
    // console.log(`verification: ${verify(null, data, public, sigBuf)}`)
    return {
        publicKey: public,
        privateKey: private
    }
}

module.exports = { urlChecker, keyFileExistChecker, keyGenerator, keyRead }