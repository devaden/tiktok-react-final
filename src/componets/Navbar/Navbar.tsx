import { Link } from "react-router-dom"
import images from "../../image/images"
import styles from "./Navbar.module.scss"

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
        <img className={styles["navbar__logo"]} src={images.logo} alt="logo" />
        <div className={styles["navbar__nav"]}>
          <Link to={"/"} className={styles["navbar__nav__link"]} >
             <img className={styles["navbar__nav__link__icon"]}  src={images.navBtnIcon} /> Yarışmalar 
            </Link>
            <Link to={"/active-question"} className={styles["navbar__nav__link"]} >
             <img className={styles["navbar__nav__link__icon"]}  src={images.navBtnIcon} /> <p>Aktif Yarışma Sorusu</p> 
            </Link>
        </div>
    </nav>
  )
}

export default Navbar