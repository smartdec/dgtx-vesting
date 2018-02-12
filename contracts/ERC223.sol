pragma solidity 0.4.19;


/// @title ERC223 interface
interface ERC223 {

    function totalSupply() public view returns (uint);
    function name() public view returns (string);
    function symbol() public view returns (string);
    function decimals() public view returns (uint8);
    function balanceOf(address _owner) public view returns (uint);
    function transfer(address _to, uint _value) public returns (bool);
    function transfer(address _to, uint _value, bytes _data) public returns (bool);

    event Transfer(address indexed _from, address indexed _to, uint indexed _value, bytes _data);
}
