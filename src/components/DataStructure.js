import uuid from 'uuid/v4'
import moment from 'moment'

const post = {
    metaInfo: {
        authorName: '趙倍孜',
        authorID: uuid(),
        publishedAt: moment('2018-12-17 13:07').unix(),
    },
    text: '<徵 學生>\n\n放寒假到過年期間小孩不知道該怎麼辦嗎？老師喜歡小朋友，又很有耐心，曾經當過補習班英文助教，不論是陪讀或是傳授英文知識都可以喔！\n\n*有意願者可以私訊我~',
    imageURL: 'https://purr.objects-us-east-1.dream.io/i/20170114_1241212.jpg'
}

export default post
