import { useState } from "react";

import { deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";

import { Button, message, Modal } from "antd";
import { ItemChat, ItemContent } from "./chat-item.syled";

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const ChatItem = ({ photoURL, displayName, text, uId, }) => {
  const [user] = useAuthState(auth);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteMassage = async () => {
    try {
      setLoading(true);
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
        onCancel={() => setOpen(false)}
        loading={loading}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => setOpen(false)}
            icon={<EditOutlined style={{ fontSize: '16px' }} />}

          >
            Edite
          </Button>,
          <Button
            key="link"
            type="primary"
            danger
            onClick={deleteMassage}
            loading={loading}
            icon={<DeleteOutlined style={{ fontSize: '16px' }} />}
          >
            Delete
          </Button>,
        ]}
      >
        <p>{text}</p>
      </Modal>
    </>
  )
}