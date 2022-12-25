import { Button } from "antd";
import { LoginAcc, LoginGoogleContent } from "./login-google.styled";

import { FacebookOutlined, GooglePlusOutlined } from "@ant-design/icons";

export const LoginForm = ({ loginGoogle, loginFacebook }) => {
  return (
    <LoginAcc>
      <LoginGoogleContent>
        <h2 >Welcome to global chat</h2>
        <Button
          type="primary"
          danger
          onClick={loginGoogle}
          icon={<GooglePlusOutlined style={{ fontSize: '20px' }} />}
          style={{ marginBottom: 20 }}>
          Sign in google accunt
        </Button>

        <Button
          type="primary"
          onClick={loginFacebook}
          icon={<FacebookOutlined style={{ fontSize: '20px' }} />} >
          Sign in facebook accunt
        </Button>
      </LoginGoogleContent>
    </LoginAcc >
  )
}