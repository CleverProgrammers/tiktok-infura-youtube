import { useState, useEffect } from 'react'
import Video from './Video'
import BottomBar from './BottomBar'
import style from '../styles/MainView.module.css'
import { useAppContext } from '../context/context'

const MainView = () => {
  const [tiktoks, setTiktoks] = useState([
    {
      owners: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
      caption: 'Dummy Video',
      url: 'https://v16m-webapp.tiktokcdn-us.com/09cb8974372b204b2abceb9d6b62df3d/632d219d/video/tos/useast5/tos-useast5-pve-0068-tx/7b48a5c889cf491181e3654649e5aabd/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=1380&bt=690&cs=0&ds=3&ft=ebtHKH-qMyq8ZZkJfhe2NlLyfl7Gb&mime_type=video_mp4&qs=0&rc=Nmg6OzVlZDc5OTQ0OTQ8NEBpMzV5OTk6ZnF0ZTMzZzczNEA2NGIyYzQvNTExNS0vMV8uYSNpZWJycjRvNDVgLS1kMS9zcw%3D%3D&l=202209222100509DC958B307CA6E0DB5AB',
      likes: 10,
    },
  ])

  const {} = useAppContext()

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
              address={tiktok.owners}
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
