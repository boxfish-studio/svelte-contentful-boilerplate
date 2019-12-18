// TODO: purgecss isn't working correctly. It deletes tailwind's classes even if ther are added to a component, which isn't correct.
// const purgecss = require('@fullhuman/postcss-purgecss')({
//     content: ['./src/**/*.html', './src/**/*.svelte'],

//     whitelistPatterns: [/svelte-/],

//     defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || []
// })

const production = !process.env.NODE_ENV === 'development'

// TODO: Make purgecss work
// module.exports = {
//     plugins: [require('tailwindcss'), ...(production ? [purgecss] : [])]
// }

module.exports = {
    syntax: require('postcss-scss'),
    plugins: [require('precss'), require('tailwindcss')]
}
