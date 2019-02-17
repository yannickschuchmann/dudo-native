import { Asset } from 'expo'
import { Image } from 'react-native'

export const cacheImages = list => Promise.all(
  list.map(
    image => {
      try {
        return typeof image === 'string'
          ? Image.prefetch(image)
          : Asset.fromModule(image).downloadAsync()
      } catch (e) {
        console.log(e)
        return Promise.resolve()
      }
    }
  )
)
