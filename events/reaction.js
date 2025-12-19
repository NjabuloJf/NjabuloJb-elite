const listCmd = require('../plugins/list.js');

module.exports = {
  name: 'reaction',
  type: 'reaction',
  // You might need to pass the Baileys store object here if it's not globally available
  // execute: async (sock, msg, plugins, store) => { 
  execute: async (sock, msg, plugins) => {
    try {
      const { key, reaction } = msg.message.reaction;
      const emoji = reaction;
      const msgId = key.id;
      const sender = key.remoteJid;
      const reactingUser = key.participant;

      // Ensure 'store' is accessible. If not, you must pass it to the handler.
      const store = sock.store; 
      if (!store) {
          console.error("Baileys store is not available. Cannot fetch message reaction count.");
          return;
      }

      // --- 1. Fetch the complete message object from the store ---
      // Baileys stores messages by JID (sender) and ID (msgId)
      const fullMessage = await store.loadMessage(sender, msgId);

      if (!fullMessage) {
          console.log(`Message ID ${msgId} not found in store.`);
          return;
      }
      
      // --- 2. Calculate the total number of unique reaction participants ---
      const reactions = fullMessage.reactions || [];
      const totalReactions = reactions.length; // Baileys reactions array usually lists each user's reaction

      const MIN_REACTIONS_THRESHOLD = 200;
      
      // --- 3. Implement the check for more than 200 reactions ---
      if (totalReactions <= MIN_REACTIONS_THRESHOLD) {
          console.log(`Reaction count (${totalReactions}) is not over ${MIN_REACTIONS_THRESHOLD}. Skipping command.`);
          return;
      }
      
      console.log(`Reaction count met threshold: ${totalReactions} reactions.`);
      
      const map = listCmd.recentList();
      const data = map[msgId];
      if (!data) return;

      // Only allow the original requester to react (Kept your original rule)
      if (reactingUser !== data.user) return;

      const commandName = data.emojiMap[emoji];
      if (!commandName) return;

      const command = plugins.find(p => p.command === commandName);
      if (!command) return;

      // Simulate a msg object compatible with your command system
      const fakeMsg = {
        key: {
          remoteJid: sender,
          fromMe: false,
          id: `fake-${Date.now()}`
        },
        message: {
          conversation: `.${commandName}`
        },
        pushName: 'Reaction',
        participant: reactingUser
      };

      // Print log to confirm execution
      console.log(`Executing command via reaction: ${commandName}`);

      // Run the command
      await command.execute(sock, fakeMsg, plugins);

    } catch (err) {
      console.error('Reaction Handler Error:', err);
    }
  }
};
