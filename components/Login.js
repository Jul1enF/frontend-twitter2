import styles from '../styles/Login.module.css'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Image from 'next/image'
import { useState } from 'react'
import {Modal} from 'antd'
import {CloseOutlined} from '@ant-design/icons'

function Login (){
    const [signupModal, setSignupModal] = useState(false)
    const [signinModal, setSigninModal] = useState(false)

    const closeSignupModal = ()=> {
        setSignupModal(false)
    }
    
    const closeSigninModal = ()=> {
        setSigninModal(false)
    }

    return (
        <div className={styles.body}>
            <Modal open={signupModal} footer={null} onCancel={()=>closeSignupModal()} classNames={{content : styles.modalContent}} closeIcon={<CloseOutlined style={{color: "white"}}/>}><SignUp /></Modal>
            
            <Modal open={signinModal} footer={null} onCancel={()=>closeSigninModal()} classNames={{content : styles.modalContent}} closeIcon={<CloseOutlined style={{color: "white"}}/>}><SignIn/></Modal>

            <div className={styles.leftContainer}>
                <div className={styles.mainLogoContainer}>
                <Image src='/logo.png' alt='Logo Twitter' layout='fill'/>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.secondLogoContainer}>
                        <Image src='/logo.png' alt='Logo Twitter' layout='fill'/>
                    </div>
                    <h1 className={styles.title}>See what's <br></br> happening</h1>
                    <div className={styles.postContainer}>
                        <h2 className={styles.secondTitle}>Join Hackatweet today.</h2>
                        <button type='button' className={styles.signupButton} onClick={()=>setSignupModal(true)}>Sign up</button>
                        <h6 className={styles.question}>Already have an account?</h6>
                        <button type='button' className={styles.signinButton} onClick={()=>setSigninModal(true)}>Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login