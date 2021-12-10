var myContract;
var isloading = false;
var tokenAdress = null;
var accounts = [];

var tokenADRESSE = "0x4c35500325bC35c04116Daa8F8C889F2d43e8CBB";

var tokenABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mintNFT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

$(document).ready(async function () {
  //OBENTIR LES COMPTES DU WALLET DE L'UTILISATEUR
  async function _getAccounts() {
    try {
      const _result = ethereum.request({ method: "eth_requestAccounts" });
      console.log(_result);
      const _accounts = await web3.eth.getAccounts();

      for (const account of _accounts) {
        const balanceWei = await web3.eth.getBalance(account);
        const balance = web3.utils.fromWei(balanceWei);
        accounts.push({
          account,
          balance,
        });
      }

      console.log(accounts);
      $("._adress").text(accounts[0].account);
      $(".cryptoLink").text(accounts[0].account);

      let accountInfo = accounts[0].balance
        ? Number(accounts[0].balance).toFixed(2) + " photon"
        : 0 + " photon";

      $("#_account").text(accountInfo);
      $("._account").text(accountInfo);

      return {
        error: false,
        account: accounts[0].account,
        balance: accounts[0].balance,
      };
    } catch (error) {
      // User denied account access...
      console.log("error getAccounts");
      console.log(error);
      return { error: true, error: error };
    }
  }

  // CHECKER SI METAMASK EST BIEN INTSALLER

  async function CheckMetamaskConnection() {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        // await ethereum.enable(); //depreciated
        // Acccounts now exposed
        return true;
      } catch (error) {
        // User denied account access...
        return false;
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      getAccounts();
      // Acccounts always exposed
      return true;
    }
    // Non-dapp browsers...
    else {
      // console.log('not found CheckMetamaskConnection')
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return false;
    }
  }

  // INTERCONNEXION A NOTRE SMART CONTRACT
  async function connectSmartContract() {
    var IsMetamask = await CheckMetamaskConnection();

    // console.log(CheckMetamaskConnection);

    if (IsMetamask) {
      try {
        // _getAccounts();
        myContract = await new web3.eth.Contract(tokenABI, tokenADRESSE);

        console.log(myContract);
      } catch (error) {
        console.log(error);
        console.log("Une erreur est advenue");
        return;
      }
    } else {
      console.log("Vous devez installer metamask");
    }
  }

  $(".connectWallet").on("click", (e) => {
    e.preventDefault();
    _getAccounts();
  });

  $("#connect").on("click", (e) => {
    e.preventDefault();
    _getAccounts();
  });

  connectSmartContract();

  function connectWallet() {
    _getAccounts();
  }

  $("#create_item").on("click", function (e){
	_getAccounts();
    e.preventDefault;
    console.log("je marche");
    console.log(myContract.methods);
	response = myContract.methods.mintNFT("0x40b43d492bed2Fa90B30CA1618530c1a6b7601C7", "https://ipfs.io/QmTi18dLKUWXYZCCNaJobpMC5QCdfM6HFiUQQ8dQAQpiFN/ipfs/QmTi18dLKUWXYZCCNaJobpMC5QCdfM6HFiUQQ8dQAQpiFN?filename=europeana-rMV45VgcRbQ-unsplash.jpg").send({from: '0x40b43d492bed2Fa90B30CA1618530c1a6b7601C7'})
	console.log(response);
	
	window.location.replace("/")
  });
});
