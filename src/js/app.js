App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    // Load pets.
    $.getJSON('../pets.json', (data) => {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        petTemplate.find('.btn-disown').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function () {
    // check for web3 that has been injected already
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // don't do this kak in prod
      // If no injected web3 instace is detected, fallback to the testrpc
      App.web3Providers.HttpProvider('http://localhost:7545'); // Ganache
      //      App.web3Providers.HttpProvider('http://localhost:8545');  // Truffle
    }

    return App.initContract();
  },

  // Artifacts - info about our contract
  //   ABI - application binary interface.
  //    functions and variables to interact with our contract

  initContract: function () {
    $.getJSON('Adoption.json', (data) => {
      // Get the necessary contract artifact file
      //  and instantiate it with the truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', '.btn-disown', App.handleDisown);
  },

  markAdopted: async(adopters, account) => {
    try {
      var adoptionInstance = await App.contracts.Adoption.deployed();

      var adopters = await adoptionInstance.getAdopters.call();

      for (i = 0; i < adopters.length; i++) {
        // arrays are initialized with 0x0 not null in solidity
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet')
            .eq(i)
            .find('button.btn-adopt')
            .text('Owned')
            .attr('disabled', true);
        } else {
          $('.panel-pet')
            .eq(i)
            .find('button.btn-disown')
            .text('Not owned')
            .attr('disabled', true);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    web3.eth.getAccounts(async(error, accounts) => {
      if (error) {
        console.log(error);
        throw error;
      }

      var account = accounts[0];

      try {
        var instance = await App.contracts.Adoption.deployed();
        // execute adopt as a transaction by sending account
        var result = await instance.adopt(petId, {
          from: account
        });

        return await App.markAdopted();
      } catch (err) {
        console.log(err.message);
      }
    });
  },

  handleDisown: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    web3.eth.getAccounts(async(error, accounts) => {
      if (error) {
        console.log(error);
        throw error;
      }

      var account = accounts[0];

      try {
        var instance = await App.contracts.Adoption.deployed();
        // execute adopt as a transaction by sending account
        var result = await instance.disown(petId, {
          from: account
        });

        return await App.markAdopted();
      } catch (err) {
        console.log(err.message);
      }
    });
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});