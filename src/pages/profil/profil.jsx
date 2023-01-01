import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../utils/firebase";

import { useParams } from "react-router-dom";
import { Container, ProfilContent } from "../../components";

export const Profil = () => {
  const [docs, loading] = useCollectionData(query(
    collection(db, "massages"), orderBy("createdAt", "asc")
  ));

  const { id } = useParams();
  const profil = docs?.find(doc => doc.id === +id)
  console.log(profil);
  return (
    <Container>
      <ProfilContent
        {...profil}
        loading={loading}
      />
    </Container>
  )
}