import { useSelector, useDispatch } from 'react-redux';

import FormCreateExpense from '../../molecule/form-expense-create';
import FormCreateEarning from '../../molecule/form-earning';

import { hideFormEarning, hideFormCreateExpense } from '../../../store/slices/modal';

import styles from './styles.module.scss';

export default function Modal(){
  const dispatchEvent = useDispatch();

  const modal = useSelector(({ modal }) => modal);
  
  const { 
    formCreateExpense,
    formEarning,
  } = modal;

  const displayModal = Object.keys(modal).reduce(( acc, key ) => acc ? acc : modal[key].show, false );
  
  function formCreateExpenseOnAction(){
    dispatchEvent(hideFormCreateExpense())
  }

  function formEarningOnAction(){
    dispatchEvent(hideFormEarning())
  }
  
  return (
    <>
      {displayModal &&
        <div className={`${ styles.modal }`}>
          {formCreateExpense.show &&
            <FormCreateExpense account={ formCreateExpense.accountID } onCancel={ formCreateExpenseOnAction } onSubmit={ formCreateExpenseOnAction }/>
          }
          {formEarning.show &&
            <FormCreateEarning earningID={ formEarning.earningID } onCancel={ formEarningOnAction } onSubmit={ formEarningOnAction }/>
          }
        </div>
      }
    </>
  );
}