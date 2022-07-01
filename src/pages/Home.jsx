import { useState, useEffect } from 'react'
import api from '../services/api'

import { TweetForm } from '../components/Tweet/TweetForm'
import { Tweet } from '../components/Tweet'
import Loading from '../components/Loading'

export function Home() {
  const [data, setData] = useState(null)

  async function getTweets() {
    const res = await api.get('/tweets')
    setData(res.data)
  }

  useEffect(() => {
    getTweets()
  }, [])

  if(!data){
    return <Loading />
  }

  return (
    <> 
      <TweetForm onSuccess={getTweets} />
      <div>        
        {data?.map(tweet => (
          <Tweet 
          key={tweet.id} 
          data={tweet}
          onSuccess={getTweets}        
          />
        ))}
      </div>
    </>
  )
}