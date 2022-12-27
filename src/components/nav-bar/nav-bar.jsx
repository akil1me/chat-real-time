import { Button, Col, Row } from "antd"
import { signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.svg"
import { auth } from "../../utils/firebase"

export const NavBar = ({ loginGoogle }) => {
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <nav>
      <Row justify="space-between" align="middle">
        <Col>
          <Link to="index.html">
            <img style={{ borderRadius: "50%" }} src={user ? user.photoURL : logo} alt="site logo" width={40} height={40} />
          </Link>
        </Col>
        {
          user && <Col> <span>Welcome, {user.displayName}</span> </Col>
        }
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