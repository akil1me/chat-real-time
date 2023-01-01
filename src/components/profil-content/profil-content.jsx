import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Image, Spin } from "antd";
import { GoBack, ProfilMenu, SpinnerDiv } from "./profil-content.styled";

export const ProfilContent = ({ id, displayName, photoURL, email }) => {

  return (
    <ProfilMenu>
      <GoBack to="/">
        <ArrowLeftOutlined />
      </GoBack>
      {
        !id ?
          <SpinnerDiv><Spin /></SpinnerDiv>
          :
          <div>
            <div>
              <Image
                style={{ borderRadius: "50%" }}
                width={100}
                height={100}
                src={photoURL ? photoURL : "error"}
              />
            </div>

            <Card
              style={{
                marginTop: 20
              }}
            >
              <p>Name: {displayName}</p>
              <p>Id: {id}</p>
              <p>Email: {email}</p>
            </Card>

          </div>
      }
    </ProfilMenu>
  )
}