import { useState } from 'react'
import style from '../styles/UploadModal.module.css'
import { useAppContext } from '../context/context'
import toast from 'react-hot-toast'

const UploadModal = () => {
  const [caption, setCaption] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const { createVideo } = useAppContext()

  const handleSubmit = async event => {
    event.preventDefault()
    if (!caption || !videoUrl) return

    toast.promise(createVideo(caption, videoUrl), {
      loading: 'Uploading Video This can take a moment... ⏳',
      success: 'Video Uploaded! 🎉',
      error: 'Something went wrong! 😢',
    })
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Upload New Video</div>
      <div className={style.inputField}>
        <div className={style.inputTitle}>Caption</div>
        <div className={style.inputContainer}>
          <input
            className={style.input}
            type='text'
            value={caption}
            onChange={event => setCaption(event.target.value)}
          />
        </div>
      </div>
      <div className={style.inputField}>
        <div className={style.inputTitle}>Video URL</div>
        <div className={style.inputContainer}>
          <input
            className={style.input}
            type='text'
            value={videoUrl}
            onChange={event => setVideoUrl(event.target.value)}
          />
        </div>
      </div>
      <div className={style.modalButtons}>
        <button
          onClick={() => setNewVideoShow(false)}
          className={`${style.button} ${style.cancelButton}`}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className={`${style.button} ${style.createButton}`}
        >
          Create New
        </button>
      </div>
    </div>
  )
}

export default UploadModal
