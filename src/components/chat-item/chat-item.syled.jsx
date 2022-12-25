import styled from "styled-components";

export const ItemChat = styled.li`
margin-bottom: 20px;
  padding: 10px 10px 10px 20px;
  max-width:200px;
  border-radius:10px;
  height:auto;
 
`

export const ItemContent = styled.div`
position: relative;
display: flex;

  &> img {
  width: 30px;
  height: 30px;
  border-radius:50%;
  }

  &> div {
  margin-left:10px;

  &> h2{
    width:100%;
    font-size: 15px;
    color:#00000091;
  }

  & >p{
    max-width:100px;
  }
  }
`