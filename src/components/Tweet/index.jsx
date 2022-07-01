import { useState } from 'react'
import { ChatIcon, TrashIcon, } from '@heroicons/react/outline'
import { useDateAgo } from '../../hooks/useDateAgo'
import { useAuthContext } from '../../Context/authcontext'
import { Link } from 'react-router-dom'
import { Like } from '../Like'
import { ReplyForm } from './TweetForm'
import api from '../../services/api'

const ReplyContent = ({ created_at, text, user, postId, countLike, type, reply,onSuccess, children }) => {

  const currentUser = useAuthContext()
  const { name, username,avatar } = user

 async function deletePost(){
    const typeDelete = type != 'reply' ? `/tweet/${postId}`: `/tweet/reply/${postId}`
    await api.delete(typeDelete)
    onSuccess()

  }

  return (
    <div className="flex space-x-3 w-full">

      <div className="flex flex-col p-1">
        <div>
          <Link to={`/${username}`}><img className="w-[48px!important] h-[48px] object-cover rounded-full" src={avatar} /></Link> 
        </div>
        {reply > 0  || reply ? (<div className="w-[1px] h-full bg-silver m-auto mb-1" />) : ''}
      </div>

      <div className="space-y-1 flex-1">
        <div>
          <div className="flex">
            <div>
            <Link to={`/${username}`}><span className="font-bold text">{name}</span></Link>{" "}
              <span className="text-sm text-silver">{useDateAgo(created_at)}</span>
              <div><span className="text-sm text-silver">@{username}</span></div>
            </div>
            {currentUser.user.username === username && (
              <div className="flex ml-auto">
                <TrashIcon onClick={deletePost} className="w-5 cursor-pointer stroke-2 stroke-silver" />                
              </div>
            )}
          </div>
        </div>
        <p>
          {text}
        </p>

        <div className="flex items-center space-x-1 text-silver">
          <Like postId={postId} type={type && (type)} like={countLike} />
          {reply > 0 && type != 'reply' && (
            <>
              <ChatIcon className="ml-auto w-5 cursor-pointer stroke-2 stroke-silver" />
              <span className="text-sm text-silver">{reply}</span>
            </>
          )}
        </div>
        {children}

      </div>
    </div>
  )
}

export function Tweet({ data, avatar, onSuccess }) {
  const [reply, setReply] = useState(false)
  const { id, text, created_at, TweetReply, _count, user } = data

  return (
    <div className="flex flex-wrap p-4 flex-1 border-b border-silver ">

      <ReplyContent
        postId={id}
        countLike={_count.TweetLike}
        created_at={created_at}
        user={user}
        reply={TweetReply.length}
        text={text}
        onSuccess={onSuccess}
      />


      {!reply ?
        TweetReply.filter((item, index) => index === 0).map(item => (
          <ReplyContent
            key={item.id}
            postId={item.id}
            countLike={_count.TweetLike}
            created_at={item.created_at}
            user={item.user}
            text={item.text}
            type="reply"
            onSuccess={onSuccess}
          >
            {TweetReply.length > 1 &&
              (<span className="font-bold text-xs" onClick={() => setReply((prevState) => !prevState)} >MOSTRAR MAIS</span>)

            }
          </ReplyContent>
        ))
        : (
          TweetReply.map((item,index) => (
            <ReplyContent
              key={item.id}
              postId={item.id}
              countLike={_count.TweetLike}
              user={item.user}
              created_at={item.created_at}
              text={item.text}
              reply={TweetReply.length > index}
              type="reply"
              onSuccess={onSuccess}
            />
          ))
        )


      }

      <ReplyForm className="flex-1" postId={id} onSuccess={onSuccess} />
    </div>
  )
}