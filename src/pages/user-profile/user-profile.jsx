import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import { Delete, Edite } from "./user-profile.styled";

import { Container, ProfilContent } from "../../components";

export const UserProfile = () => {
  const [user] = useAuthState(auth);

  const [editeModal, setEdeteModal] = useState(false)

  const handleEditeProfile = () => {

  }

  const handleDeleteProfile = () => {
    console.log('Deleted');
  }
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete your profile?',
      icon: <ExclamationCircleFilled style={{ color: "#FF4D4F" }} />,
      okText: 'Yes',
      okType: 'danger',
      okCancel: "No",
      cancelText: 'No',
      onOk() {
        handleDeleteProfile()
      },
      onCancel() { },
    });
  };

  return (
    <Container>
      <ProfilContent
        {...user}
        edite={<Edite onClick={() => setEdeteModal(true)} />}
        deleteProfile={<Delete type="dashed" onClick={showDeleteConfirm} />}

      />

      <Modal
        title="Edite your profile"
        centered
        open={editeModal}
        onOk={handleEditeProfile}
        onCancel={() => setEdeteModal(false)}
      >
        <p>Test mode</p>
      </Modal>
    </Container>
  )

}