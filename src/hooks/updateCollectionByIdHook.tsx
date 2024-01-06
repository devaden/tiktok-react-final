import { updateDoc, doc } from "firebase/firestore"
import config from "../firebase/config"

export default async (collectionName:string,id:string,newData:any) => {
    const docRef = doc(config.db,collectionName,id)
    await updateDoc(docRef,newData)
}