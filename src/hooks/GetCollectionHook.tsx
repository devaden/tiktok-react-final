import { getDocs,collection } from "firebase/firestore"
import config from "../firebase/config"

export default async (collectionName:string) => {
    const Col = collection(config.db,collectionName)
  const Snapshot = await  getDocs(Col)
  const docs = await Snapshot.docs.map((doc:any)=>({...doc.data(),id:doc.id}))

  return docs
}