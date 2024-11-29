import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
} from "stream-chat-react";
import './App.css';
import "../node_modules/stream-chat-react/dist/css/v2/index.css";

const apikey = "b27m4sm7b2p4";

const users = [
  {
    id: "john",
    name: "Kaoutar Battah",
    image: "https://getstream.imgix.net/images/random_svg/FS.png",
  },
  {
    id: "john2",
    name: "Nacira Belmouden",
    image: "https://getstream.imgix.net/images/random_svg/FS.png",
  }
];

export default function App() {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(users[0]);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apikey);

      if (client) {
        await client.disconnectUser();
      }

      await chatClient.connectUser(
        selectedUser,
        chatClient.devToken(selectedUser.id)
      );

      const channel = chatClient.channel("messaging", "react-talk", {
        name: "Talk about React",
        members: [selectedUser.id]
      });
      
      await channel.watch();
      setChannel(channel);
      setClient(chatClient);
    }

    init();

    return () => {
      if (client) {
        client.disconnectUser();
        setChannel(null);
        setClient(null);
      }
    };
  }, [selectedUser]);

  if (!channel || !client) return <LoadingIndicator />;

  return (
    <div id="root">
      <select onChange={(e) => setSelectedUser(users[e.target.value])}>
        {users.map((user, index) => (
          <option key={user.id} value={index}>
            {user.name}
          </option>
        ))}
      </select>

      <Chat client={client} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}