import { API_BASE_URL } from "../constants/base"

const getAssets = async (day: number) =>
  await fetch(API_BASE_URL + `/assets?day=${day}`)

export default getAssets
