import { LockOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import styled from "styled-components";
import { AuthForm, Container, NavBar } from "../../components";
import { auth, db, storage } from "../../utils/firebase";

const Header = styled.header`
  background-color: #bae7ff;
`
export const Register = () => {
  const [loading, setLoading] = useState(false)

  const handleSubmitRegister = async (email, password, displayName, file,) => {
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, new Date().getTime());

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed",
        () => { },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL
              })

              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                photoURL: downloadURL,
                email,
              })
            }
            catch (err) {
              message.error(err)
            }
            finally {
              setLoading(false)
            }
          });
        }
      );
    }
    catch (err) {
      message.error(err.code)
      console.log(err);
    }
  }


  return (
    <>
      <Header>
        <Container>
          <NavBar link={"/login"} title={"Log in"} />
        </Container>
      </Header>

      <Container>
        <AuthForm
          loading={loading}
          handleSubmitRegister={handleSubmitRegister}
          title={"Register"}
          upload={
            <Form.Item
              style={{ maxWidth: 218 }}
              name={"file"}
              rules={[{ required: true, message: "Please confirm your image" }]}>
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
          }
          confirm={
            <Form.Item
              name="confirm"
              dependencies={['password']}
              validateTrigger={"onChange"}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('No password matches'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
            </Form.Item>
          }
          userName={
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your UserName!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="username" />
            </Form.Item>
          } />
      </Container>
    </>
  )
}