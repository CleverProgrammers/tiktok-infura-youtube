import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import MainView from '../components/Mainview'
import { useAccount } from 'wagmi'
import { Toaster } from 'react-hot-toast'

const Home = () => {
  const [userAccount, setUserAccount] = useState('')

  const { address } = useAccount()

  useEffect(() => {
    setUserAccount(address)
  }, [address])

  return (
    <div className={styles.wrapper}>
      <Toaster position='top-center' />
      <ConnectButton />

      {useAccount && (
        <div className='app'>
          <MainView />
        </div>
      )}
    </div>
  )
}

export default Home
