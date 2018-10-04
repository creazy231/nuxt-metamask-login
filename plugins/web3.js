import Web3 from 'web3'

const instance = new Web3(Web3.givenProvider);

if (process.client) {
    window.$web3 = instance;
}

export default instance
