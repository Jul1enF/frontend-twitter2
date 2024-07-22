import styles from '../styles/LastTweets.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
const moment = require('moment')

function LastTweets (props) {

    const timePassed = moment(props.createdDate).fromNow(true)

    const [isLiked, setIsLiked] = useState(false)
    const [canTrash, setCanTrash] = useState(false)

    useEffect(()=>{
        props.likedBy.includes(props.actualUserId) ? setIsLiked(true) : setIsLiked(false) ;
        props.actualUser == props.username ? setCanTrash(true) : setCanTrash(false);
    }, [])

    let heartStyle = {}
    isLiked ? heartStyle = {color : 'red'} : heartStyle = {color : 'white'}

    const trashClick = ()=>{
        fetch(`http://localhost:3000/tweets/deleteTweet/${props._id}`, {method: 'DELETE'})
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            props.getNewTweet(1)
        })
    }

    let garbage = <></> ;

   if (canTrash){
    garbage = <FontAwesomeIcon icon={faTrashCan} className={styles.trash} onClick={()=>trashClick()} />
   }    

    const heartClick = ()=>{
        if (!isLiked){
            fetch('http://localhost:3000/tweets/addLiker', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id : props._id, userId : props.actualUserId})
                })
                .then(response=> response.json())
                .then(data=> {
                console.log(data);
                setIsLiked(!isLiked)
                props.getNewTweet(1)
                })
        }
        else {
            fetch('http://localhost:3000/tweets/removeLiker', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id : props._id, userId : props.actualUserId})
                })
                .then(response=> response.json())
                .then(data=> {
                console.log(data);
                setIsLiked(!isLiked)
                props.getNewTweet(1)
                })
        }
        
    }

    return (
        <div className={styles.body}>
            <div className={styles.userInfosContainer}>
                <div className={styles.userLogoContainer}>
                    <Image src='/egg.jpg' alt='Logo User' layout='fill' className={styles.userLogo}/>
                </div>
                <p className={styles.firstname}>{props.firstname}</p>
                <p className={styles.username}>@{props.username}</p>
                <p className={styles.date}>{timePassed}</p>
            </div>
            <p className={styles.message}>{props.message}</p>
            <div className={styles.heartContainer}>
                <FontAwesomeIcon icon={faHeart} className={styles.heart} style={heartStyle} onClick={()=>heartClick()}/>
                <p className={styles.count}>{props.likedBy.length}</p>
                {garbage}
            </div>
        </div>

    )
}

export default LastTweets