pragma solidity ^0.5.0;

contract Greenance{

    struct balance {
        uint wallet;                    
        uint amount;                    
        uint withdraw;
        uint status;         //  รอเอกสาร = 0 , รอการตรวจสอบ = 1 , ตรวจสอบผ่านแล้ว = 2 , โอนเหรียญให้แล้ว = 3 , ยุติสัญญาแล้ว = 4             
    }
    mapping (address => balance) balanceMap;
    address[] public userAccts;



    function withDraw(address _wallet,uint _value) public {
        balanceMap[_wallet].amount -= _value;
        balanceMap[_wallet].withdraw += _value;
        balanceMap[_wallet].wallet += _value ;            
    }

    function payBack(address _wallet,uint _value) public {
        balanceMap[_wallet].amount += _value;
        balanceMap[_wallet].withdraw -= _value;
        balanceMap[_wallet].wallet -= _value;
    }

    

    //----------Admin-function----------------------------------

    function setUser(address _wallet,uint _value1,uint _value2,uint _value3) public {
        balanceMap[_wallet].amount = _value1;
        balanceMap[_wallet].withdraw = _value2;
        balanceMap[_wallet].status = 0;
        balanceMap[_wallet].wallet = _value3;
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
        balanceMap[_wallet].wallet = _value;
    }
    
    //----------Get-function----------------------------------

    function getBalanceof() public view returns (uint){            
        uint amount = balanceMap[msg.sender].wallet;
        return (amount);                                                              
    }

    function getAmount() public view returns (uint){            
        uint amount = balanceMap[msg.sender].amount;
        return (amount);                                                              
    }

    function getWithdraw() public view returns (uint){            
        uint withdraw = balanceMap[msg.sender].withdraw;
        return (withdraw);                                                              
    }

    function getstatus() public view returns (uint){            
        uint status = balanceMap[msg.sender].status;
        return (status);                                                              
    }
    
    
}