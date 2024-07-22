import styles from '../styles/Home.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../reducers/user';
import { addTweets } from '../reducers/tweets';
import Image from 'next/image';
import {useRouter} from 'next/router'
import Tweet from '../components/Tweet'
import LastTweets from './LastTweets';
import Trends from './Trends'
import { useEffect } from 'react';
import { useState } from 'react';

function Home() {
  const router = useRouter()

  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user.value)
  console.log(user)

  const [actualise, setActualise]=useState(0)
  console.log(actualise)

  const getNewTweet = (number)=>{
    setActualise(actualise + number)
  }

  const allTweets = useSelector((state)=>state.tweets.value)
  console.log(allTweets)

  const copyOfTweets = [...allTweets]
  const orderedTweets = copyOfTweets.reverse()
  const tweets = orderedTweets.map((e,i)=> <LastTweets {...e} key={i} getNewTweet={getNewTweet} actualUser={user.username} actualUserId={user._id} />)

  useEffect(()=>{
    fetch('http://localhost:3000/tweets')
    .then(response=>response.json())
    .then(data => dispatch(addTweets(data)))
  },[actualise])

  const logoutClick = ()=>{
    dispatch(logOut())
    router.push('/')
  }

  return (
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
            <Tweet {...user} getNewTweet={getNewTweet}/>
          </div>
          <div className={styles.lastTweetsContainer}>
              {tweets}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <Trends allTweets={copyOfTweets} getNewTweet={getNewTweet}/>
        </div>
    </div>
  );
}

export default Home;
