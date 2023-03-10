import { AuthForm, Container, NavBar } from "../../components";

import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../utils/firebase";

import { FacebookOutlined, GooglePlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { doc, setDoc } from "firebase/firestore";
import styled from "styled-components";

const Header = styled.header`
  background-color: #bae7ff;
`

export const Login = () => {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const loginGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  const loginFacebook = async () => {
    try {
      const { user } = await signInWithPopup(auth, facebookProvider)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleSubmitLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
      message.error(err.code)
      console.log(err);
    }
  }

  return (
    <>
      <Header>
        <Container>
          <NavBar link={"/register"} title={"Sign up"} />
        </Container>
      </Header>

      <Container>
        <AuthForm handleSubmitLogin={handleSubmitLogin} title={"Log in"} googleAndFacebook={
          <>
            <Button
              type="primary"
              htmlType="button"
              danger
              onClick={loginGoogle}
              icon={<GooglePlusOutlined style={{ fontSize: '20px' }} />}
              style={{ marginBottom: 20 }}>
              Sign in google accunt
            </Button>

            <Button
              type="primary"
              htmlType="button"
              onClick={loginFacebook}
              icon={<FacebookOutlined style={{ fontSize: '20px' }} />} >
              Sign in facebook accunt
            </Button>
          </>
        } />
      </Container>
    </>
  )
}