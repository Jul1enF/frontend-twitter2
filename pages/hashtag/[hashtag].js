import Hashtag from '../../components/Hashtag'
import { useRouter } from 'next/router'

function HashtagPage (){
    const router = useRouter()
    const hashtag = router.query.hashtag
    return (
        <Hashtag hashtag={hashtag} />
    )
}

export default HashtagPage