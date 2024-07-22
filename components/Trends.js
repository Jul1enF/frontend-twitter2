import styles from '../styles/Trends.module.css'
import {useRouter} from 'next/router'

function Trends (props){

    const router = useRouter()

    const allTweets = props.allTweets
    const hashtags = allTweets.map(e=> e=e.hashtag).flat()
    let filteredHashtags = [...new Set(hashtags)]

    function getNumberHashtags(hashtagSearched){
        const tweetsWithHashtag = allTweets.filter(e=>e.hashtag.includes(hashtagSearched))
        return tweetsWithHashtag.length
    }

    filteredHashtags = filteredHashtags.map(e=> {
        return {name : e, number : getNumberHashtags(e)}
    })

    filteredHashtags.sort((a,b)=>b.number-a.number)

    const hashtagClick = (hashtag)=>{
            const newHashtag = hashtag.slice(1, hashtag.length)
            router.push(`/hashtag/${newHashtag}`)
            props.getNewTweet(1)
    }

    const hashtagsDisplay = filteredHashtags.map((e,i)=>{
        let tweet
        e.number>1 ? tweet='Tweets' : tweet='Tweet'
    return <div className={styles.hashtagContainer} key={i}>
            <p className={styles.hashtagTitle} onClick={()=>hashtagClick(e.name)}>{e.name}</p>
            <p className={styles.count}>{e.number} {tweet}</p>
        </div>
    })


    console.log(getNumberHashtags('#vivementdimanche'))

    console.log(filteredHashtags)

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