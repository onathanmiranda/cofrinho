import { useDispatch } from 'react-redux';
import { AttachMoney } from '@material-ui/icons'

import Button from '../button'

import { setFormCreateExpense } from '../../../store/slices/modal';

import styles from './styles.module.scss';

export default function FloatingCreateExpense(){
  
  const dispatchEvent = useDispatch();

  function handleOnClick(){
    dispatchEvent(setFormCreateExpense({ show: true, accountID: undefined }))
  }
  
  return (
    <Button className={styles.floatingButton} onClick={handleOnClick}>
      <AttachMoney className={styles.icon} />
    </Button>
  )
}