// Import all images
const images = {
  logo: new URL('../../assets/images/logo.png', import.meta.url).href,
  // Add more images here as needed
} as const

export type ImageKey = keyof typeof images

export const loadImage = (key: ImageKey): string => {
  return images[key]
}

// Preload all images
export const preloadImages = (): Promise<void[]> => {
  return Promise.all(
    Object.values(images).map(src => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve()
        img.onerror = reject
      })
    })
  )
}

// Export image URLs
export const ImageUrls = images
