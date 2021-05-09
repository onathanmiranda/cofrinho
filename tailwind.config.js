module.exports = {
    mode: 'jit',
    purge: [
        './src/**/*.{js,jsx,ts,tsx}', 
        './public/index.html'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        screens: {
            tablet: '640px',
            laptop: '1024px',
            desktop: '1280px',
            'lg-desktop': '1536px',
        },
        spacing: {
            px: '1px',
            0: '0px',
            1: '0.1rem',
            2: '0.2rem',
            3: '0.3rem',
            5: '0.5rem',
            8: '0.8rem',
            13: '1.3rem',
            21: '2.1rem',
            34: '3.4rem',
            55: '5.5rem',
            89: '8.9rem',
            144: '14.4rem',
            233: '23.3rem',
            377: '37.7rem',
            610: '61rem',
            987: '98.7rem',
            1597: '159.7rem'
        },
        fontSize: {
            xs: ['0.8rem', { lineHeight: '1.61' }],
            sm: ['1.3rem', { lineHeight: '1.61' }],
            base: ['1.6rem', { lineHeight: '1.61' }],
            lg: ['2.1rem', { lineHeight: '1.61' }],
            xl: ['3.4rem', { lineHeight: '1.28' }],
            '2xl': ['5.5rem', { lineHeight: '1.28' }],
            '3xl': ['8.9rem', { lineHeight: '1.28' }]
        },
        maxWidth: {
            px: '1px',
            0: '0px',
            1: '0.1rem',
            2: '0.2rem',
            3: '0.3rem',
            5: '0.5rem',
            8: '0.8rem',
            13: '1.3rem',
            21: '2.1rem',
            34: '3.4rem',
            55: '5.5rem',
            89: '8.9rem',
            144: '14.4rem',
            233: '23.3rem',
            377: '37.7rem',
            610: '61rem',
            987: '98.7rem',
            1597: '159.7rem',   
            none: 'none',
            full: '100%',
            min: 'min-content',
            max: 'max-content',
            prose: '65ch',
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
