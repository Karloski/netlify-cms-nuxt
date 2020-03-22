/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    screens: {
      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#DBAB00',
      'secondary': '#9B1111',
      'tiertary': '#181025',
    }),
    extend: {
      'width': {
        '7/10': '70%'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive']
  },
  plugins: []
}
