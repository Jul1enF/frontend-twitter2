import styles from '../styles/Hashtag.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../reducers/user';
import { addTweets } from '../reducers/tweets';
import Image from 'next/image';
import {useRouter} from 'next/router'
import LastTweets from './LastTweets';
import Trends from './Trends'
import { useEffect } from 'react';
import { useState } from 'react';

function Hashtag (props){
    const router = useRouter()

    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user.value)
  
    const [actualise, setActualise]=useState(0)
    const [hashtags, setHashtags]=useState([])

    useEffect(()=>{
        
        fetch(`http://localhost:3000/tweets/getByHashtag/${props.hashtag}`)
            .then(response=> response.json())
            .then(data=> {
            setHashtags(data)
            })
    },[actualise])
  
    const getNewTweet = (number)=>{
      setActualise(actualise + number)
    }

    const logoutClick = ()=>{
      dispatch(logOut())
      router.push('/')
    }
    
    const allTweets = useSelector((state)=>state.tweets.value)
    const copyOfTweets = [...allTweets]

    const tweets = hashtags.map((e,i)=> <LastTweets {...e} key={i} getNewTweet={getNewTweet} actualUser={user.username} actualUserId={user._id} />)

    return(
        <div className={styles.body}>
        <div className={styles.leftContainer}>
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
        <div className={styles.centralContainer}>
          <div className={styles.tweetContainer}>
            <h2 className={styles.hashtagTitle}>Hashtag</h2>
          </div>
          <div className={styles.lastTweetsContainer}>
              {tweets}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <Trends allTweets={copyOfTweets} getNewTweet={getNewTweet}/>
        </div>
    </div>
    )
}

export default Hashtag