import styles from '../styles/Tweet.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTweet } from '../reducers/tweets'


function Tweet (props) {
    const url = process.env.NEXT_PUBLIC_BACK_ADRESS

    const dispatch = useDispatch()
    const [tweetTypped, setTweetTyped]=useState('')

    const regex = /#\w*/g
    let hashtags
    if (tweetTypped.match(regex)) {hashtags=tweetTypped.match(regex)}

    const buttonClick = ()=>{
        fetch(`${url}/tweets/newTweet`,  {
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
            console.log(data)
            setTweetTyped('')
            dispatch(addTweet(data))
            })
    }

    const tweetKeyDown=(event)=>{
        if (event.code==='Enter'){
            buttonClick()
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.homeContainer}>
                <h2 className={styles.home}>Home</h2>
            </div>
            <div className={styles.postContainer}>
                <input className={styles.input} type="text" placeholder="What's up?" onChange={e=> e.target.value.length<281 && setTweetTyped(e.target.value)} value={tweetTypped} onKeyDown={tweetKeyDown}/>
                <div className={styles.tweetInfosContainer}>
                    <span className={styles.count}>{tweetTypped.length}/280</span>
                    <button  className={styles.button} type="button" onClick={()=>buttonClick()}>Tweet</button>
                </div>
            </div>
        </div>

    )
}

export default Tweet