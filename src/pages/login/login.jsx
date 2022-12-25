import { Container, LoginGoogle, NavBar } from "../../components";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";

import styled from "styled-components";

const Header = styled.header`
  background-color: #bae7ff;
`

export const Login = () => {
  const googleProvider = new GoogleAuthProvider();

  const login = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
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
          <NavBar login={login} />
        </Container>
      </Header>

      <Container>
        <LoginGoogle login={login} />
      </Container>
    </>
  )
}