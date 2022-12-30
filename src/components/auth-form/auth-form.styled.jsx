import styled from "styled-components";

export const LoginAcc = styled.div`
 display: flex;
  justify-content:center;
  align-items:center;
  height: 80vh; 
 
`
export const LoginGoogleContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color:#fff;
  border-radius:10px;
  padding:50px;

&> h2{
  font-size: 20px;
  margin-bottom: 12px;
  text-align:center;
}
& > p{
  margin-bottom:12px;
  text-align:center;
}
@media only screen and (max-width: 323px) {
   padding:10px;
  }

`
