const { randomBytes } = require('crypto');
const ed25519 = require('ed25519');

// Generate a random 32-byte seed for the keypair
const seed = randomBytes(32); // 32 bytes for Ed25519 keypair

// Generate the keypair
const keyPair = ed25519.MakeKeypair(seed);

// Get the public key as a Buffer and convert it to an array of integers (u8)
const publicKey = keyPair.publicKey;
const privateKey = keyPair.privateKey;

// Convert the keys to vectors (arrays of integers)
const publicKeyArray = Array.from(publicKey);
const privateKeyArray = Array.from(privateKey);

// Generate a message (can be any string or data you want to sign)
const message = 'Hello, this is a test message!';
const messageArray = Array.from(Buffer.from(message, 'utf-8')); // Convert the message to a vector<u8>

// Output the public key, private key, and message in the desired format
console.log('const ADMIN_PUBKEY: vector<u8> = vector[');
console.log(publicKeyArray.join(',\n'));
console.log('];');

console.log('const ADMIN_PRIVKEY: vector<u8> = vector[');
console.log(privateKeyArray.join(',\n'));
console.log('];');

console.log('const MESSAGE: vector<u8> = vector[');
console.log(messageArray.join(',\n'));
console.log('];');

// Optionally, output the hexadecimal string representation of the keys and message
console.log('const ADMIN_PUBKEY_HEX: string = "0x' + publicKey.toString('hex') + '";');
console.log('const ADMIN_PRIVKEY_HEX: string = "0x' + privateKey.toString('hex') + '";');
console.log('const MESSAGE_HEX: string = "0x' + Buffer.from(message, 'utf-8').toString('hex') + '";');
