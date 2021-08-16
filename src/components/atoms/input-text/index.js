import React from 'react'

import styles from './styles.module.scss'

export default React.forwardRef((props, ref) => {
  return (
    <input {...props} ref={ref} className={`${ styles.input } ${ props.className || '' }`} type="text" />
  )
})