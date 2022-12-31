import { Button, Col, Input, Row } from "antd";
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
        const newDoc = {
          displayName: user?.displayName,
          uId: user?.uid,
          id: new Date().getTime(),
          photoURL: user?.photoURL,
          text: value,
          edited: false,
          editedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        }
        const docRef = doc(db, "massages", String(newDoc.id))
        await setDoc(docRef, newDoc)
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
      <Row>
        <Col span={18}>
          <Input
            size="large"
            value={value}
            style={{ width: "100%" }}
            onChange={(e) => setValue(e.target.value)}
            placeholder="print..." required />

        </Col>
        <Col span={6}>
          <Button
            style={{ width: "100%", marginLeft: 5 }}
            size="large" type="primary"
            htmlType="submit"
            loading={loading}>
            {
              !loading && "send"
            }
          </Button>
        </Col>
      </Row>
    </form>
  )
}