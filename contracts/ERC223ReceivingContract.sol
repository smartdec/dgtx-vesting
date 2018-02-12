pragma solidity 0.4.19;


/// @title Interface for the contract that will work with ERC223 tokens.
interface ERC223ReceivingContract { 
    /**
     * @dev Standard ERC223 function that will handle incoming token transfers.
     *
     * @param _from  Token sender address.
     * @param _value Amount of tokens.
     * @param _data  Transaction data.
     */
    function tokenFallback(address _from, uint _value, bytes _data) public;
}
