import { Button, Input, Spin } from "antd";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

export const ChatForm = ({ db }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false)
  const [user] = useAuthState(auth);

  const handleSubmitMassage = (e) => {
    e.preventDefault();
    (async () => {
      try {
        setLoading(true)
        const docRef = doc(db, "massages", value)
        await setDoc(docRef, {
          displayName: user?.displayName,
          uId: user?.uid,
          id: new Date().getTime(),
          photoURL: user?.photoURL,
          text: value,
          createdAt: serverTimestamp(),
        })
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false)
      }

    })()

    setValue("")
  }

  return (
    <form onSubmit={handleSubmitMassage}>
      <Input.Group compact>
        <Input style={{ width: 'calc(100% - 90px)', }} value={value} onChange={(e) => setValue(e.target.value)} required />
        <Button type="primary" htmlType="submit" disabled={loading}>
          send
          {
            loading && <Spin />
          }
        </Button>
      </Input.Group>


    </form>
  )
}