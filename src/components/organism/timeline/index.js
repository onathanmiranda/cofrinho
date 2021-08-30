import { useSelector,useDispatch } from 'react-redux'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'

import { goNextMonth, goPreviousMonth } from '../../../store/slices/timeline'

import styles from './styles.module.scss'

export default function Timeline(){

  const dispatchEvent = useDispatch()

  const timeline = useSelector(({ timeline }) => timeline)

  const nextMonthOnClick      = () => dispatchEvent(goNextMonth())
  const previousMonthOnClick  = () => dispatchEvent(goPreviousMonth())

  return (
    <nav className={styles.timeline}>
      <div className={styles.section}>
        <button className={styles.monthButton} onClick={previousMonthOnClick}>
          <ArrowBackIos />
          {timeline.previous.month.name}
        </button>
        <div className={styles.monthButton}>{timeline.current.month.name}</div>
        <button className={styles.monthButton} onClick={nextMonthOnClick}>
          {timeline.next.month.name}
          <ArrowForwardIos />
        </button>
      </div>
    </nav>
  )
}