import { useParams } from 'react-router'
import getCollectionByIdHook from '../../hooks/getCollectionByIdHook'
import images from '../../image/images'
import styles from './ChallengeManager.module.scss'
import { useEffect, useState } from 'react'
import Chat from '../../componets/Chat/Chat'
import Popup from '../../componets/Popup/Popup'
import GetCollectionHook from '../../hooks/GetCollectionHook'
import addCollectionItemHook from '../../hooks/addCollectionItemHook'
import Table from '../../componets/Table/Table'
import getCollectionItemByIdOnSubscriptionHook from '../../hooks/getCollectionItemByIdOnSubscriptionHook'
import updateCollectionByIdHook from '../../hooks/updateCollectionByIdHook'
import deleteDocByIdHook from '../../hooks/deleteDocByIdHook'

const ChallengeManager = () => {
  const params:any = useParams()
  
  const [challenge,setChallenge] = useState<any>({username:""})
  const [questions,setQuestions] = useState<any>([])
  const [activeQuestion,setActiveQuestion] = useState<any>({answer:""})



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
      score:newQuestion.questionScore,
      questionId:newQuestion.id
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
  },[])


  return (
    <div className={styles["challenge-manager"]}>
        <Popup setIsActive={setIsActive} isActive={isActive} >
          <div className={styles["add-question"]}>
            {error &&<p className={styles["add-question__error-text"]}>{error}</p>}
            <div className={styles["add-question__form-group"]}>
                <label htmlFor="username">Soru</label>   
                <input value={addQuestionItem.questionTitle} onChange={(e)=>setAddQuestionItem({...addQuestionItem,questionTitle:e.target.value})} placeholder='Soru' type="text" id='username' className={styles["add-question__form-group__item"]} />   
            </div>

            <div className={styles["add-question__form-group"]}>
                <label htmlFor="answer">Cevap</label>   
                <input value={addQuestionItem.questionAnswer} onChange={(e)=>setAddQuestionItem({...addQuestionItem,questionAnswer:e.target.value})} placeholder='Cevap' type="text" id='answer' className={styles["add-question__form-group__item"]} />   
            </div>

            <div className={styles["add-question__form-group"]}>
                <label htmlFor="score">Puan</label>   
                <input defaultValue={addQuestionItem.questionScore} onChange={(e)=>setAddQuestionItem({...addQuestionItem,questionScore:Number(e.target.value)})} placeholder='puan' type="number" id='score' className={styles["add-question__form-group__item"]} />   
            </div>
            <button onClick={()=>questionAddHandle()}>Devam Et</button>
          </div>
        </Popup>
        <header className={styles["challenge-manager__header"]}>
            <h1>Yarışma Yönetimi</h1> <button><img src={images.btnIconPc} alt="" /> Canlı yayını başlat</button>
        </header>
        <section className={styles["challenge-manager__section"]}>
            <div className={styles["challenge-manager__section__question-manager"]}>
                <div className={styles["challenge-manager__section__question-manager__question-show-panel"]}>
                    <p>Yayında Olan Sorunun Cevabı</p>
                    <h3 className={styles["challenge-manager__section__question-manager__question-show-panel__answer"]}>{activeQuestion?.answer}</h3>
                </div>

                <div className={styles["challenge-manager__section__question-manager__controller"]}>
                <button onClick={()=>sendQuestionHandler()} className={styles["challenge-manager__section__question-manager__controller__button"]}>
                    <img src={images.soru_gonder} alt=""  className={styles["challenge-manager__section__question-manager__controller__button__icon"]}/>
                    <p>Soru Gönder</p>
                  </button>

                  <button className={styles["challenge-manager__section__question-manager__controller__button"]}>
                    <img src={images.joker_gonder} alt=""  className={styles["challenge-manager__section__question-manager__controller__button__icon"]}/>
                    <p>Joker Gönder</p>
                  </button>

                </div>
            </div>
            <div className={styles["challenge-manager__section__top-list"]}>
              <header>
                <h6>Tiktok Canlı Yayın Mesajları</h6>
              </header>
                {challenge && <Chat username={challenge.username} challangeId={challenge.id}/>}
            </div>
            <div className={styles["challenge-manager__section__question-list"]}>
                <header className={styles["challenge-manager__section__question-list__header"]}>
                  <h6>Soru Havuzu</h6> <button onClick={()=>setIsActive(true)}><img src={images.addQuestionIcon} alt="" /> Soru Ekle</button>
                </header>
                {!questions? <img src={images.ChallengeQuestion} alt="ChallengeQuestion" />:(
                  <div>
                    <Table
                      theads={["ID","Soru","Cevap","Puan","Düzenle"]}
                      tbodies={
                        questions.map((x:any)=>([x.id,<p title={x.questionTitle}>{x.questionTitle.slice(0,20)+ (x.questionTitle.length>20?"...":"")}</p>,x.questionAnswer,x.questionScore,<div><button onClick={()=>deleteQuestionHandler(x.id)}>Sil</button></div>]))
                      }
                    />
                  </div>
                )}
            </div>
        </section>
    </div>
  )
}

export default ChallengeManager