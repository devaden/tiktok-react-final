import { useParams } from 'react-router'
import getCollectionByIdHook from '../../hooks/getCollectionByIdHook'
import images from '../../image/images'
import styles from './ChallengeActiveQuestionPage.module.scss'
import { useEffect, useState } from 'react'
import Chat from '../../componets/Chat/Chat'
import Popup from '../../componets/Popup/Popup'
import GetCollectionHook from '../../hooks/GetCollectionHook'
import addCollectionItemHook from '../../hooks/addCollectionItemHook'
import Table from '../../componets/Table/Table'
import getCollectionItemByIdOnSubscriptionHook from '../../hooks/getCollectionItemByIdOnSubscriptionHook'
import updateCollectionByIdHook from '../../hooks/updateCollectionByIdHook'
import deleteDocByIdHook from '../../hooks/deleteDocByIdHook'
import getCollectionItemOnSubscriptionHook from '../../hooks/getCollectionItemOnSubscriptionHook'

const ChallengeActiveQuestionPage = () => {
  const params:any = useParams()
  
 
  const [activeQuestion,setActiveQuestion] = useState<any>({answer:""})
  const [answerUserList,setAnswerUserList] = useState<any>([])



 



 

  useEffect(()=>{
    getCollectionByIdHook("activeQuestion","active").then((x:any)=>setActiveQuestion(x))
    getCollectionItemByIdOnSubscriptionHook("activeQuestion","active",setActiveQuestion)
    getCollectionItemOnSubscriptionHook("answerUserList",setAnswerUserList)
  },[])

  console.log(answerUserList,activeQuestion)

  return (
    <div className={styles["active-question-page"]}>
        <div className={styles["active-question-page__winner-page"]}>
          <img className={styles["active-question-page__winner-page__streamerImage"]} src={images.yayinciImage} alt="yayincı image" />
          {answerUserList.filter((x:any)=>x.questionId == activeQuestion.questionId)[0] && 
          <div   className={styles["active-question-page__winner-page__winner"]}>
            <p>Son soruyu bilen</p>
            <p>{answerUserList.filter((x:any)=>x.questionId == activeQuestion.questionId)[0].username}</p>
          </div>}
        </div>
        <div className={styles["active-question-page__question-page"]}>
          <h1  className={styles["active-question-page__question-page__question"]}>{activeQuestion.title}</h1>
          <p  className={styles["active-question-page__question-page__answer"]}>{activeQuestion.answer.replaceAll(" ","").trim().split("").map((keyword:string,i:number)=>(<span  className={styles["active-question-page__question-page__answer__keyword"]}>{i==0 ? keyword:""}</span>))}</p>
        </div>
    </div>
  )
}

export default ChallengeActiveQuestionPage