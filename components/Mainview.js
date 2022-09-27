import { useState, useEffect } from 'react'
import Video from './Video'
import BottomBar from './BottomBar'
import style from '../styles/MainView.module.css'
import { useAppContext } from '../context/context'

const MainView = () => {
  const [tiktoks, setTiktoks] = useState([])

  const { videos } = useAppContext()

  useEffect(() => {
    setTiktoks(videos.reverse())
  }, [videos])

  return (
    <div>
      <div className={style.appVideos}>
        {tiktoks.length === 0 ? (
          <div className={style.noVideoContainer}>
            <h1 className={style.noVidPrompt}>No Videos</h1>
          </div>
        ) : (
          tiktoks.map((tiktok, index) => (
            <Video
              key={index}
              address={tiktok.owner}
              caption={tiktok.caption}
              videoUrl={tiktok.url}
              likes={tiktok.likes}
              id={index}
            />
          ))
        )}
      </div>
      <BottomBar />
    </div>
  )
}
export default MainView
