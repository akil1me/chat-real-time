import { Button, Col, Row } from "antd";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.svg";
import userImg from "../../assets/img/user.svg";
import { auth } from "../../utils/firebase";

export const NavBar = ({ link, title }) => {
  const [user] = useAuthState(auth);

  return (
    <nav>
      <Row justify="space-between" align="middle">
        <Col>
          <Link to={user ? `/user-profile` : "index.html"}>
            <img style={{ borderRadius: "50%" }} src={user ? (user.photoURL !== null ? user.photoURL : userImg) : logo} alt="site logo" width={40} height={40} />
          </Link>
        </Col>
        {
          user?.displayName && <Col> <span>Welcome, {user.displayName}</span> </Col>
        }
        <Col>
          {user ?
            <Button onClick={() => signOut(auth)}>Logout</Button>
            :
            <>
              <Button>
                <Link to={link} >{title}</Link>
              </Button>
            </>
          }
        </Col>
      </Row>
    </nav>
  )
}