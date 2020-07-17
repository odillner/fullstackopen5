let API_URL = process.env.REACT_APP_API_URL

if (process.env.NODE_ENV === 'production' || 'testing') {
    API_URL = '/'
}

module.exports = {
    API_URL
}