import web3 from '../plugins/web3';
const cookieparser = process.server ? require('cookieparser') : undefined;

export const strict = false;

export const plugins = [];

export const state = () => ({

    account: {
        signedIn: false,
        address: null,
        nonce: null,
        signature: null,
        nickname: null,
    }
});

export const mutations = {
    toggleSidebar(state) {
        state.sidebar = !state.sidebar;
    },
    web3(state, value) {
        state.web3 = value;
    },
    setAccount(state, value) {
        state.account.address = value;
    },
    setAuth(state, value) {
        state.auth = value;
    },
};

export const actions = {
    nuxtServerInit({commit}, {req}) {
        let auth = null;
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            try {
                auth = JSON.parse(parsed.auth);
            } catch (err) {
                // No valid cookie found
            }
        }
        this.state.account.auth = auth;
    }
};

export const getters = {};
