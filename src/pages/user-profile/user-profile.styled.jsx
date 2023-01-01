import styled from "styled-components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const stylesIcons = `
font-size:20px;
margin-left: 12px;
cursor: pointer;
transition:opacity 0.3s linear;

&:hover{
  opacity:0.65;
}
`

export const Edite = styled(EditOutlined)`
color:#1677ff;
  ${stylesIcons}
`
export const Delete = styled(DeleteOutlined)`
  color:#FF4D4F;
  ${stylesIcons}
`