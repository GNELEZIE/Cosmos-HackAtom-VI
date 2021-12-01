require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0xDf4fde84fD5Bb673bf603484122c48D5Bba866a7"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}



/**
 * 1- upload file on ipfs (create interface to upload nft file)
 * 2- format the json with metadata and upload it (create an interface to get the meta data, name, description , caracteristics ...)
 * Example of metadata : {
    "attributes": [
      {
        "trait_type": "Breed",
        "value": "Maltipoo"
      },
      {
        "trait_type": "Eye color",
        "value": "white"
      }
    ],
    "description": "Project Advisor.",
    "image": "https://gateway.pinata.cloud/ipfs/Qmd7CNk1FEHitdtyiejhDNTDFZRM25uRP6aCfhkrYh5tce",
    "name": "DNP3"
  }
 * 3- use the url got in second step and mintNFT with it 
 */

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmVYpAYo928MTxdYKpd5naXPub7sL8oGcK9AgLfFSjSCBX"
)
