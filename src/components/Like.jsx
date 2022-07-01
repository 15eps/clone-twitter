import { useContext, useEffect, useState } from "react"
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as Liked } from '@heroicons/react/solid'

import api from "../services/api"

export function Like({ postId, type,like }) {

    const [liked, setLiked] = useState(false)

    const getLike = async () => {
        const typeLike  = type != "reply" ? `/like?postId=${postId}` : `/like/reply?postId=${postId}`

        const res = await api.get(typeLike)
        if (res.status === 200) setLiked(true)

    }

    const fetchLike = async () => {
        const typeLike  = type != "reply" ? `/like?postId=${postId}` : `/like/reply?postId=${postId}`

        if (liked) {
            const res = await api.delete(typeLike)
            if (res.status === 200) setLiked(false)

        } else {
            const res = await api.post(typeLike)
            if (res.status === 200) setLiked(true)
        }

        getLike()
    }

    useEffect(() => {
        getLike()
    }, [])


    return (
        <div className="flex space-x-1">
            {liked ?
                <Liked className="w-6 cursor-pointer stroke-1 text-red-500" onClick={fetchLike} />
                :<HeartIcon className="w-6 cursor-pointer stroke-1 stroke-silver" onClick={fetchLike} />}
            {like > 0 && (<span>{like}</span>)}
        </div>
    )


}