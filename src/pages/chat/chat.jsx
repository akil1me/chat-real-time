import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../utils/firebase";

import { ChatForm, ChatList, Container, NavBar } from "../../components/";

import styled from "styled-components";

const Header = styled.header`
  background-color: #bae7ff;
`
export const Chat = () => {
  const [docs, loading] = useCollectionData(query(
    collection(db, "massages"), orderBy("createdAt", "asc")
  ));

  return (
    <>
      <Header>
        <Container>
          <NavBar />
        </Container>
      </Header>

      <Container>
        <ChatList docs={docs} loading={loading} />
        <ChatForm db={db} />
      </Container>
    </>
  )
}