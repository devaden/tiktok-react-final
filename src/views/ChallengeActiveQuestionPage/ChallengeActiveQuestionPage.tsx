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
  
  const [challenge,setChallenge] = useState<any>({username:""})
  const [questions,setQuestions] = useState<any>([])
  const [activeQuestion,setActiveQuestion] = useState<any>({answer:""})
  const [answerUserList,setAnswerUserList] = useState<any>([])



  const [isActive,setIsActive] = useState(false)
  const [error,setError] = useState("")
  const [addQuestionItem,setAddQuestionItem] = useState({
    questionTitle:"",
    questionAnswer:"",
    questionScore:20
  })
  

  const questionAddHandle = ()=>{
    {
      if(addQuestionItem.questionTitle && addQuestionItem.questionAnswer && addQuestionItem.questionScore) {
        addCollectionItemHook("questions",addQuestionItem)
        setError("")
        setIsActive(false)        
        GetCollectionHook("questions").then((x:any)=>setQuestions(x))
      }else {
        setError("* 'Soru' ve 'Cevap' alanı boş bırakılamaz.")
      }
    }
  }


  const sendQuestionHandler = ()=> {
    const random = Math.ceil(Math.random()*questions.length-1)
    console.log(random)
    const newQuestion = questions[random]
    updateCollectionByIdHook("activeQuestion","active",{
      challengeId:challenge.id,
      answer:newQuestion.questionAnswer,
      title:newQuestion.questionTitle,
      score:newQuestion.questionScore
    })
  }


  const deleteQuestionHandler = (id:string) => {
    deleteDocByIdHook("questions",id)
    GetCollectionHook("questions").then((x:any)=>setQuestions(x))
  }


  useEffect(()=>{
    getCollectionByIdHook("challenges",params.id).then((x:any)=>setChallenge(x))
    getCollectionByIdHook("activeQuestion","active").then((x:any)=>setActiveQuestion(x))
    GetCollectionHook("questions").then((x:any)=>setQuestions(x))
    getCollectionItemByIdOnSubscriptionHook("activeQuestion","active",setActiveQuestion)
    getCollectionItemOnSubscriptionHook("answerUserList",setAnswerUserList)
  },[])

  console.log(answerUserList,activeQuestion)

  return (
    <div className={styles["active-question-page"]}>
        <div className={styles["active-question-page__winner-page"]}>
          <img className={styles["active-question-page__winner-page__streamerImage"]} src={images.yayinciImage} alt="yayincı image" />
          {answerUserList.filter((x:any)=>x.questionId == activeQuestion.questionId)[0] && <div className={styles.winner}>
            <p>Son soruyu bilen</p>
            <p>{answerUserList.filter((x:any)=>x.questionId == activeQuestion.questionId)[0].username}</p>
          </div>}
        </div>
        <div>
          <h1>{activeQuestion.title}</h1>
          <p>{activeQuestion.answer}</p>
        </div>
    </div>
  )
}

export default ChallengeActiveQuestionPage