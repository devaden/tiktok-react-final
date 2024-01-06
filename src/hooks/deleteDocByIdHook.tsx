import { getDoc, doc,deleteDoc } from "firebase/firestore"
import config from "../firebase/config"

export default async (collectionName:string,id:string) => {
    const docRef = doc(config.db,collectionName,id)
    deleteDoc(docRef)
}