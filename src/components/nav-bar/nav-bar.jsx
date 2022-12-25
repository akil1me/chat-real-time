import { Button, Col, Row } from "antd"
import { signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

import logo from "../../assets/img/logo.svg"
import { auth } from "../../utils/firebase"

export const NavBar = ({ loginGoogle }) => {
  const [user] = useAuthState(auth);

  return (
    <nav>
      <Row justify={"space-between"}>
        <Col>
          <a href="index.html">
            <img src={logo} alt="site logo" width={40} height={40} />
          </a>
        </Col>

        <Col>
          {user ?
            <Button onClick={() => signOut(auth)}>Logout</Button>
            :
            <Button onClick={loginGoogle}>Login</Button>
          }
        </Col>
      </Row>
    </nav>
  )
}