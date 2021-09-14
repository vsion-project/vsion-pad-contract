// SPDX-License-Identifier: MIT
// Develop by Tesorerol

pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract Distrubtion{
    
    IERC20 public criptovision;
    IERC20 public tokenSell;
    address public owner;
    uint public percent;
    bool public lock;
    address internal WalletRecive;
    constructor(address _token1,address _walletRecive,uint _percent) {
        WalletRecive = _walletRecive;
        percent=_percent;
        criptovision = IERC20(_token1);
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not Owner");
            _;
    }
    
    modifier lockContract() {
        require(lock == false, "contract Lock");
            _;
    }
     
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        owner = newOwner;
    }
     
     
    function SafeTransfer(uint _amount) lockContract public{
            _SafeTransfer(msg.sender,_amount);
            
    }
         
    function _SafeTransfer(address sender,uint amount) private {
        require(criptovision.balanceOf(address(this))>=amount,"Balance Too Low");
        uint256 tax = ((uint(amount) / uint(100)) * uint(percent));
        uint256 newAmount = amount - tax;
        criptovision.transfer(WalletRecive,tax);
        bool sent = criptovision.transfer(sender,newAmount);
        require(sent,"Token transfer Failed");
    }
    
    function CerrarDistribucion() onlyOwner public { 
        criptovision.transfer(WalletRecive,criptovision.balanceOf(address(this)));
    }
    
    function ChangePercent(uint _percent) onlyOwner public { 
        percent=_percent;
    }
    
    function LockContract(bool _lock) onlyOwner public { 
        lock=_lock;
    }
    
   /* function getTaxt(uint amount) view public returns(uint) { 
        uint256 tax =((uint(amount) / uint(100)) * uint(percent));
        return tax;
    }
    
     function getAmount(uint amount) view public returns(uint) { 
        uint256 tax = ((uint(amount) / uint(100)) * uint(percent));
        uint256 newAmount = amount - tax;
        return newAmount;
    }*/
    

}