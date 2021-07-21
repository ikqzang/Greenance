pragma solidity >=0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Greenance.sol";

contract TestGreenance {
  Greenance green = Greenance(DeployedAddresses.Greenance());
  address user = 0x466c7De6860787F5FD8E37FB667918077F46eA0c;
  bool expectfalse = false;
  bool expecttrue = true;


  function testGetAmount() public {
    green.setUser(user);
    uint returnamount = green.getAmount(user);
    uint returnwithdraw = green.getWithdraw(user); 
    Assert.equal(returnamount,0 , "not equal" );  
    Assert.equal(returnwithdraw,0 , "not equal");
  } 

  function testGetStatus() public {
    green.setUser(user);
    uint returnstatus = green.getstatus(user); 
    Assert.equal(returnstatus,0 , "not false" );  
  }

  function testChangeStatus() public {
    green.changeStatus(user,1);
    uint returnstatus = green.getstatus(user); 
    Assert.equal(returnstatus,1 , "not false" );  
  }

  function testWithDraw() public {
    green.sendToken(user,50000); 
    green.withDraw(user,10000); 
    uint returnamount = green.getAmount(user);
    uint returnwithdraw = green.getWithdraw(user);
    Assert.equal(returnamount,40000 , "not equal" );
    Assert.equal(returnwithdraw,10000 , "not equal" );  
  }

  function testPayBack() public {
    green.payBack(user); 
    uint returnamount = green.getAmount(user);
    uint returnwithdraw = green.getWithdraw(user);
    Assert.equal(returnamount,50000 , "not equal" );
    Assert.equal(returnwithdraw,0 , "not equal" );  
  }

  function testCloseContract() public {
    green.closeContract(user); 
    uint returnamount = green.getAmount(user);
    uint returnwithdraw = green.getWithdraw(user);
    uint returnstatus = green.getstatus(user); 
    Assert.equal(returnamount,0 , "not equal" );
    Assert.equal(returnwithdraw,0 , "not equal" );
    Assert.equal(returnstatus,4 , "not equal" );  

  }
}