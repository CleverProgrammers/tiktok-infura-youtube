import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiFillHome, AiOutlineCompass } from 'react-icons/ai'
import { IoIosAdd } from 'react-icons/io'
import { BiMessageMinus } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import Modal from 'react-modal'
import UploadModal from './UploadModal'
import { modalStyles } from '../utils/contract'
import style from '../styles/BottomBar.module.css'

Modal.setAppElement('#__next')

const BottomBar = () => {
  const router = useRouter()

  return (
    <div className={style.wrapper}>
      <AiFillHome className={style.bottomIcon} />
      <AiOutlineCompass className={style.bottomIcon} />
      <Link href='/?upload=1'>
        <div className={style.addVideoButton}>
          <IoIosAdd className={style.bottomIcon} style={{ color: 'black' }} />
        </div>
      </Link>
      <BiMessageMinus className={style.bottomIcon} />
      <BsPerson className={style.bottomIcon} />
      <Modal
        isOpen={!!router.query.upload}
        onRequestClose={() => router.push('/')}
        style={modalStyles}
      >
        <UploadModal />
      </Modal>
    </div>
  )
}

export default BottomBar
