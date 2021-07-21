pragma solidity ^0.5.0;

contract Greenance{

    struct balance {                    
        uint amount;                    
        uint withdraw;
        uint status;         //  รอเอกสาร = 0 , รับเอกสารแล้ว = 1 , ตรวจสอบผ่านแล้ว = 2 , โอนเหรียญให้แล้ว = 3 , ยุติสัญญาแล้ว = 4             
    }
    mapping (address => balance) balanceMap;
    mapping (address => uint) balanceof;
    address[] public userAccts;



    function withDraw(address _wallet,uint _value) public {
        balanceMap[_wallet].amount -= _value;
        balanceMap[_wallet].withdraw += _value;
        balanceof[_wallet] += _value ;            
    }

    function payBack(address _wallet) public {
        balanceMap[_wallet].amount += balanceMap[_wallet].withdraw;
        balanceMap[_wallet].withdraw = 0;
        balanceof[_wallet] -= balanceMap[_wallet].withdraw;
    }

    

    //----------Admin-function----------------------------------

    function setUser(address _wallet) public {
        balanceMap[_wallet].amount = 0;
        balanceMap[_wallet].withdraw = 0;
        balanceMap[_wallet].status = 0;
        balanceof[_wallet] = 0;
        userAccts.push(_wallet) -1;
    }

    function changeStatus(address _wallet,uint _value) public {
        balanceMap[_wallet].status = _value;
    }

    function rejectStatus(address _wallet) public {
        balanceMap[_wallet].status = 0;
    }

    function sendToken(address _wallet,uint _value) public {
        balanceMap[_wallet].status = 3;
        balanceMap[_wallet].amount = _value;
    }

    function closeContract(address _wallet) public {
        balanceMap[_wallet].amount = 0;
        balanceMap[_wallet].withdraw = 0;
        balanceMap[_wallet].status = 4;
    }

    //----------God-function----------------------------------

    function setBalAmount(address _wallet,uint _value) public {
        balanceMap[_wallet].amount = _value;
    }

    function setBalWithdraw(address _wallet,uint _value) public {
        balanceMap[_wallet].withdraw = _value;
    }

    function setBalof(address _wallet,uint _value) public {
        balanceof[_wallet] = _value;
    }
    
    //----------Get-function----------------------------------

    function getbalanceof(address _wallet) public view returns (uint){            
        uint amount = balanceof[_wallet];
        return (amount);                                                              
    }

    function getAmount(address _wallet) public view returns (uint){            
        uint amount = balanceMap[_wallet].amount;
        return (amount);                                                              
    }

    function getWithdraw(address _wallet) public view returns (uint){            
        uint withdraw = balanceMap[_wallet].withdraw;
        return (withdraw);                                                              
    }

    function getstatus(address _wallet) public view returns (uint){            
        uint status = balanceMap[_wallet].status;
        return (status);                                                              
    }
    
    
}