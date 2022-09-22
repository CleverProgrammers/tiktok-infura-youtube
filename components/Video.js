import { useRef, useState, useEffect } from 'react'
import Footer from './Footer'
import Sidebar from './Sidebar'
import style from '../styles/Video.module.css'
import { useAppContext } from '../context/context'

const Video = ({ address, caption, videoUrl, likes, id }) => {
  const { getUsersThatLiked } = useAppContext()

  const [playing, setPlaying] = useState(false)
  const [likersAddresses, setLikersAddresses] = useState([])

  console.log(caption)

  const videoRef = useRef(null)

  const handleClick = () => {
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className={style.wrapper}>
      <video
        className={style.videoPlayer}
        loop
        onClick={handleClick}
        ref={videoRef}
        src={videoUrl}
        style={{ objectFit: 'cover' }}
      />

      <Footer address={address} caption={caption} />

      <Sidebar
        address={address}
        likes={likes}
        likersAddresses={likersAddresses}
        id={id}
      />
    </div>
  )
}

export default Video
