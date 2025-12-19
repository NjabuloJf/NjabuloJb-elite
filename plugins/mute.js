module.exports = {
  command: 'mute',
  alias: ["groupmute","offgroup","groupoff","offgc","gcoff"],
  description: "Mute the group (Only admins can send messages)",
  category: "group",
  react: "🔒",
  usage: ".mute",
  execute: async (socket, msg, args, { isGroup, senderNumber, isAdmins, isBotAdmins, reply, from }) => {
    try {
      // Check if it's a group
      if (!isGroup) {
        await socket.sendMessage(from, { react: { text: "❌", key: msg.key } });
        return reply("*❌ This command can only be used in groups!*");
      }

      // Check if sender is admin
      if (!isAdmins) {
        await socket.sendMessage(from, { react: { text: "⚠️", key: msg.key } });
        return reply("*⚠️ Only group admins can use this command!*");
      }

      // Check if bot is admin
      if (!isBotAdmins) {
        await socket.sendMessage(from, { react: { text: "❗", key: msg.key } });
        return reply("*❗ Please make me an admin in this group first!*");
      }

      // Mute the group
      await socket.groupSettingUpdate(from, "announcement");
      await socket.sendMessage(from, { react: { text: "🔒", key: msg.key } });
      reply("*✅ This group has been muted. Only admins can send messages!*");

    } catch (e) {
      console.error("Group mute error:", e);
      await socket.sendMessage(from, { react: { text: "😔", key: msg.key } });
      reply("*⚠️ Please try again!*");
    }
  }
};
