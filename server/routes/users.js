import { Router } from 'express';

const router = Router();

// personal dependencies
import ethUtil from 'ethereumjs-util';

/* Helpers */
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let users = {};

router.get("/users/:address", (req, res) => {
    if (req.params.address) {
        if (!users[req.params.address]) {
            users[req.params.address] = {
                address: req.params.address,
                nonce: rnd(100000, 999999)
            };
            res.json(users[req.params.address]);
        } else {
            res.json(users[req.params.address]);
        }
    } else {
        res.json({success: false});
    }
});

router.get("/users/:address/:signature", (req, res) => {
    if (req.params.address && req.params.signature) {
        if (users[req.params.address]) {

            const msg = `Login with nonce: ${users[req.params.address].nonce}`;
            const msgBuffer = ethUtil.toBuffer(msg);
            const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
            const signatureBuffer = ethUtil.toBuffer(req.params.signature);
            const signatureParams = ethUtil.fromRpcSig(signatureBuffer);

            const publicKey = ethUtil.ecrecover(
                msgHash,
                signatureParams.v,
                signatureParams.r,
                signatureParams.s
            );

            const addressBuffer = ethUtil.publicToAddress(publicKey);
            const address = ethUtil.bufferToHex(addressBuffer);

            if (address.toLowerCase() === req.params.address.toLowerCase()) {
                return res.json({ success: true });
            } else {
                return res.json({ success: false, error: 'Signature verification failed' });
            }
        } else {
            res.json({success: false, error: 'No address given'});
        }
    } else {
        res.json({success: false, error: 'No address or signature given'});
    }
});

router.get("/users/", (req, res) => {
    res.json({success: true, users: users});
});

router.get("/ethUtil/", (req, res) => {
    res.json(JSON.stringify(ethUtil));
});

export default router;