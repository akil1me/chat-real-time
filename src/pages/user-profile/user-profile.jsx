import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../../utils/firebase";

import { Button, Form, Input, message, Modal, Upload } from "antd";
import { ExclamationCircleFilled, UploadOutlined } from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import { Delete, Edite } from "./user-profile.styled";

import { Container, ProfilContent } from "../../components";
import { deleteUser, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const UserProfile = () => {
  const [user] = useAuthState(auth);

  const [updating, setUpdating] = useState(false)
  const [editeModal, setEdeteModal] = useState(false)

  const handleEditeProfile = ({ username, file }) => {
    setUpdating(true)
    const storageRef = ref(storage, username);

    const uploadTask = uploadBytesResumable(storageRef, file?.file.originFileObj);

    uploadTask.on("state_changed",
      () => { },
      (error) => {
        message.error(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL
            })
          }
          catch (err) {
            setUpdating(false)
            message.error(err)
          }
          finally {
            setUpdating(false)
            setEdeteModal(false)
          }
        });
      }
    );
  }

  const handleDeleteProfile = async () => {
    try {
      await deleteUser(user)
    } catch (error) {
      console.log(error);
    }
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
        onCancel={() => setEdeteModal(false)}
        footer={[
          <Button
            key="1"
            htmlType="button"
            onClick={() => setEdeteModal(false)}
          >Cancel
          </Button>,
          <Button
            key="2"
            htmlType="submit"
            form="form"
            type="primary"
            loading={updating}
          >{!updating && "Ok"}</Button>
        ]}
      >
        <Form
          onFinish={handleEditeProfile}
          id="form"
        >
          <Form.Item
            style={{ maxWidth: "100%" }}
            label="Update Avatar"
            name="file"
            rules={[
              {
                required: true,
                message: 'Please input your avatar!',
              },
            ]}
          >
            <Upload
              name="file"
              listType={"picture"}
              maxCount={1}
              method={"get"}
              accept={".png,.jpeg,.ico,.svg,.jpg,.webp,.raw,.psd"}
            >
              <Button icon={<UploadOutlined />}>Upload image</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="username"
            initialValue={user.displayName}
            label="Update Name"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  )

}