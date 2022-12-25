import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { ItemChat, ItemContent } from "./chat-item.syled";

export const ChatItem = ({ photoURL, displayName, text, uId }) => {
  const [user] = useAuthState(auth);
  return (
    <ItemChat
      style={{
        marginLeft: user.uid === uId ? "auto" : "0",
        backgroundColor: user.uid === uId ? "#d5edb8" : "#fff"
      }}

    >
      <ItemContent >
        <img src={photoURL} alt="user avatar" width={30} height={30} />
        <div>
          <h2>{displayName}</h2>
          <p>{text}</p>
        </div>
      </ItemContent>
    </ItemChat>
  )
}