import {collection, doc,onSnapshot} from "firebase/firestore"
import config from "../firebase/config";

export default (collectionName: string, setMethod: (data: any) => any) => {
     onSnapshot(collection(config.db, collectionName), (snapshots: any) => {
         setMethod(snapshots.docs.map((docSnapshot: any) => {
          return docSnapshot.data()
             // setMethod(data); // Eğer setMethod fonksiyonunu kullanmak istiyorsanız
         }))

         console.log(snapshots)
     });
 };