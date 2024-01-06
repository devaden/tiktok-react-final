import {doc,onSnapshot} from "firebase/firestore"
import config from "../firebase/config";

 export default (collectionName:string,docId:string,setMethod:(data:any)=>any) => {
    onSnapshot(doc(config.db, collectionName, docId), (doc:any) => {
         setMethod(doc.data())
    });
}