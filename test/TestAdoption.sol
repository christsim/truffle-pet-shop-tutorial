pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
    Adoption adoption = Adoption(DeployedAddresses.Adoption());

    // test hte adopt() function
    function testUserCanAdoptPet() {
        uint returnedId = adoption.adopt(8);

        uint expected = 8;

        Assert.equal(returnedId, expected, "Aption of pet ID 8 should be recorded.");
    }

    // Testing reteival of a single pet's owner
    function testGetAdopterAddressByPetId() {
        // Expected ownder
        address expected = this;

        address adopter = adoption.adopters(8);

        Assert.equal(adopter, expected, "Owner of ped id 8 should be me");
    }

    // get the entire array
    function testGetAdopterAddressByArray() {
        address expected = this;

        address[16] memory adopters = adoption.getAdopters();

        address adopter = adopters[8];

        Assert.equal(adopter, expected, "Owner of ped id 8 should be me");
    }

}