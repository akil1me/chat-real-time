import { Button, Col, Input, Row } from "antd";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../../utils/firebase";

const FromChat = styled.form`
  @media only  screen and (max-width: 500px) {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
`

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
    <FromChat onSubmit={handleSubmitMassage}>
      <Row>
        <Col span={19}>
          <Input
            size="large"
            value={value}
            style={{ width: "100%", marginLeft: 2 }}
            onChange={(e) => setValue(e.target.value)}
            placeholder="print..." required />

        </Col>
        <Col span={4}>
          <Button style={{ width: "100%", marginLeft: 10 }} size="large" type="primary" htmlType="submit" loading={loading}>
            send
          </Button>
        </Col>
      </Row>
    </FromChat>
  )
}