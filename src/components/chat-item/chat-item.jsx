import { useState } from "react";

import { Link } from "react-router-dom";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";

import { Button, Input, message, Modal, Spin } from "antd";
import { ItemChat, ItemContent, TimeChat, UserAvatar } from "./chat-item.syled";

import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { ADMIN } from "../../utils/admin";

export const ChatItem = (
  {
    photoURL,
    displayName,
    text,
    uId,
    oldDoc,
    id,
    createdAt,
    edited,
    editedAt }) => {
  const [user] = useAuthState(auth);

  const [open, setOpen] = useState(false);
  const [editeOpen, setEditeOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updeting, setUpdeting] = useState(false);
  const [editedValue, setEditedValue] = useState(text);

  const editeMassage = async () => {
    try {
      const noteRef = doc(db, "massages", String(id));

      setUpdeting(true);
      setEditeOpen(false);
      await updateDoc(noteRef, {
        ...oldDoc,
        editedAt: serverTimestamp(),
        edited: true,
        text: editedValue,
      });
      await message.success("Edited :)")
      setUpdeting(false)
    }
    catch (err) {
      console.log(err);
      message.error("Your massage is not edited :(")
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

  const singlePage = (evt) => {
    evt.stopPropagation();

  }

  //Get Date
  const date = new Date(createdAt?.seconds * 1000);
  //Get Time
  const time = date.toTimeString().slice(0, 5)

  //Get edited Date and Time 
  const dateEdited = new Date(editedAt?.seconds * 1000)
  const timeEdited = dateEdited.toTimeString().slice(0, 5)

  return (
    <>
      <ItemChat
        style={{
          marginLeft: user.uid === uId ? "auto" : "20px",
          backgroundColor: user.uid === uId ? "#d5edb8" : "#fff",
          cursor: ((user.uid === uId) || user.uid === ADMIN) ? "pointer" : "auto"
        }}

        onClick={((user.uid === uId) || user.uid === ADMIN) ? (() => setOpen(true)) : null}
      >
        <ItemContent >
          {
            (user.uid !== uId)
            &&
            <Link to={`/pofhile/${id}`} onClick={singlePage}>
              <UserAvatar src={photoURL} alt="user avatar" width={30} height={30} />
            </Link>
          }
          <div>
            {
              (user.uid !== uId) && <h2>{displayName}</h2>
            }
            <p>{text}</p>
            <TimeChat datetime={date}>
              {
                ((time && timeEdited) || (time || timeEdited)) === "Inval" ? <Spin indicator={<LoadingOutlined style={{ fontSize: 12 }} />} /> :
                  (!edited ? (time !== "Inval" && time) : (timeEdited !== "Inval" && (edited && ("edited " + timeEdited))))
              }
            </TimeChat>
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

        <Modal title="Edite message" open={editeOpen} loading={updeting} onOk={editeMassage} onCancel={() => setEditeOpen(false)}>
          <Input defaultValue={text} onChange={(e) => setEditedValue(e.target.value)} required />
        </Modal>
      </Modal>
    </>
  )
}