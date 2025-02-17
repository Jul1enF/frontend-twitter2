
import styles from '../styles/SignIn.module.css'
import Image from 'next/image'
import { useState } from 'react'
import {useDispatch } from 'react-redux'
import { logUser } from '../reducers/user'
import {useRouter} from 'next/router'

function SignIn (){
    const url = process.env.NEXT_PUBLIC_BACK_ADRESS
    console.log(url)
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()

    const buttonClick = ()=>{
        fetch(`${url}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
            })
            })
            .then(response=> response.json())
            .then(data=> {
                if (data.result)
           { setError('')
            dispatch(logUser(data.user))
            router.push('/home')
           } else {setError(data.error)}
            } )
    }

    const passwordKeyDown = (event)=>{
        if (event.code==='Enter'){
            buttonClick()
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.logoContainer}>
                <Image src='/logo.png' alt='Logo Twitter' layout='fill'/>
            </div>
            <h2 className={styles.title}>Connect to Hackatweet</h2>
            <div className={styles.postContainer}>
                <input type="text" className={styles.input} placeholder='Username' onChange={e=>{
                    setUsername(e.target.value)
                    setError('')
                    }} value={username} />
                <input type="password" className={styles.input} placeholder='Password' onChange={e=>{
                    setPassword(e.target.value)
                    setError('')
                }} value={password} onKeyDown={passwordKeyDown}/>
                <button className={styles.button} onClick={()=>buttonClick()}>Sign in</button>
                <div className={styles.errorContainer}>
                <p className={styles.error}>{error}</p>
                </div>
            </div>
        </div>
        
    )
}

export default SignIn