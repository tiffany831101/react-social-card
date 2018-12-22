import uuid from 'uuid/v4'
import moment from 'moment'

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

const post = {
    metaInfo: {
        authorName: 'ArimuraChika',
        authorID: uuid(),
        publishedAt: moment('2018-12-22 11:22').unix(),
    },
    text: '台灣 天然能源缺乏的地方\n20多年前的小學社會課本 甚至寫了97%的能源得靠進口\n\n核能? 大家說核爆了 死半個台灣\n火力? 空氣汙染 中電北送? 南電北送?\n風力? 蓋那一根站在那 20億以上?\n潮汐? 台灣明明環海 八成是因為被政客貪汙經費沒了搞不下去\n\n我覺得受刑人踩腳踏車發電 真的不賴\n台灣犯罪率低 現在廢死又要死刑犯人權 本身就很可笑\n現在又因為兩人權宣言 不可酷刑\n那至少讓他們入獄期間 好好壓榨有生力量 為社會做出貢獻 這樣也不賴\n\n到底啥款的發電 適合台灣?',
    imageURL: ''
}

export {post as default, createFakeLikers}
