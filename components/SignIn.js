import styles from '../styles/SignIn.module.css'
import Image from 'next/image'
import { useState } from 'react'
import {useDispatch } from 'react-redux'
import { logUser } from '../reducers/user'
import {useRouter} from 'next/router'

function SignIn (){
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()

    const buttonClick = ()=>{
        fetch('http://localhost:3000/users/signin', {
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
           { dispatch(logUser(data.user))
            router.push('/home')
           }
            } )
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.logoContainer}>
                <Image src='/logo.png' alt='Logo Twitter' layout='fill'/>
            </div>
            <h2 className={styles.title}>Connect to Hackatweet</h2>
            <div className={styles.postContainer}>
                <input type="text" className={styles.input} placeholder='Username' onChange={e=>setUsername(e.target.value)} value={username} />
                <input type="password" className={styles.input} placeholder='Password' onChange={e=>setPassword(e.target.value)} value={password} />
                <button className={styles.button} onClick={()=>buttonClick()}>Sign in</button>
            </div>
        </div>
        
    )
}

export default SignIn