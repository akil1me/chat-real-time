import styled from "styled-components";

export const ItemChat = styled.li`
 margin-bottom: 20px;
  padding:7px;
  padding-bottom:17px;
  min-width: 20px;
  max-width:200px;
  border-radius:16px;
  height:auto;
 
`

export const ItemContent = styled.div`
position: relative;
display: flex;

  &> div {
  margin-left:10px;

  &> h2{
    width:100%;
    font-size: 15px;
    color:#00000091;
  }
 
  }
`
export const UserAvatar = styled.img`
  position:absolute;
  bottom: -10px;
  left: -40px;
  width: 30px;
  height: 30px;
  border-radius:50%;


`

export const TimeChat = styled.time`
font-size:11px;
  position: absolute;
  bottom:-15px;
  right: 3px;
`