var myContract ;
var isloading = false
var tokenAdress = null
var accounts = [];

$(document).ready(async function () {


  //OBENTIR LES COMPTES DU WALLET DE L'UTILISATEUR
  async function _getAccounts() {
    try {
      const _result = ethereum.request({ method: 'eth_requestAccounts' });
      console.log(_result);
      const _accounts = await web3.eth.getAccounts()

      for (const account of _accounts) {
        const balanceWei = await web3.eth.getBalance(account)
        const balance = web3.utils.fromWei(balanceWei)
        accounts.push({
          account,
          balance,
        });
      }

      $("#_adress").text( accounts[0].account + " - ::::: - " +  accounts[0].balance + " eth") ;
      return { error: false, account: accounts[0].account, balance: accounts[0].balance }
    } catch (error) {
      // User denied account access...
      console.log('error getAccounts')
      console.log(error)
      return { error: true, error: error }
    }
  }

  // CHECKER SI METAMASK EST BIEN INTSALLER 

  async function CheckMetamaskConnection() {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      try {
        // Request account access if needed
        // await ethereum.enable(); //depreciated
        // Acccounts now exposed
        return true
      } catch (error) {
        // User denied account access...
        return false
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
      getAccounts();
      // Acccounts always exposed
      return true
    }
    // Non-dapp browsers...
    else {
      // console.log('not found CheckMetamaskConnection')
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
      return false
    }
  }


  // INTERCONNEXION A NOTRE SMART CONTRACT
  async function connectSmartContract() {

    var IsMetamask = await CheckMetamaskConnection();

    if (IsMetamask) {
      try {
        myContract = await new web3.eth.Contract(
          TokenABI,
          TokenADRESSE,
          {
            data: ByteCODE, //optional
          },
        );

        //----------ECOUTE DES EVENEMENTS ----------------
        await myContract.events
        .Transfer(async function (err, event) {
          //des actions
          if(err){
            alert(err)
          }

          $('#transfert').attr('disabled', false);
          $('#receiver').val('');
          $('#tokens').val('')
          alert("transferer avec succès");
          console.log(event)
        });


        await myContract.events
        .Burn(async function (err, event) {
          //des actions
          if(err){
            alert(err)
          }
          console(event)
        });

      } catch (error) {
        // console.log(error);
        console.log("Une erreur est advenue");
        return;
      }
    }else {
      console.log("Vous devez installer metamask")
    }
  }

  // BOUTON DE CONNEXION AU COMPTE
    $(document).ready(function() {
        var result =  _getAccounts()
        console.log(result)
        if (result.error) {
            $('#btn_connect').show();
            alert("Une erreur est survenue au moment de l'obtention des infos de votre compte !",);
            return
        }

    //   evmos-testnet: {
    //   provider: () => new HDWalletProvider(mnemonic, 'http://arsiamons.rpc.evmos.org:8545'),
    //   network_id: 9000,
    // }
    });

    

   connectSmartContract();
});



