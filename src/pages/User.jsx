import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { Tweet } from '../components/Tweet'
import Loading from '../components/Loading'

import api from "../services/api"

export function User() {
    const [userInfo, setUserInfo] = useState(null)
    const location = useLocation()
    const userName = location.pathname.replace('/', '')

    const getUserInfo = async (username) => {
        const res = await api.get(`/user/${username}`)
        setUserInfo(res.data)
    }

    useEffect(() => {
        getUserInfo(userName)
    }, [])

    if (!userInfo) {
        return <Loading />
    }
    return (

        <div>
            <div className="flex flex-col justify-end h-[150px] md:h-[250px] border-b border-silver space-x-4 p-4 bg-gradient-to-t from-birdBlue">
                <div className="flex items-center space-x-4">
                    <div>
                        <img className="w-13 h-13 rounded-full object-cover md:w-20 md:h-20" src={userInfo.avatar} />
                    </div>
                    <div className="flex space-x-4 space-y-1">
                        <div className="flex flex-col space-y-1">
                            <h2 className="font-bold text-md md:text-lg">{userInfo.name}</h2>
                            <span className='text-white text-sm md:text-md'>@{userInfo.username}</span>
                        </div>
                    </div>
                        <span className="self-end text-white text-sm" style={{marginLeft:'auto'}}>{userInfo.tweetsTotal} tweets</span>
                </div>
            </div>

            <div>
                {userInfo.tweets.map(item => (
                    <Tweet key={item.id} data={item} onSuccess={getUserInfo(userName)} />
                ))
                }
            </div>
        </div>
    )
}