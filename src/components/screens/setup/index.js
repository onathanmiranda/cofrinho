import { useState } from "react"
import { Redirect, withRouter } from "react-router-dom"

import FormSetup from "../../molecule/form-setup"

import styles from './styles.module.scss'

export default withRouter((props) => {
    
    const [ registered, set_registered ] = useState(false)
    
    const onSubmit = () => set_registered(true)

    if(!registered) {
      return (
        <section className={styles.section} style={{ height: window.innerHeight }}>
          <h1 className={styles.h1}>Bem vindo ao<br/><span className={styles.appName}>Cofrinho</span></h1>
          <h2 className={styles.h2}>Parece que é a primeira vez que você acessa desse dispositivo.</h2>
          <FormSetup onSubmit={onSubmit} />
        </section>
      )
    } else {
        return <Redirect to="/" />
    }
})