import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'


const MAX_TWEET_CHAR = 250;


function TweetForm() {
  const [text, setText] = useState('')

  function changeText(e) {
    setText(e.currentTarget.textContent)
  }

  return (
    <div className="border-b border-silver space-y-6 p-4">
      <div className='flex space-x-5'>
        <img className='w-7' src="/src/avatar.png" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </div>
      <form className='pl-12 text-lg flex flex-col' >
        <span
          contenteditable="true"
          data-placeholder='O que está acontecendo?'
          name="text"
          className="form-tweet bg-transparent outline-none resize"
          onInput={changeText}
        />

        <div className='flex justify-end items-center space-x-3'>
          <span className="text-sm">
            {
              text.length > MAX_TWEET_CHAR 
              ? <span class="text-red-500">{text.length}</span>
              : <span>{text.length}</span>
            } / <span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
          </span>

          <button
            className="bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={text.length > MAX_TWEET_CHAR}
            >Tweet</button>
        </div>
      </form>
    </div>
  )

}

function Tweet({ avatar, name, username, children }) {
  return (
    <div className="flex p-4 space-x-3 border-b border-silver">
      <div>
        <img src={avatar} />
      </div>

      <div className="space-y-1">
        <span className="font-bold text-sm">{name}</span>{" "}
        <span className="text-sm text-silver">@{username}</span>
        <p>
          {children}
        </p>
        <div className="flex space-x-1 text-silver">
          <HeartIcon className="w-6 stroke-1 stroke-silver" />
          <span>1.2k</span>
        </div>
      </div>
    </div>
  )
}

export const Home = () => {
  return (
    <>
      <TweetForm />
      <div>
        <Tweet name="antVasco" username="vasco" avatar="/src/avatar.png">vasco da gama b</Tweet>
      </div>
    </>
  )
}