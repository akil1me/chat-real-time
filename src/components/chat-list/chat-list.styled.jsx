import { List } from "antd";
import styled from "styled-components";

export const ListChat = styled(List)`
  border: 2.5px solid #bae7ff;
  margin-bottom: 20px;
  border-radius: 10px;
  padding:10px 20px ; 
  height:75vh; 
  overflow-y: scroll;

 @media only screen  and (max-width:500px){
  height:72vh;
 }
 
  ::-webkit-scrollbar{
    width: 5px;
  }
  ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #bae7ff; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #80c6ed; 
} 
  
`