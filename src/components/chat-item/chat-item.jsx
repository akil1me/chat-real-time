import { useState } from "react";

import { deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";

import { Modal, Spin, message } from "antd";
import { ItemChat, ItemContent } from "./chat-item.syled";

export const ChatItem = ({ photoURL, displayName, text, uId, }) => {
  const [user] = useAuthState(auth);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const deleteMassage = async () => {
    try {
      setLoading(true)
      const noteRef = doc(db, "massages", text);
      await deleteDoc(noteRef);
      await message.success("Deleted :)")
    }
    catch (err) {
      console.log(err);
      message.error("Your massage is not deleted :(")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ItemChat
        style={{
          marginLeft: user.uid === uId ? "auto" : "0",
          backgroundColor: user.uid === uId ? "#d5edb8" : "#fff",
          cursor: user.uid === uId ? "pointer" : "auto"
        }}
        onClick={user.uid === uId ? (() => setOpen(true)) : null}
      >
        <ItemContent >
          <img src={photoURL} alt="user avatar" width={30} height={30} />
          <div>
            <h2>{displayName}</h2>
            <p>{text}</p>
          </div>
        </ItemContent>
      </ItemChat>

      <Modal
        title={displayName}
        open={open}
        okText="delete"
        okType="danger"
        onCancel={() => setOpen(false)}
        onOk={deleteMassage}
      >
        {
          loading ?
            <div style={{ textAlign: "center" }}>
              <Spin />
            </div>
            :
            <p>{text}</p>
        }
      </Modal>
    </>
  )
}