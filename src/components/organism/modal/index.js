import { useSelector, useDispatch } from 'react-redux';

import FormCreateExpense from '../../molecule/form-expense-create';

import { hideFormCreateExpense } from '../../../store/slices/modal';

import styles from './styles.module.scss';

export default function Modal(){
  const dispatchEvent = useDispatch();

  const modal = useSelector(({ modal }) => modal);
  
  const { formCreateExpense } = modal;

  const displayModal = Object.keys(modal).reduce(( acc, key ) => acc ? acc : modal[key].show, false );
  
  function formCreateExpenseOnAction(){
    dispatchEvent(hideFormCreateExpense())
  }
  
  return (
    <>
      {displayModal &&
        <div className={`${styles.modal}`}>
          {formCreateExpense.show &&
            <FormCreateExpense account={formCreateExpense.accountID} onSubmit={formCreateExpenseOnAction} onCancel={formCreateExpenseOnAction} />
          }
        </div>
      }
    </>
  );
}