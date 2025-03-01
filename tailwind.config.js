/** @type {import('tailwindcss').Config} */

export default {
  prefix: 'tw-',
  important: true,

  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    // 插件配置
    // import('@tailwindcss/typography')
    // plugin(function ({ addComponents }) {
    //   addComponents({
    //     '.btn': {
    //       padding: '.5rem 1rem',
    //       borderRadius: '.25rem',
    //       fontWeight: '600',
    //       backgroundColor: '#45918a'
    //     },
    //     '.btn-blue': {
    //       backgroundColor: '#3490dc',
    //       color: '#fff',
    //       '&:hover': {
    //         backgroundColor: '#2779bd'
    //       }
    //     },
    //     '.btn-red': {
    //       backgroundColor: '#e3342f',
    //       color: '#fff',
    //       '&:hover': {
    //         backgroundColor: '#cc1f1a'
    //       }
    //     }
    //   })
    // })
  ]
}
