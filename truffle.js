module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*" // match any network
    },
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*"
    }
    // live: {
    //   host: "178.25.19.88", // Random IP for example purposes (do not use)
    //   port: 80,
    //   network_id: 1,        // Ethereum public network
    //   // optional config values:
    //   // gas
    //   // gasPrice
    //   // from - default address to use for any transaction Truffle makes during migrations
    //   // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
    //   //          - if specified, host and port are ignored.
    // }
  }
};
