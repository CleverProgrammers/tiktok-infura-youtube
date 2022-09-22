import styles from '../styles/Home.module.css'
import MainView from '../components/Mainview'
import { Toaster } from 'react-hot-toast'

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Toaster position='top-center' />

      {true && (
        <div className='app'>
          <MainView />
        </div>
      )}
    </div>
  )
}

export default Home
