module g_bucks::gatekeeper_helper {

    use sui::ed25519;


    const ADMIN_PUBKEY: vector<u8> = vector[
100,
43,
176,
133,
45,
79,
25,
209,
77,
92,
116,
189,
77,
97,
142,
171,
110,
185,
130,
55,
113,
254,
124,
6,
255,
58,
106,
192,
50,
134,
11,
221


    ];

    const ESignatureNotVerified: u64 = 1001;

    public fun test_function(
        signature: vector<u8>,
        mes: vector<u8>
    ) : bool {

        // Perform the signature verification
        let ver = ed25519::ed25519_verify(&signature, &ADMIN_PUBKEY, &mes);

        // If verification fails, abort with a custom error
        assert!(ver, ESignatureNotVerified);

        // If verification is successful, implicitly return true
        return true
    }
}
