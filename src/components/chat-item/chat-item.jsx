import { useState } from "react";

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";

import { Button, message, Modal, Input } from "antd";
import { ItemChat, ItemContent } from "./chat-item.syled";

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export const ChatItem = ({ photoURL, displayName, text, uId, oldDoc, id }) => {
  const [user] = useAuthState(auth);

  const [open, setOpen] = useState(false);
  const [editeOpen, setEditeOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updeting, setUpdeting] = useState(false);
  const [editedValue, setEditedValue] = useState(text);

  const editeMassage = async () => {
    try {
      setUpdeting(true);
      const noteRef = doc(db, "massages", String(id));
      setEditeOpen(false)
      await updateDoc(noteRef, {
        ...oldDoc,
        text: editedValue,
      });
      await message.success("Edited :)")
    }
    catch (err) {
      console.log(err);
      message.error("Your massage is not edited :(")
    }
    finally {
      setUpdeting(false)
    }
  }

  const deleteMassage = async () => {
    try {
      setDeleting(true);
      const noteRef = doc(db, "massages", String(id));
      await deleteDoc(noteRef);
      await message.success("Deleted :)")
    }
    catch (err) {
      console.log(err);
      message.error("Your massage is not deleted :(")
    }
    finally {
      setDeleting(false)
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
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={updeting}
            onClick={() => setEditeOpen(true)}
            icon={<EditOutlined style={{ fontSize: '16px' }} />}

          >
            Edite
          </Button>,
          <Button
            key="link"
            type="primary"
            danger
            onClick={deleteMassage}
            loading={deleting}
            icon={<DeleteOutlined style={{ fontSize: '16px' }} />}
          >
            Delete
          </Button>,
        ]}
      >
        <p>{text}</p>

        <Modal title="Basic Modal" open={editeOpen} onOk={editeMassage} onCancel={() => setEditeOpen(false)}>
          <Input value={editedValue} onChange={(e) => setEditedValue(e.target.value)} />
        </Modal>
      </Modal>
    </>
  )
}