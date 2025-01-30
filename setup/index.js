const { randomBytes } = require('crypto');
const ed25519 = require('ed25519');
const fs = require('fs');

// Function to generate the keypair and convert it to vector<u8> format
function generateKeyPairAndConvertToVector() {
    const seed = randomBytes(32); // Generate a random 32-byte seed for the Ed25519 keypair
    const keyPair = ed25519.MakeKeypair(seed);

    return {
        publicKey: Array.from(keyPair.publicKey),
        privateKey: Array.from(keyPair.privateKey),
    };
}

// Convert a string message to a vector<u8>
function toMessageVector(message) {
    return Array.from(Buffer.from(message, 'utf-8'));
}

// Convert buffer to hex format
function toHexFormat(buffer) {
    return "0x" + buffer.toString('hex');
}

// Function to display vector<u8> formatted output
function displayVectorU8(name, vector, logStream) {
    const output = `const ${name}: vector<u8> = vector[\n${vector.join(',\n')}\n];\n`;
    logStream.write(output); // Save to file
    console.log(output); // Print to console
}

// Function to display hex output
function displayHex(name, buffer, logStream) {
    const output = `const ${name}_HEX: string = "${toHexFormat(buffer)}";\n`;
    logStream.write(output); // Save to file
    console.log(output); // Print to console
}

// Main function to generate keys and message, then display the results
function generateAndDisplay() {
    const logStream = fs.createWriteStream('output.log', { flags: 'w' }); // Open output file stream
    const { publicKey, privateKey } = generateKeyPairAndConvertToVector();
    const message = 'Hello, this is a test message!';
    const messageArray = toMessageVector(message);

    // Display the keys and message in vector<u8> format
    displayVectorU8('ADMIN_PUBKEY', publicKey, logStream);
    displayVectorU8('ADMIN_PRIVKEY', privateKey, logStream);
    displayVectorU8('MESSAGE', messageArray, logStream);

    // Display the hexadecimal representations
    displayHex('ADMIN_PUBKEY', Buffer.from(publicKey), logStream);
    displayHex('ADMIN_PRIVKEY', Buffer.from(privateKey), logStream);
    displayHex('MESSAGE', Buffer.from(message, 'utf-8'), logStream);

    logStream.end(); // Close the file stream after writing
}

// Run the function
generateAndDisplay();
