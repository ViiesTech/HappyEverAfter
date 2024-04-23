import { Dimensions } from "react-native"
const { width, height } = Dimensions.get('screen')

export const CARD = {
  WIDTH: width * 0.9,
  HEIGHT: height * 0.78,
  BORDER_RADIUD: 20,
  OUT_OF_SCREEN: width + 0.5 * width,
}

export const COLORS = {
  like: '#00eda6',
  nope: '#ff006f',
  black: '#000',
  white: '#fff',
  red: '#BF0B30',
  yellow: 'yellow'
}

export const ACTION_OFFSET = 100;