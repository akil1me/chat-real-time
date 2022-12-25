import { Container, LoginForm, NavBar } from "../../components";

import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";

import styled from "styled-components";

const Header = styled.header`
  background-color: #bae7ff;
`

export const Login = () => {
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

  return (
    <>
      <Header>
        <Container>
          <NavBar loginGoogle={loginGoogle} />
        </Container>
      </Header>

      <Container>
        <LoginForm loginFacebook={loginFacebook} loginGoogle={loginGoogle} />
      </Container>
    </>
  )
}