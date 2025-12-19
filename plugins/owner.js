module.exports = {
  command: "owner",
  description: "Show owner contacts, website button and command list",
  category: "info",

  async execute(sock, msg) {
    const jid = msg.key.remoteJid;

    const contacts = [
      {
        displayName: "DML",
        vcard: `
BEGIN:VCARD
VERSION:3.0
FN:DML
TEL;type=CELL;type=VOICE;waid=255713541112:+255615752312
END:VCARD`.trim(),
      }
    ];

    // Send contacts
    for (const contact of contacts) {
      await sock.sendMessage(jid, {
        contacts: {
          displayName: contact.displayName,
          contacts: [{ vcard: contact.vcard }],
        },
      });
    }

    // Send list message with 1 section
    await sock.sendMessage(jid, {
      title: "ᴏᴡɴᴇʀꜱ ɪɴꜰᴏ",
      text: "ᴄɪᴄᴋ ᴛʜᴇ ᴏᴡᴇʀꜱ ɪɴꜰᴏ ʙᴜᴛᴛᴏɴ🖲📋",
      footer: "DML-MIN BOT",
      buttonText: "OWNER INFO",
      sections: [
        {
          title: "CORE SYSTEM",
          rows: [
            {
              title: "ɴᴀᴍᴇ",
              description: "POWERED BY DML",
              rowId: ".owner",
            },
            {
              title: "ᴀɢᴇ",
              description: "ᴀɢᴇ - 20",
              rowId: ".owner",
            },
            {
              title: "ᴄᴏᴜɴʀᴛʏ",
              description: "Tanzania",
              rowId: ".owner",
            },
          ],
        }
      ],
    });
  },
};
