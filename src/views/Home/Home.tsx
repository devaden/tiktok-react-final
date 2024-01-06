import { useEffect, useState } from 'react'
import Popup from '../../componets/Popup/Popup'
import Table from '../../componets/Table/Table'
import images from '../../image/images'
import styles from './Home.module.scss'
import addCollectionItemHook from '../../hooks/addCollectionItemHook'
import { Link } from 'react-router-dom'
import statusElementCreatorHook from '../../hooks/statusElementCreatorHook'
import GetCollectionHook from '../../hooks/GetCollectionHook'
import updateCollectionByIdHook from '../../hooks/updateCollectionByIdHook'


const Home = () => {
  const [isActive,setIsActive] = useState(false)
  const [challenges,setChallenges] = useState([])
  const [error,setError] = useState("")
  const [addChallengeItem,setAddChallengeItem] = useState({
    username:"",
    start_date:Date.now(),
    end_date:Date.now(),
    status:0
  })
  
 
  useEffect(()=>{
    GetCollectionHook("challenges").then((x:any)=>setChallenges(x))
  },[])

  const challengeAddHandle = ()=>{
    {
      if(addChallengeItem.username) {
        addCollectionItemHook("challenges",addChallengeItem)
        setAddChallengeItem({...addChallengeItem,username:""})
        setError("")
        setIsActive(false)
        GetCollectionHook("challenges").then((x:any)=>setChallenges(x))
      }else {
        setError("* Kullanıcı adı boş olamaz!")
      }
    }
  }



  return (
    <div className={styles["home"]}>  
      <header className={styles["home__header"]}>
        <h1 className={styles["home__header__title"]}>Yarışmalar</h1>
        <button onClick={()=>setIsActive(true)} className={styles["home__header__start-btn"]}>
          <img src={images.navBtnIcon}/>
          Yarışma Başlat
        </button>
      </header>

      <Popup setIsActive={setIsActive} isActive={isActive} >
        <div className={styles["add-challenge"]}>
          {error &&<p className={styles["add-challenge__error-text"]}>{error}</p>}
          <div className={styles["add-challenge__form-group"]}>
              <label htmlFor="username">Tiktok Kullanıcı Adı</label>   
              <input value={addChallengeItem.username} onChange={(e)=>setAddChallengeItem({...addChallengeItem,username:e.target.value})} placeholder='ör. @Alfa_Nova' type="text" id='username' className={styles["add-challenge__form-group__item"]} />   
          </div>
          <button onClick={()=>challengeAddHandle()}>Devam Et</button>
        </div>
      </Popup>

      {!challenges.length ? (
        <img src={images.challengeIlustration} alt="" />
      ):(
          <Table 
          
          theads={["Yönetim","Kullanıcı (ID)","Kullanıcı Adı","Başlangıç Tarihi","Bitiş Tarihi","Durum","Düzenle"]} 
          
          tbodies={
            challenges?.map((ch:any)=>(
              [ch.status==0?<Link className={styles["challenge-manager-btn"]} to={"/manager/"+ch.id}>Yönet</Link> :"-",ch.id,ch.username,"1.1.2002","12.11.2014",statusElementCreatorHook(ch.status),<button onClick={()=>{
                updateCollectionByIdHook("challenges",ch.id,{...ch,status:1})
                GetCollectionHook("challenges").then((x:any)=>setChallenges(x))}}>Yarışmayı bitir.</button>]
            ))
          }/>
      )}
    </div>
  )
}

export default Home