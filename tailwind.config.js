module.exports={
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundColor: {
                'app-blue': '#6B85E6',
            },
            backgroundImage: {
                'app-gradient': 'linear-gradient(to top right, #6C5DD3, #4364AC)'
            },
            textColor: {
                'app-blue': '#6B85E6',
                'app-gray': '#D3D3D3'
            },
            borderColor: {
                'app-blue': '#6B85E6'
            },
            height: {
                '1/10': '10%',
                '9/10': '90%',
                '1/8': '12.5%',
                '7/8': '87.5%'
            },
            width: {
                '1/7': "15%",
                '6/7': "85%",
                '1/20': "5%",
                '19/20': "95%",
            },
            fontFamily:{
                'poppins':['Poppins']
            }
        },
    },
    variants: {
        extend: {
            borderWidth: ['hover']
        },
    },
    plugins: [],
}