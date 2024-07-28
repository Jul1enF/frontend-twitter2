import styles from '../styles/Trends.module.css'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Trends (props){

    const router = useRouter()

    const [allTweets, setAllTweets]=useState([])

    const tweets = useSelector((state)=>state.tweets.value)

    useEffect(()=>{
        fetch('http://localhost:3000/tweets')
        .then(response=>response.json())
        .then(data => {
            setAllTweets(data)
        })
      },[tweets])

    const hashtags = allTweets.map(e=> {
     if (e.hastag !== null) {return e=e.hashtag} else {return }
    }).flat()
    let filteredHashtags = [...new Set(hashtags)]

    function getNumberHashtags(hashtagSearched){
        const tweetsWithHashtag = allTweets.filter(e=>e.hashtag !== null && e.hashtag.includes(hashtagSearched))
        return tweetsWithHashtag.length
    }

    filteredHashtags = filteredHashtags.map(e=> {
        return {name : e, number : getNumberHashtags(e)}
    })

    filteredHashtags.sort((a,b)=>b.number-a.number)

    const hashtagClick = (hashtag)=>{
            const newHashtag = hashtag.slice(1)
            router.push(`/hashtag/${newHashtag}`)
    }

    const hashtagsDisplay = filteredHashtags.map((e,i)=>{
        let tweet
        e.number>1 ? tweet='Tweets' : tweet='Tweet'
        return <div className={styles.hashtagContainer} key={i}>
            <p className={styles.hashtagTitle} onClick={()=>hashtagClick(e.name)}>{e.name}</p>
            <p className={styles.count}>{e.number} {tweet}</p>
        </div>
    })

    return(
        <div className={styles.body}>
            <h2 className={styles.trendsTitle}>Trends</h2>
            <div className={styles.trendsContainer}>
                {hashtagsDisplay}
            </div>
        </div>
    )
}

export default Trends