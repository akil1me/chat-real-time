import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../utils/firebase";

import { Link, useParams } from "react-router-dom";
import { Container } from "../../components";

export const Profil = () => {
  const [docs, loading] = useCollectionData(query(
    collection(db, "massages"), orderBy("createdAt", "asc")
  ));

  const { id } = useParams();

  const profil = docs?.find(doc => doc.id === +id)
  console.log(profil);
  return (
    <Container>
      <Link to="/">
        Go back
      </Link>
      <br />
      <img src={profil?.photoURL} alt="user avatar" width={100} height={100} />
    </Container>
  )
}