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
    address[] public  whitelistedAddresses = [0xbcd1A6F4C318F848a14AC5BB9566EBb7E3449C8F,
                    0xF3434d417869d8bdBCD0F1338c0e016Cb0c2A613,
                    0x7f5Fe244Aca8c7D52E75a4cBEFF07B615D8D56F4,
                    0xE519Cd89a702f40aC1080310b80CdFED5731D4cB,
                    0xc23c095204dEFE9C00666FfF57d7e5f147F717A5,
                    0x930102aa1bEe35DeED8269f4a9709DfFEB899031,
                    0xDF90468f36ea678A68bd87f049F4713e39D01aCe,
                    0x288324e91415a546F3F7513899E569717901e0D6,
                    0x0b3c74ea8BEe62Aa296F704dE5afe015286fC880,
                    0x9553De363D3b5f50A5C10F3E289b016c7cB77742];
    uint public wIndex;

    uint public serverBalance;

    function() payable external{
        serverBalance += msg.value;
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


    function ip() public {
        balances[address(this)] = serverBalance;
    }

    constructor() public{
        admin = msg.sender;
        IDs[1] = address(this);
    }

    function registerNumber(uint phoneNo) public{
        require(admin==msg.sender);
        IDs[phoneNo] = whitelistedAddresses[wIndex];
        wIndex++;
    }

    function deposit() payable public {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public {
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
