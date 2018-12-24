const connectTo = async (url) => {
    let response
    try {
        response = await fetch(url)
        if (response.ok) {
            response = await response.json()
        } else {
            throw new Error('抓不到資料')
        }
    } catch(error) {console.log(error)}
    return response
}

export default connectTo
