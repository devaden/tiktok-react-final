import { Link } from 'react-router-dom'
import styles from './Table.module.scss'

const Table = ({
    tbodies,
    theads
}:TableProperties) => {
  return (
    <div className={styles["radius"]}>
        <table className={styles["table"]}>
        <thead className={styles["table__head"]}>
            <tr>
                {theads?.map(thead=>(
                    <th>{thead}</th>
                ))}
            </tr>
        </thead>
        <tbody className={styles["table__body"]}>
            {tbodies?.map(tbody=>(
                <tr>
                    {tbody?.map((tb:any,i:number)=>(
                        <td key={i}>{tb}</td>
                    ))}
                </tr>
            ))}            
        </tbody>
    </table>
    </div>
  )
}

export default Table