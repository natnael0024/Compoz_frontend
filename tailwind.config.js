/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'index.html',
    'src/**/**/*.jsx'
  ],
  theme: {
  
    extend: {
      colors: {
        primary: '#000',
        secondary: '#000',
        tertiary: '#f3f3f3',
        bgprimary:'#FAF0E6',
        light: '#ffffff',
      },
      fontFamily: {
        sans: ['JetBrains Mono'],
        serif: ['Poppins']
    },
  
    },
  },
  plugins: [],
}

