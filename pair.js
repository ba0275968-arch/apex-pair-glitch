const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers } = require("@whiskeysockets/baileys");

async function startPair(number) {
    const { state, saveCreds } = await useMultiFileAuthState('./session_' + Date.now());
    
    let Sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: "fatal" }),
        browser: Browsers.macOS("Desktop")
    });

    if (!Sock.authState.creds.registered) {
        await delay(1500);
        number = number.replace(/[^0-9]/g, '');
        let code = await Sock.requestPairingCode(number);
        return code;
    }
}

module.exports = startPair;
