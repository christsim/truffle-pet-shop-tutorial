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

        Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
    }

    // Testing reteival of a single pet's owner
    function testGetAdopterAddressByPetId() {
        // Expected owner
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

    // test can disown pet
    function testCanDisownPet() {
        address me = this;

        uint adoptedId = adoption.adopt(3);

        address adopter = adoption.adopters(3);
        Assert.equal(adopter, me, "Owner of ped id 3 should be me");

        uint disownedId = adoption.disown(3);
        Assert.equal(adoptedId, disownedId, "Disowned pet of Id 3 should be recorded");

        address adopterAfter = adoption.adopters(3);
        Assert.notEqual(adopterAfter, me, "Owner of ped id 3 should not be me");
    }
}