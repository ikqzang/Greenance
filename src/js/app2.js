App = {
    web3Provider: null,
    contracts: {},
  
    init: function() {
      return App.initWeb3();
    },
  
    initWeb3: async function() {
      // Modern dapp browsers...
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        try {
          // Request account access
          await window.ethereum.enable();
        } catch (error) {
          // User denied account access...
          console.error("User denied account access")
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = window.web3.currentProvider;
      }
      // If no injected web3 instance is detected, fall back to Ganache
      else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      web3 = new Web3(App.web3Provider);
  
      
  
      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON('Greenance.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract.
        var GreenanceArtifact = data;
        App.contracts.Greenance = TruffleContract(GreenanceArtifact);
  
        // Set the provider for our contract.
        App.contracts.Greenance.setProvider(App.web3Provider);
  
        // Use our contract to retieve and mark the adopted pets.
        return App.getData();
      });
  
      return App.bindEvents();
    },
    
  
    bindEvents: function() {
      $(document).on('click', '#withdraw', App.withdraw);
      $(document).on('click', '#payback', App.payback);
      $(document).on('click', '#setWallet', App.setWallet);
      
  },
      
    
      setWallet: function() {      
        alert("เปลี่ยนเงินในบัญชีสำเร็จ");
        var account = web3.eth.accounts[0];
        var GreenanceInstance;
              App.contracts.Greenance.deployed().then(function (instance) {     
                  GreenanceInstance = instance;
              return GreenanceInstance.setUser(account,{from: account});
              }).then(function (result)
              {
                  
                alert("เปิดบัญชีสำเร็จ");
                  
              }).catch(function (err) {
                  console.log(err.message);
              });
  
      },
  
      withdraw: function() {      
        alert("การถอนเหรียญสำเร็จ");
        var account = web3.eth.accounts[0];
        var value = $('#withdrawval').val();
        var GreenanceInstance;
              App.contracts.Greenance.deployed().then(function (instance) {     
                  GreenanceInstance = instance;
              return GreenanceInstance.withDraw(account,value,{from: account});
              }).then(function (result)
              {
                  
                alert("การถอนเหรียญสำเร็จ");
                  
              }).catch(function (err) {
                  console.log(err.message);
              });
  
      },
  
      payback: function() {      
        alert("การคืนเหรียญสำเร็จ");
        var account = web3.eth.accounts[0];
        var value = $('#paybackval').val();
        var GreenanceInstance;
              App.contracts.Greenance.deployed().then(function (instance) {     
                  GreenanceInstance = instance;
              return GreenanceInstance.payBack(account,value,{from: account});
              }).then(function (result)
              {
                  
                alert("การคืนเหรียญสำเร็จ");
                  
              }).catch(function (err) {
                  console.log(err.message);
              });
  
      },
  
      getData: function() {
              var account = web3.eth.accounts[0];
              var accounts = account.slice(0,6)+'...'+account.slice(-4,account.length); // cut long address to short address
              $('#WalletAddress').text(accounts);
              $('#WalletAddress2').text(accounts);
              $('#WalletAddress3').text(accounts);
  
              var GreenanceInstance;
                
              App.contracts.Greenance.deployed().then(function (instance) {     
                  GreenanceInstance = instance;
  
              return GreenanceInstance.getBalanceof.call();
              }).then(function (balance)
              {
                  
              $('#WalletBalance').text(balance);
              $('#WalletBalance2').text(balance);
              $('#WalletBalance3').text(balance);
                  
              }).catch(function (err) {
                  console.log(err.message);
              });
            
  
              App.contracts.Greenance.deployed().then(function (instance) {     
                GreenanceInstance = instance;
  
            return GreenanceInstance.getAmount.call();
            }).then(function (balance)
            {  
            $('#Wallet2').text(balance);
                
            }).catch(function (err) {
                console.log(err.message);
            });
  
            App.contracts.Greenance.deployed().then(function (instance) {     
              GreenanceInstance = instance;
  
            return GreenanceInstance.getWithdraw.call();
            }).then(function (balance)
            {  
            $('#Wallet3').text(balance);
              
            }).catch(function (err) {
                console.log(err.message);
            });
  
            App.contracts.Greenance.deployed().then(function (instance) {     
              GreenanceInstance = instance;
  
            return GreenanceInstance.getstatus.call();
            }).then(function (status)
            {  
            if(status==0){
              $('#status').text("รอเอกสาร");
            }
            if(status==1){
              $('#status').text("รอการตรวจสอบ");
            }
            if(status==2){
              $('#status').text("ตรวจสอบผ่านแล้ว");
            }
            if(status==3){
              $('#status').text("การโอนเหรียญสำเร็จแล้ว");
            }
            if(status==4){
              $('#status').text("ยุติสัญญาแล้ว");
            }
  
              
            }).catch(function (err) {
                console.log(err.message);
            });
      }
      
    
  };
  
    $(function() {
      $(window).load(function() {
        App.init();
      });
    });
    