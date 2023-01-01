import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProfilMenu = styled.div`
  max-width:400px;
  height:300px;
  margin:0 auto; 
  margin-top: 20px;
  padding:20px;
  border-radius:10px;
  background-color: #fff;
`
export const GoBack = styled(Link)`
  font-size: 20px;
  transition: opacity 0.4s ease;
  :hover{
    opacity: 0.6;
  }
`
export const SpinnerDiv = styled.div`
  height:200px;
  display: flex;
  align-items: center;
  justify-content:center;
`