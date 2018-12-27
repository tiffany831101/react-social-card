# Social Card with React
A mini-project inspired by Dave Ceddia's article [*6 Fun React Projects You Can Build Today*](https://daveceddia.com/react-practice-projects/).

### Install dependencies
```bash
npm install
```

### Create db.json with some data
```json
{
  "posts": [
    {
      "id": "aff53c84-ea89-438e-85f8-e598a8948414",
      "authorName": "Mr. Doggo",
      "authorID": "19301ca2-58e5-46c6-a6af-c1fc8d43fe97",
      "publishedAt": 1545448920,
      "text": "Who let the dogs out?",
      "imageURL": "",
      "likes": [
        {
          "userName": "cvpqopsr",
          "userID": "5d4dad3c-b2db-4740-bab4-a9220457bcde"
        }
      ],
      "comments": [
        {
          "id": "7c759731-5e85-451c-a202-c1194c5e1561",
          "text": "Who? Who?? Who! Who!! Who?!",
          "authorName": "eklfky544l",
          "authorID": "f4ece933-cb6b-45df-b06e-5800d7d784b9",
          "publishedAt": 1545448920,
          "likes": []
        }
      ],
      "shares": []
    }
  ]
}
```

### Run json-server
```bash
npm run json
```

### Run Webpack Dev Server
```bash
npm run dev
```
