import axios from 'axios';

export default function ({ route, store, redirect }) {

    const noAuth = route.fullPath === '/login';
    if (noAuth) return;

    // If the user is not authenticated
    if (!store.state.account.auth || !store.state.account.auth.signature || !store.state.account.auth.address) {
        store.state.account.signedIn = false;
        return redirect('/login');
    } else {
        axios.get(`/api/users/${store.state.account.auth.address}/${store.state.account.auth.signature}`).then((res) => {
            store.state.account.signedIn = res.data.success;
            if (!res.data.success) {
                return redirect('/login');
            }
        });
    }
}