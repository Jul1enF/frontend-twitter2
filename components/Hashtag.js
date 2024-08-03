import styles from '../styles/Hashtag.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../reducers/user';
import { addTweets } from '../reducers/tweets';
import Image from 'next/image';
import {useRouter} from 'next/router'
import LastTweets from './LastTweets';
import Trends from './Trends'
import { useEffect, useState } from 'react';
import Link from 'next/link'

function Hashtag (props){
  const url = process.env.NEXT_PUBLIC_BACK_ADRESS

    const router = useRouter()
    let hashtag = router.query.hashtag
    const [hashtagInput, setHashtagInput]= useState('#' + hashtag)
    const [inputText, setInputText] =useState('')

    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user.value)
    const allTweets = useSelector((state)=>state.tweets.value)

    if (!user.token){router.push('/')}

    const getHashtagTweets = async ()=>{
      const response = await fetch(`${url}/tweets/getByHashtag/${hashtag}`)
      const data = await response.json()
      dispatch(addTweets(data))
    }

    useEffect(()=>{
      if (!hashtag) {
        return;
      }
      getHashtagTweets()
      setHashtagInput('#' + hashtag)
    },[hashtag])

    const logoutClick = ()=>{
      dispatch(logOut())
      router.push('/')
    }

    const inputKeyDown=(event)=>{
      if (event.code === 'Enter')
      {
        setHashtagInput(inputText)
        router.push(`/hashtag/${inputText.slice(1)}`)
      }
    }

    const tweets = allTweets.map((e,i)=> <LastTweets {...e} key={i} />)

    return(
        <div className={styles.body}>
           <div className={styles.phoneHeader}>
          <div className={styles.twitterLogoContainer}>
            <Image src='/logo.png' alt='Logo Twitter' layout='fill'/>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.userLogContainer}>
              <div className={styles.userLogoContainer}>
                <Image src='/egg.jpg' alt='Logo User' layout='fill' className={styles.userLogo}/>
              </div>
              <div className={styles.userInfosContainer}>
                <h6 className={styles.firstname}>{user.firstname}</h6>
                <p className={styles.username}>@{user.username}</p>
              </div>
            </div>
            <button type='button' className={styles.logout} onClick={()=>logoutClick()}>Logout</button>
          </div>
      </div>
      <div className={styles.computerScreenContainer} >
      <div className={styles.leftContainer}>
          <div className={styles.twitterLogoContainer}>
          <Link href='/home'>
          <Image src='/logo.png' alt='Logo Twitter' layout='fill'/></Link>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.userLogContainer}>
              <div className={styles.userLogoContainer}>
                <Image src='/egg.jpg' alt='Logo User' layout='fill' className={styles.userLogo}/>
              </div>
              <div className={styles.userInfosContainer}>
                <h6 className={styles.firstname}>{user.firstname}</h6>
                <p className={styles.username}>@{user.username}</p>
              </div>
            </div>
            <button type='button' className={styles.logout} onClick={()=>logoutClick()}>Logout</button>
          </div>
        </div>
        <div className={styles.centralContainer}>
          <div className={styles.tweetContainer}>
            <div className={styles.titleContainer}>
              <h2 className={styles.hashtagTitle}>Hashtag</h2>
            </div>
            <input type="text" placeholder={hashtagInput} className={styles.hashtagInput} onKeyDown={inputKeyDown}
            onChange={e=>setInputText(e.target.value)} value={inputText}/>
          </div>
          <div className={styles.lastTweetsContainer}>
              {tweets}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <Trends/>
        </div>
      </div>
    </div>
    )
}

export default Hashtag