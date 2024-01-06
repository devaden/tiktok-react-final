import { getDoc, doc } from "firebase/firestore"
import config from "../firebase/config"

export default async (collectionName:string,id:string) => {
    const docRef = doc(config.db,collectionName,id)
  const Snapshot = await getDoc(docRef)
  const docData = await Snapshot.data()
  console.log("docData",{...docData,id})
  return {...docData,id}
}