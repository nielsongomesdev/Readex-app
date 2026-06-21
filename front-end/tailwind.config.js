import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '').replace(/\\/g, '/')

export default {
  content: [
    `${projectRoot}/index.html`,
    `${projectRoot}/src/**/*.{vue,js,ts,jsx,tsx}`
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFF0CC',
          DEFAULT: '#B06E02',
          dark: '#794C02',
        },
        secondary: {
          light: '#DCE5F4',
          DEFAULT: '#13213C',
          dark: '#0A1426',
        },
        bege: '#E5DED1',
        neutral: {
          100: '#13213C',
          200: '#3C352A',
          300: '#794C02',
          400: '#968569',
          500: '#B4A996',
          600: '#DCD6C8',
          700: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}