import { Button, Checkbox, Form, Input } from "antd";
import { LoginAcc, LoginGoogleContent } from "./auth-form.styled";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const RulesEmail = [

  {
    required: true,
    message: 'Please input your Email!',
  },
  {
    type: 'email',
    message: 'Please input "example@in.com"'
  }

];

const RulesPassword = [
  {
    required: true,
    message: 'Please input your Password!',
  },
  {
    min: 6,
    message: 'Min 6 sybol',
  },
  {
    max: 16,
    message: 'Max 16 sybol',
  },
]

export const AuthForm = ({
  err,
  loading,
  googleAndFacebook,
  title,
  userName,
  confirm,
  upload,
  handleSubmitRegister = () => { },
  handleSubmitLogin = () => { }
}) => {

  const hendleSubmit = async ({ email, username, password, file }) => {
    handleSubmitLogin(email, password)

    handleSubmitRegister(email, password, username, file?.file.originFileObj)
  }

  return (
    <LoginAcc>
      <LoginGoogleContent>
        <h2 >{title}</h2>
        {(title === "Log in") && <p>Please enter your Login and your Password</p>}

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          validateTrigger={"onSubmit"}
          onFinish={hendleSubmit}
        >
          {userName}
          <Form.Item
            name="email"
            rules={RulesEmail}
          >
            <Input prefix={<MailOutlined />} placeholder="email" />
          </Form.Item>
          <Form.Item
            validateTrigger={"onChange"}
            name="password"
            rules={RulesPassword}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"

            />
          </Form.Item>
          {confirm}
          {upload}
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item >
            <Button type="primary" loading={loading} htmlType="submit" className="login-form-button" style={{ marginRight: 10 }}>
              {title}
            </Button>

            {
              (title === "Log in") ? <>Or <Link to={"/register"}>Register here</Link></>
                : <>Or <Link to={"/login"}>Log in here</Link></>
            }
          </Form.Item>

          {
            err && <span style={{ color: "red" }}>{err}</span>
          }

        </Form>

        {
          googleAndFacebook
        }
      </LoginGoogleContent>
    </LoginAcc >
  )
}