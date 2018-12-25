import uuid from 'uuid/v4'

const createFakeLikers = (length, random=true) => {
    const users = []
    for (let i = 0; i < length; i++) {
        let swch = random ? (Math.random() < 0.4) : true
        if (swch) {
            users.push({
                userName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                userID: uuid()
            })
        }
    }
    return users
}

export default createFakeLikers
