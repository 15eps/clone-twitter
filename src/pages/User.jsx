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
            <div className="flex flex-col items-center space-x-4 p-4 bg-birdBlue">

                <div>
                    <img className="w-20 h-20 rounded-full object-cover md:w-24 md:h-24" src={userInfo.avatar} />
                </div>
                <div className="flex flex-col items-center space-y-1">
                        <h2 className="font-bold text-md md:text-lg">{userInfo.name}</h2>
                        <span className='text-white text-xs md:text-md'>@{userInfo.username}</span>                   
                </div>

            </div>

            
                {userInfo.tweetsTotal <= 0 && ("Nenhuma publicação feita ainda")}
                
                <>
                {userInfo.tweets.map(item => (
                    <Tweet key={item.id} data={item} onSuccess={getUserInfo(userName)} />
                ))}
                </>
        </div>
    )
}