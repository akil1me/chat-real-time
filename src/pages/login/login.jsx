import { Container, AuthForm, NavBar } from "../../components";

import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";

import styled from "styled-components";
import { Button } from "antd";
import { FacebookOutlined, GooglePlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const Header = styled.header`
  background-color: #bae7ff;
`

export const Login = () => {
  const [err, setErr] = useState("")
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

    }
    catch (err) {
      console.log(err);
    }
  }

  const loginFacebook = async () => {
    try {
      const { user } = await signInWithPopup(auth, facebookProvider)
      console.log(user);
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
      setErr(err.code)
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
        <AuthForm err={err} handleSubmitLogin={handleSubmitLogin} title={"Log in"} googleAndFacebook={
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