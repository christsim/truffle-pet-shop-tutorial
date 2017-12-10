pragma solidity ^0.4.4; // The minimum version of Solidity required

contract Adoption {

  address[16] public adopters;  // fixed array of 16 ethereum addresses
  // public member variables have automatic getter methods
  // array public variables require and id, so like
  // function getAdopter(index) { return adopters[index];}

  // adopt a pet
  function adopt(uint petId) public returns (uint) {
      require(petId >= 0 && petId <= 15); //we only have 16 pets

      // msg.sender is the senders address (person or smart contract)
      adopters[petId] = msg.sender;    

      return petId;
  }

  //return all the adopters, unlike the auto-magic getter
  function getAdopters() public returns (address[16]) {
    return adopters;
  }

  function disown(uint petId) public returns (uint) {
    require(petId >= 0 && petId <= 15);
    // make sure this owner owns the pet
    require(adopters[petId] == msg.sender);

    adopters[petId] = 0x0;

    return petId;
  }

}