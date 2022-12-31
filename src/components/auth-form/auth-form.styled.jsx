import styled from "styled-components";

export const LoginAcc = styled.div`
 display: flex;
  justify-content:center;
  align-items:center;
  
`
export const LoginGoogleContent = styled.div`
flex:1 1 auto;
max-width:400px;
margin-top: 40px;
padding:30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color:#fff;
  border-radius:10px;
  
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
  max-width:280px;
   padding:10px;
  }

`
