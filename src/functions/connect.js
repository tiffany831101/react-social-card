const connectTo = async (url) => {
    let response
    try {
        response = await fetch(url)
        response = await response.json()
    } catch(error) {console.log(error)}
    return response
}

export default connectTo
