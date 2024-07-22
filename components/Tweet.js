import styles from '../styles/Tweet.module.css'
import { useState } from 'react'


function Tweet (props) {

    const [tweetTypped, setTweetTyped]=useState('')
    console.log(tweetTypped)

    const regex = /#\w*/g
    const hashtags = tweetTypped.match(regex)
    console.log(hashtags)

    const buttonClick = ()=>{
        fetch('http://localhost:3000/tweets/newTweet',  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message : tweetTypped,
                hashtag : hashtags,
                username: props.username,
                firstname: props.firstname,
            })
            })
            .then(response=> response.json())
            .then(data=> {
            console.log(data);
            setTweetTyped('')
            props.getNewTweet(1)
            })
    }

    return (
        <div className={styles.body}>
            <div className={styles.homeContainer}>
                <h2 className={styles.home}>Home</h2>
            </div>
            <div className={styles.postContainer}>
                <input className={styles.input} type="text" placeholder="What's up?" onChange={e=> e.target.value.length<281 && setTweetTyped(e.target.value)} value={tweetTypped}/>
                <div className={styles.tweetInfosContainer}>
                    <span className={styles.count}>{tweetTypped.length}/280</span>
                    <button  className={styles.button} type="button" onClick={()=>buttonClick()}>Tweet</button>
                </div>
            </div>
        </div>

    )
}

export default Tweet