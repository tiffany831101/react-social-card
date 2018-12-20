import uuid from 'uuid/v4'
import moment from 'moment'

const post = {
    metaInfo: {
        authorName: '趙倍孜',
        authorID: uuid(),
        publishedAt: moment('2018-12-17 13:07').unix(),
    },
    text: '<徵 學生>\n\n對象: 放寒假的小朋友（若需延長可議）\n地點: 新竹區\n時間: 皆可（但時間需固定）\n時薪: 可議\n\n老師資訊：\n學歷：清大碩\n語文證照：中文檢定中高級、英文檢定中高級\n\n放寒假到過年期間小孩不知道該怎麼辦嗎？老師喜歡小朋友，又很有耐心，曾經當過補習班英文助教，不論是陪讀或是傳授英文知識都可以喔！\n\n*有意願者可以私訊我~',
}

export default post
