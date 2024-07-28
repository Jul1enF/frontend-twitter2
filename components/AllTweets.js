import { useSelector } from "react-redux";
import LastTweets from "./LastTweets";

export default function AllTweets (){
    const allTweets = useSelector((state)=>state.tweets.value)

    const tweets = allTweets.map((e,i)=> <LastTweets {...e} key={i} />)

    return(
        <>
        {tweets}
        </>
    )
}