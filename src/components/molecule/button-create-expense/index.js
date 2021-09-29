import { useDispatch } from 'react-redux';
import { AttachMoney } from '@material-ui/icons'

import Button from '../../atoms/button'

import { setFormCreateExpense } from '../../../store/slices/modal';

import styles from './styles.module.scss';

export default function ButtonCreateExpense({ accountID = undefined }){
  
  const dispatchEvent = useDispatch();

  function handleOnClick(){
    dispatchEvent(setFormCreateExpense({ show: true, accountID }))
  }
  
  return (
    <Button className={styles.floatingButton} onClick={handleOnClick}>
      <AttachMoney className={styles.icon} />
    </Button>
  )
}