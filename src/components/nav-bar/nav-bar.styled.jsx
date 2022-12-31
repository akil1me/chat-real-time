import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavSignUp = styled(Link)`
  display:inline-block;
  padding:7px 10px;
  color: #ffffff;
  border:2px solid #c7c7c7 ;
  border-radius:10px;
  transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;

  &:hover{
  color: #c7c7c7;
  background-color:#ffffff;
  }
`