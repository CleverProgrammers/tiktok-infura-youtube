import { useContext, createContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { createContract } from '../utils/contract'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState('')
  const [contract, setContract] = useState(null)
  const [videos, setVideos] = useState([])

  const { address } = useAccount()

  useEffect(() => {
    setUserAddress(address)
    setContract(createContract())
  }, [address])

  useEffect(() => {
    getAllVideos()
  }, [contract])

  const createVideo = async (caption, url) => {
    console.log(caption, url)
    if (contract && address) {
      try {
        const receipt = await contract.methods
          .createVideo(caption, url)
          .send({ from: userAddress, gas: 1000000, gasPrice: null })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const getAllVideos = async () => {
    if (contract) {
      try {
        const tiktoks = await contract.methods.getVideos().call()
        const formattedVideos = tiktoks.map(video => {
          return {
            caption: video['caption'],
            url: video['url'],

            dislikes: video['dislikes'],
            owners: video['owner'],
          }
        })
        setVideos(formattedVideos)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const getNumberOfLikes = async id => {
    if (contract) {
      try {
        const likes = await contract.methods.getLikes(id).call()
        console.log(likes)
        return likes
      } catch (error) {
        console.error(error)
      }
    }
  }

  const isLiked = async id => {
    if (contract && videos.length > 0) {
      try {
        const userLiked = await contract.methods
          .likedUsers(userAddress, id)
          .call()

        return userLiked
      } catch (error) {
        console.error(error)
      }
    }
  }

  const likeVideo = async id => {
    if (contract && address) {
      try {
        const receipt = await contract.methods.likeVideo(id).send({
          from: userAddress,
          gas: 3000000,
          gasPrice: null,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const dislikeVideo = async id => {
    if (contract && address) {
      try {
        const receipt = await contract.methods.dislikeVideo(id).send({
          from: userAddress,
          gas: 3000000,
          gasPrice: null,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <AppContext.Provider
      value={{
        createVideo,
        likeVideo,
        dislikeVideo,
        videos,
        isLiked,
        getNumberOfLikes,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
