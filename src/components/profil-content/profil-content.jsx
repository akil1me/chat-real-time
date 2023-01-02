import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Image, Spin } from "antd";
import { GoBack, PrifileFlex, ProfilMenu, SpinnerDiv } from "./profil-content.styled";

export const ProfilContent = ({ id, displayName, photoURL, email, edite, deleteProfile }) => {

  return (
    <ProfilMenu>
      <GoBack to="/">
        <ArrowLeftOutlined />
      </GoBack>
      {
        !email ?
          <SpinnerDiv><Spin /></SpinnerDiv>
          :
          <div>
            <PrifileFlex>
              <Image
                style={{ borderRadius: "50%", objectFit: "cover" }}
                width={100}
                height={100}
                src={photoURL ? photoURL : "error"}
              />
              {edite}
              {deleteProfile}
            </PrifileFlex>

            <Card
              style={{
                marginTop: 20
              }}
            >
              <p>Name: {displayName}</p>
              <p>Id: {id || new Date().getTime()}</p>
              <p>Email: {email}</p>
            </Card>

          </div>
      }
    </ProfilMenu>
  )
}