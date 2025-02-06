import imagesData from '../images/images.json'
import landing from "../images/landing.jpg"

export interface ImageUrls {
  logo: string
  banner: string
  social: {
    instagram: string
    facebook: string
    twitter: string
  }
}

export const loadImages = (): ImageUrls => {
  return imagesData as ImageUrls
}

export const getImageUrl = (path: string): string => {
  return landing
}

export const getSocialImages = () => {
  return imagesData.social
}

export const getLogoImage = () => {
  return imagesData.logo
}

export const getBannerImage = () => {
  return imagesData.banner
}
