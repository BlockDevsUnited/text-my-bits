pragma solidity 0.5.11;

contract SMSUpgrade{

    address payable public admin;

    mapping(uint => address) public IDs;
    mapping(address=>uint) public balances;
    mapping(bytes32=>Transaction) public Transactions;
    mapping(bytes32=>bool) Redeemed;
    event Transfer(address to, address from, uint256 Amount);

    struct Transaction{
        uint value;
        uint sender;
    }


    uint public serverBalance;

    function() payable external{
        serverBalance += msg.value;
        balances[address(this)] = serverBalance;
    }

    function createOTPHash(bytes32 p,uint _value,uint sender) public {
        Transactions[p]=Transaction(_value,sender);
    }

    function ValidateOTP(string memory s,uint _to) public{
        bytes32 p=keccak256(abi.encode(s));
        require(Redeemed[p]==false);
        Transaction memory T=Transactions[p];
        transfer( T.sender,_to,T.value);
        Redeemed[p]=true;
    }

    function OTPValid(string memory s) public view returns(bool){
        bytes32 p=keccak256(abi.encode(s));
        if(Transactions[p].value>0){
            return true;
        }
    }



    function getHash(string memory s) public pure returns (bytes32){
        return keccak256(abi.encode(s));
    }


    constructor() public{
        admin = msg.sender;
        IDs[1] = address(this);
    }

    function registerNumber(uint phoneNo, address _address) public{
        require(admin==msg.sender);
        IDs[phoneNo] = _address;
    }

    function deposit() payable public {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender]>=amount);
        balances[msg.sender] -= amount;
        msg.sender.transfer(amount);
    }

    function transfer(uint __from, uint __to, uint256 amount) public{
        address _from = IDs[__from];
        address _to = IDs[__to];
        require(msg.sender==admin);
        require(balances[_from]>=amount);
        //require(_from!=address(0));

        // if(_to==address(0)){
        //     registerNumber(__to,getW());

        //     wIndex++;
        // }

        balances[_to]+=amount;
        balances[_from]-=amount;
        emit Transfer(_to,_from,amount);
    }

    function getAddress(uint phoneNo) public view returns(address){
        return(IDs[phoneNo]);
    }

    function getBalance(uint phoneNo) public view returns(uint){
        address _address = IDs[phoneNo];
        return(balances[_address]);

    }


    function balanceOf(address account) public view returns(uint){
        return(balances[account]);
    }
}
