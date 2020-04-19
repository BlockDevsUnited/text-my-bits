pragma solidity 0.5.11;
//renaming
//RNS
    //RNS registration
    //
//Online registration
    //Without phoneNumber
    //With PhoneNumber
//SENDING BTC
    //transfer function


contract TextMyBits{

    address payable public admin;

    mapping(bytes32=>uint) public balances;
    mapping(address=>bytes32) public phoneNumbers;

    mapping(bytes32=>Transaction) public Transactions;
    mapping(bytes32=>bool) Redeemed;
    event Transfer(bytes32 to, bytes32 from, uint256 Amount);

    function register(bytes32 phoneNoHash, address _address) public {
        require(msg.sender == admin);
        phoneNumbers[_address] = phoneNoHash;
    }

    struct Transaction{
        uint value;
        bytes32 sender;
    }

    function createOTPHash(bytes32 p,uint _value,bytes32 sender) public {
        Transactions[p]=Transaction(_value,sender);
    }

    function ValidateOTP(string memory s,bytes32 _to) public{
        bytes32 p=keccak256(abi.encode(s));
        require(Redeemed[p]==false);
        Transaction memory T=Transactions[p];
        transferBalance( T.sender,_to,T.value);
        Redeemed[p]=true;
    }


    function getHash(string memory s) public pure returns (bytes32){
        return keccak256(abi.encode(s));
    }

    constructor() public{
        admin = msg.sender;
    }

    // function registerNumber(bytes32 phoneNoHash, address _address) public{
    //     require(admin==msg.sender);
    //     IDs[phoneNoHash] = _address;
    // }

    function deposit() payable public {
        balances[phoneNumbers[msg.sender]] += msg.value;
    }

    function withdraw(uint amount) public {
        require(balances[phoneNumbers[msg.sender]]>=amount);
        balances[phoneNumbers[msg.sender]] -= amount;
        msg.sender.transfer(amount);
    }

    function transferBalance(bytes32 _from, bytes32 _to, uint256 amount) public{

        require(msg.sender==admin||msg.sender==address(this));
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

    function getBalance(address _address) public view returns(uint){

        return(balances[phoneNumbers[_address]]);
    }
}
