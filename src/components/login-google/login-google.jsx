import { Button } from "antd"

export const LoginGoogle = ({ login }) => {
  return (
    <div>
      <Button onClick={login}>
        Sign in google accunt
      </Button>
    </div>
  )
}