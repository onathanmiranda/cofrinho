import { useSelector,useDispatch } from 'react-redux'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'

import Button from '../../atoms/button'

import { goNextMonth, goPreviousMonth } from '../../../store/slices/timeline'

import styles from './styles.module.scss'

export default function Timeline(){

  const dispatchEvent = useDispatch()

  const timeline = useSelector(({ timeline }) => timeline)

  const nextMonthOnClick      = () => dispatchEvent(goNextMonth())
  const previousMonthOnClick  = () => dispatchEvent(goPreviousMonth())

  return (
    <nav className={styles.timeline}>
      <Button className={`${styles.monthButton}`} onClick={previousMonthOnClick}>
        <div className={styles.explanation}>ir para</div> 
        <ArrowBackIos className={styles.arrow}/>{timeline.previous.month.name}
      </Button>
      <div className={`${styles.monthButton} ${styles.current}`}>
        <div className={styles.explanation}>você está em</div> 
        {timeline.current.month.name}
      </div>
      <Button className={`${styles.monthButton}`} onClick={nextMonthOnClick}>
        <div className={styles.explanation}>ir para</div> 
        {timeline.next.month.name}<ArrowForwardIos className={styles.arrow}/>
      </Button>
    </nav>
  )
}