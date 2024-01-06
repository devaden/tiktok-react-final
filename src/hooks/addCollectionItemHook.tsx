import { getDocs,collection, addDoc } from "firebase/firestore"
import config from "../firebase/config"

export default async (collectionName:string,data:any) => {
  const doc = collection(config.db,collectionName)
  addDoc(doc,data)
}