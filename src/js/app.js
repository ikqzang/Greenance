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
    $.getJSON('Shop.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var ShopArtifact = data;
      App.contracts.Shop = TruffleContract(ShopArtifact);

      // Set the provider for our contract.
      App.contracts.Shop.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getData();
    });

    return App.bindEvents();
  },
  

    bindEvents: function() {
        $(document).on('click', '#durainbuy', App.buydurian);
        $(document).on('click', '#coconutbuy', App.buycoconut);
        $(document).on('click', '#pomelobuy', App.buypomelo);
        $(document).on('click', '#setstockbutton', App.setstock);      
        $(document).on('click', '#setbalancebutton', App.setbalance); 
    },
  
    buydurian: function() {
      
      
      var fullname = ($('#durianname').val());
      var tel = $('#durianphone').val();
      var location = $('#durianAddress').val();
  
      var account = web3.eth.accounts[0];
      var ShopInstance;

      App.contracts.Shop.deployed().then(function (instance) {     // get GoldWinner
        ShopInstance = instance;

      return ShopInstance.getdurianstock.call();}).then(function (durianstock)
      {
         
          if (durianstock > 0) {
            var ShopInstance;
              
            App.contracts.Shop.deployed().then(function (instance) {     
                ShopInstance = instance;

            return ShopInstance.buyDurian(account,fullname,tel,location,{from: account});
            }).then(function (result)
            {
                
              alert("ซื้อทุเรียนสำเร็จ");
                
            }).catch(function (err) {
                console.log(err.message);
            });

              
            }

          
          else {
            alert("ทุเรียนหมด");
          }
        
        }).catch(function (err) {
          console.log(err.message);
        });
    },

buycoconut: function() {
      
  var fullname = ($('#coconutname').val());
  var tel = $('#coconutphone').val();
  var location = $('#coconutAddress').val();

  var account = web3.eth.accounts[0];
  var ShopInstance;

  App.contracts.Shop.deployed().then(function (instance) {     // get GoldWinner
    ShopInstance = instance;

  return ShopInstance.getcoconutstock.call();}).then(function (coconutstock)
  {
     
      if (coconutstock > 0) {
        var ShopInstance;
          
        App.contracts.Shop.deployed().then(function (instance) {     
            ShopInstance = instance;

        return ShopInstance.buyCoconut(account,fullname,tel,location,{from: account});
        }).then(function (result)
        {
            
          alert("ซื้อมะพร้าวสำเร็จ");
            
        }).catch(function (err) {
            console.log(err.message);
        });

          
        }

      
      else {
        alert("มะพร้าวหมด");
      }
    
    }).catch(function (err) {
      console.log(err.message);
    });
},

buypomelo: function() {
      
  var fullname = ($('#pomeloname').val());
  var tel = $('#pomelophone').val();
  var location = $('#pomeloAddress').val();

  var account = web3.eth.accounts[0];
  var ShopInstance;

  App.contracts.Shop.deployed().then(function (instance) {    
    ShopInstance = instance;

  return ShopInstance.getpomelostock.call();}).then(function (pomelostock)
  {

      if (pomelostock > 0) {
        var ShopInstance;

        App.contracts.Shop.deployed().then(function (instance) {     
            ShopInstance = instance;

        return ShopInstance.buyPomelo(account,fullname,tel,location,{from: account, gas: 100000});
        }).then(function (result)
        {
          alert("ส้มโอสำเร็จ");
            
        }).catch(function (err) {
            console.log(err.message);
        });

          
        }

      
      else {
        alert("ส้มโอหมด");
      }
    
    }).catch(function (err) {
      console.log(err.message);
    });
},
    getData: function() {
            var account = web3.eth.accounts[0];
            var accounts = account.slice(0,6)+'...'+account.slice(-4,account.length); // cut long address to short address
            $('#WalletAddress').text(accounts);

          App.contracts.Shop.deployed().then(function (instance) {     
              ShopInstance = instance;
  
          return ShopInstance.getBalance.call();
          }).then(function (balance)
          {
            
            $('#WalletBalance').text(balance);
            
  
            
          }).catch(function (err) {
              console.log(err.message);
            });

          App.contracts.Shop.deployed().then(function (instance) {     
              ShopInstance = instance;
  
          return ShopInstance.getdurianstock.call();
          }).then(function (durianstock)
          {
            $('#durianstock').text(durianstock);
            
  
            
          }).catch(function (err) {
              console.log(err.message);
            });

          App.contracts.Shop.deployed().then(function (instance) {     
              ShopInstance = instance;
  
          return ShopInstance.getcoconutstock.call();
          }).then(function (durianstock)
          {
            $('#coconutstock').text(durianstock);
            
  
            
          }).catch(function (err) {
              console.log(err.message);
            });

          App.contracts.Shop.deployed().then(function (instance) {    
              ShopInstance = instance;
  
          return ShopInstance.getpomelostock.call();
          }).then(function (durianstock)
          {
            $('#pomelostock').text(durianstock);
            
  
            
          }).catch(function (err) {
              console.log(err.message);
            });
          
    },
    setstock: function() {
      
      var durainstock = ($('#durianset').val());
      var coconutstock = $('#coconutset').val();
      var pomelostock = $('#pomeloset').val();
      alert("การอัพเดท stock จำนวน "+durainstock +' '+ coconutstock+ ' ' +  pomelostock +" การอัพเดทสำเร็จ");
      var account = web3.eth.accounts[0];
      var ShopInstance;
    
      App.contracts.Shop.deployed().then(function (instance) {     
        ShopInstance = instance;

      return ShopInstance.setstock(durainstock,coconutstock,pomelostock,{from: account, gas: 100000});
      }).then(function (result)
      {
      alert("การอัพเดทสำเร็จ");
        
      }).catch(function (err) {
        console.log(err.message);
      });
  
      },
      
          
    setbalance: function() {
      alert("การอัพเดทเริ่มต้น");
      var userbalance = $('#balanceset').val();
      var ShopInstance;
      var account = web3.eth.accounts[0];
      App.contracts.Shop.deployed().then(function (instance) {     
        ShopInstance = instance;

      return ShopInstance.setbalance(account,userbalance,{from: account, gas: 100000});
      }).then(function (result)
      {
        
      alert("การอัพเดทสำเร็จ");
        
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
  