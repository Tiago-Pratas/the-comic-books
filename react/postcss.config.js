const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./src/**/*.js', './src/**/*.jsx', './**/*.html'],
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});
module.exports = {
    plugins: [
        require('tailwindcss'),
        ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
        require('autoprefixer'),
    ],
};