import { useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { GoComment } from 'react-icons/go'
import { RiShareForwardFill } from 'react-icons/ri'
import style from '../styles/Sidebar.module.css'
import { useAppContext } from '../context/context'
import toast from 'react-hot-toast'

const Sidebar = ({ address, likes, likersAddresses, id }) => {
  const { likeVideo, dislikeVideo, getNumberOfLikes, isLiked } = useAppContext()

  const [liked, setLiked] = useState(false)
  const [numberOfLikes, setNumberOfLikes] = useState(0)

  useEffect(() => {
    const checkIfLiked = async () => {
      const liked = await isLiked(id)
      const likes = await getNumberOfLikes(id)
      setNumberOfLikes(likes)
      setLiked(liked)
    }
    checkIfLiked()
  }, [liked, isLiked, getNumberOfLikes])

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarButton}>
        {liked ? (
          <AiFillHeart
            className={style.redHeart}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              toast.promise(dislikeVideo(id), {
                loading: 'Unliking Video This can take a moment... ⏳',
                success: 'Video Unliked! 🎉',
                error: 'Something went wrong! 😢',
              })
            }
          />
        ) : (
          <AiOutlineHeart
            style={{ cursor: 'pointer' }}
            onClick={() =>
              toast.promise(likeVideo(id), {
                loading: 'Liking Video This can take a moment... ⏳',
                success: 'Video Liked! 🎉',
                error: 'Something went wrong! 😢',
              })
            }
          />
        )}
        <span className={style.sidebarButtonLabel}>{numberOfLikes}</span>
      </div>
      <div className={style.sidebarButton}>
        <GoComment />
        <span className={style.sidebarButtonLabel}>10</span>
      </div>
      <div className={style.sidebarButton}>
        <RiShareForwardFill />
        <span className={style.sidebarButtonLabel}>10</span>
      </div>
    </div>
  )
}

export default Sidebar
