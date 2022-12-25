import { Button } from "antd";
import { LoginAcc, LoginGoogleContent } from "./login-google.styled";

import { ReactComponent as GoogleSvg } from "../../assets/img/google.svg";
import { ReactComponent as FacebookSvg } from "../../assets/img/facebook.svg";

export const LoginForm = ({ loginGoogle, loginFacebook }) => {
  return (
    <LoginAcc>
      <LoginGoogleContent>
        <h2 >Welcome to global chat</h2>
        <Button
          type="primary"
          danger
          onClick={loginGoogle}
          icon={<GoogleSvg style={{ verticalAlign: "middle" }} />}
          style={{ marginBottom: 20 }}>
          <span style={{ marginLeft: 10 }}>
            Sign in google accunt
          </span>
        </Button>

        <Button
          type="primary"
          onClick={loginFacebook}
          icon={<FacebookSvg style={{ verticalAlign: "middle" }} />} >
          <span style={{ marginLeft: 10 }}>
            Sign in facebook accunt
          </span>
        </Button>
      </LoginGoogleContent>
    </LoginAcc >
  )
}