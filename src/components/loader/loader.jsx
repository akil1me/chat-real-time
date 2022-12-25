import { Spin } from "antd"
import styled from "styled-components"

const LoaderDiv = styled.div`
 width: 100%;
  height: ${(props) => (!props.vh ? "100vh" : "70vh")};
  display: flex;
  align-items: center;
  justify-content: center;

`

export const Loader = ({ vh }) => {
  return (
    <LoaderDiv vh="vh">
      <Spin size="large" />
    </LoaderDiv>
  )
}