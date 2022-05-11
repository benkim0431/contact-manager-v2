const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const PORT_NUM = 3000;
const apiPrefix = '/api/v1';
const API_KEY_HEADER_NAME = 'X-My-Api-token';
const TEST_KEY = 'angular-is-awesome';

const isNotAuthorizedRequest = (apiKey) => {
    const isAuthorized = TEST_KEY === apiKey;
    if(!isAuthorized){
        console.log(`${apiKey} not matched`);
    }
    return !isAuthorized;
}

let IN_MEMORY_USER_DB = [
    { no: 1, id: 'jwj0831', name: 'Woojin', phoneNum: '010-123-1234', mail: 'jwj0831@gmail.com', birthDate: '', sex: 'M' },
    { no: 2, id: 'kiljulee', name: 'Kilju', phoneNum: '010-123-1234', mail: 'kiljulee@abc.com', birthDate: '', sex: 'M' },
    { no: 3, id: 'coffeenjava', name: 'Jisu', phoneNum: '010-123-1234', mail: 'coffeenjava@naver.com', birthDate: '', sex: 'M' },
    { no: 4, id: 'dsboo', name: 'Dongsig', phoneNum: '010-123-1234', mail: 'dsboo@test.com', birthDate: '', sex: 'M' },
    { no: 5, id: 'hannason', name: 'Hanna', phoneNum: '010-123-1234', mail: 'hannason@test.com', birthDate: '', sex: 'F' }
];

app.get(`${apiPrefix}/users`,(req,res)=>{
    console.log(`[${req.method}] ${req.originalUrl}-${req.get(API_KEY_HEADER_NAME)}`);
    // if(isNotAuthorizedRequest(req.get(API_KEY_HEADER_NAME))){
    //     return res.status(403).send();
    // }

    if(IN_MEMORY_USER_DB.length === 0){
        return res.status(404).send('등록된 사용자가 없습니다.');
    }

    const reduceFn = user => ({no:user.no, name:user.name, mail: user.mail, phoneNum:user.phoneNum});
    return res.send(IN_MEMORY_USER_DB.map(reduceFn));
});

app.listen(PORT_NUM,()=> console.log(`start to listen on port ${PORT_NUM}`));
