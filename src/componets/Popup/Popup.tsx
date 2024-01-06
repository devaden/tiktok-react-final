import styles from './Popup.module.scss'

const Popup = ({children,isActive,setIsActive}:PopupProperties) => {
  return (
    <>
    {isActive && <div className={styles["popup-closer"]} onClick={()=>setIsActive(false)}></div>}
    <div className={styles[isActive?"active":"pasive"]}>
        <header className={styles["header"]}>
            <h5 className={styles["header__title"]}>Popup Title</h5>
            <span className={styles["header__close"]} onClick={()=>setIsActive(false)}>X</span>
        </header>
        <div className={styles["container"]}>
            {children}
        </div>
    </div>
    </>
  )
}
 
export default Popup