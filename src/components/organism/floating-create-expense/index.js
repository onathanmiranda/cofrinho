import { useEffect, useState } from 'react'

import Button from '../../atoms/button'
import FormExpenseCreate from '../../molecule/form-expense-create'

export default function FloatingCreateExpense(props){

  const [ open, setOpen ] = useState(false);
  const [ height, setHeight ] = useState(window.innerHeight);

  const toggleOpen = () => setOpen(!open)

  const onResize = window.addEventListener('resize', () => {
    setHeight(window.innerHeight)
  });

  useEffect(() => () => { window.removeEventListener('resize', onResize) }, [onResize])

  return (
    <>
      {!open && <Button className={`fixed bottom-21 right-21 z-10 bg-black rounded-full h-55 w-55`} onClick={toggleOpen}></Button>}
      {open && 
        <div style={{ height }} className={`fixed flex justify-center items-center bottom-0 left-0 w-full z-10 bg-black bg-opacity-75`}>
          <FormExpenseCreate onSubmit={toggleOpen} onCancel={toggleOpen}/>
        </div>
      }
    </>
  )
}