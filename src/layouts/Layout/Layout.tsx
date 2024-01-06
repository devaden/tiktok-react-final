import { Outlet } from 'react-router'
import Navbar from '../../componets/Navbar/Navbar'
import styles from './Layout.module.scss'

const Layout = () => {
  return (
    <div className={styles["layout"]}>
        <div className={styles["navbar"]}>
            <Navbar/>
        </div>
        <header className={styles["header"]}>

        </header>
        <div className={styles["outlet"]}>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout