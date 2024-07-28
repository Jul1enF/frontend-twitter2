import styles from '../styles/LastTweets.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTweet, addLiker, removeLiker } from '../reducers/tweets'
const moment = require('moment')

function LastTweets (props) {

    const dispatch = useDispatch()
    const timePassed = moment(props.createdDate).fromNow(true)

    const user = useSelector((state)=>state.user.value)
    const allTweets = useSelector((state)=>state.tweets.value)

    const [isLiked, setIsLiked] = useState(false)
    const [canTrash, setCanTrash] = useState('')

    useEffect(()=>{
        props.likedBy.includes(user._id) ? setIsLiked(true) : setIsLiked(false) ;
        user.username === props.username ? setCanTrash(true) : setCanTrash(false);
    }, [allTweets])

    let heartStyle = {}
    isLiked ? heartStyle = {color : 'red'} : heartStyle = {color : 'white'}

    const trashClick = ()=>{
        fetch(`http://localhost:3000/tweets/deleteTweet/${props._id}`, {method: 'DELETE'})
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            data.deletedCount>0 && dispatch(deleteTweet(props._id))
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
                body: JSON.stringify({id : props._id, userId : user._id})
                })
                .then(response=> response.json())
                .then(data=> {
                if (data.modifiedCount>0){
                setIsLiked(!isLiked)
                dispatch(addLiker({id : props._id, userId : user._id}))
                }
                })
        }
        else {
            fetch('http://localhost:3000/tweets/removeLiker', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id : props._id, userId : user._id})
                })
                .then(response=> response.json())
                .then(data=> {
                if (data.modifiedCount>0){
                    setIsLiked(!isLiked)
                    dispatch(removeLiker({id : props._id, userId : user._id}))
                }
                })
        }
    }
 
    let newMessage = props.message.split(' ').map((e,i)=>{
        if (e.startsWith('#') && e.length >1){return <span key={i} style={{color : 'rgb(63	140	233	)'}}>{e} </span>}
        else {return e + ' '}
    })

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
            <p className={styles.message}>{newMessage}</p>
            <div className={styles.heartContainer}>
                <FontAwesomeIcon icon={faHeart} className={styles.heart} style={heartStyle} onClick={()=>heartClick()}/>
                <p className={styles.count}>{props.likedBy.length}</p>
                {garbage}
            </div>
        </div>

    )
}

export default LastTweets