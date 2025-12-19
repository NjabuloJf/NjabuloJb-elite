const { formatMessage } = require('../lib/formatter');
const os = require('os');
const moment = require('moment');


module.exports = {
        command: 'system',
        description: 'Show the system',
        execute: async (socket, msg, args, number) => {
            const uptime = process.uptime();
            const formattedUptime = moment.utc(uptime * 1000).format("HH:mm:ss");

            const memoryUsage = process.memoryUsage();
            const usedMemory = (memoryUsage.rss / 1024 / 1024).toFixed(2);
            const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
            const freeMem = (os.freemem() / 1024 / 1024).toFixed(2);
            const cpuInfo = os.cpus()[0].model;

            const caption = `
╔═════════════════════════╗
        🖥️  SYSTEM STATUS
╚═════════════════════════╝

🤖 Platform        : ${os.platform()}
🖥️ Architecture    : ${os.arch()}
💾 Uptime          : ${formattedUptime}
🧠 RAM Usage       : ${usedMemory} MB / ${totalMem} MB
⚙️ Free Memory     : ${freeMem} MB
🔌 CPU             : ${cpuInfo}

⚙️ Node Version    : ${process.version}
📂 Working Dir     : ${process.cwd()}

🧩 Modules Loaded  : ${Object.keys(require.cache).length}
👤 User            : ${os.userInfo().username}

═══════════════════════════
⚡ Powered by Dml
`
            

            const sender = msg.key.remoteJid;

            await socket.sendMessage(sender, {
                image: { url: 'https://files.catbox.moe/reypkp.jpg' }, // Confirm accessibility
                caption,
                contextInfo: {
                    mentionedJid: ['2557135411124@s.whatsapp.net'],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363403958418756@newsletter',
                        newsletterName: 'DML-SYSTEM',
                        serverMessageId: 143
                    }
                }
            })
        }
}




