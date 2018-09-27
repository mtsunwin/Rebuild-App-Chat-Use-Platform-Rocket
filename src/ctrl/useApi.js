
/*
    List api:
        1/ Authentication
            - Login
            - logout
            - register: mặc định là user

        2/ Rooms:
            - getRoom: lấy ra danh sách room đã được add

        3/ Channels:
            - creatChannel
            - getUserInChannel
            - getChannelMessHistory
            - leaveChannel

        4/ Direct Message ( IM ):
            - createIM
            - getImHistory

        5/ Messages:
            - sendMess
            - deleteMessage
            - getMessageInfo
            - reactMessage
            - editMessage
*/
import React from 'react'
import axios from './request_api_rocket'

class useApi extends React.Component {

    // 1. Authentication
    login(username, password, callback) {
        axios.post('/login', {
            username: username,
            password: password,
        }).then(response => {
            console.log(response)
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    loginWithFacebook(accessToken, expiresIn, callback) {
        axios.post('/login', {
            serviceName: 'facebook',
            secret: '01c542efa0559407596162c02a366579',
            // secret: 'b5222fa7378e3add050404750c0fdc5d',
            accessToken,
            expiresIn
        })
            .then(callback)
            .catch(message => console.log(message))
    }

    logout() {
        axios({
            method: 'POST',
            url: '/logout',
            headers: {
                'X-Auth-Token': sessionStorage.getItem("authToken"),
                'X-User-Id': sessionStorage.getItem("userId")
            }
        }).then(response => {
            sessionStorage.clear();
            window.location.reload();
        })
    }

    register(username, password, name, email, callback) {
        axios({
            method: 'POST',
            url: '/users.register',
            data: {
                username: username,
                pass: password,
                name: name,
                email: email
            }
        }).then(response => {
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }
    getAllUser(callback) {
        axios({
            method: 'GET',
            url: '/users.list?query={}',
            headers: {
                'X-Auth-Token': 'BSIcbdTZpDWkl9aeIauV8VA0uefwXNsN-Kafmn6SUQO',
                'X-User-Id': 'AHBrCEjwq4H2TYdj9'
            }
        }).then(response => {
            return callback(response);
        }).catch(function (message) {
            console.log(message);
        })
    }
    // 2. Rooms:
    getRoom(callback) {
        axios({
            method: 'GET',
            url: '/rooms.get',
            headers: {
                'X-Auth-Token': sessionStorage.getItem("authToken"),
                'X-User-Id': sessionStorage.getItem("userId")
            }
        }).then(response => {
            return callback(response.data.update)
        })
            .catch(function (message) {
                console.log(message);
            })
    }


    // 3. Channels
    createChannel(channelName, listUser, callback) {
        axios({
            method: 'POST',
            url: '/channels.create',
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            },
            data: {
                name: channelName,
                members: listUser
            }
        }).then(response => {
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }
    getChannelMessHistory(roomID, callback) {
        axios({
            method: 'GET',
            url: '/channels.history?roomId=' + roomID,
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            }
        }).then(response => {
            return callback(response)
        })
            .catch(function (message) {
                console.log(message);
            })
    }
    getUserInGroup(roomID, callback) {
        axios({
            method: 'GET',
            url: '/channels.members?roomId=' + roomID,
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            }
        }).then(response => {
            return callback(response);
        }).catch(function (message) {
            console.log(message);
        })
    }
    getUserInChannel(roomID, callback) {
        axios({
            method: 'GET',
            url: '/channels.members?roomId=' + roomID,
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            }
        }).then(response => {
            return callback(response);
        }).catch(function (message) {
            console.log(message);
        })
    }
    createIM(username, callback) {
        axios({
            method: 'POST',
            url: '/im.create',
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            },
            data: {
                username: username
            }
        }).then(response => {
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }
    getImHistory(roomId, callback) {
        axios({
            method: 'GET',
            url: '/im.history?roomId=' + roomId,
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            }
        }).then(response => {
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }
    // 5.  Messages
    sendMess(roomID, msg, callback) {
        axios({
            method: 'POST',
            url: '/chat.sendMessage',
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            },
            data: {
                message: {
                    rid: roomID,
                    msg: msg
                }
            }
        }).then(response => {
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    deleteMessage(roomId, msgId, callback) {
        axios({
            method: 'POST',
            url: '/chat.delete',
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            },
            data: {
                roomId: roomId,
                msgId: msgId,
                asUser: "true"      // Quy định chỉ người gửi mới được xóa tn của họ
            }
        }).then(response => {
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    getMessageInfo(msgId, callback) {
        axios({
            method: 'GET',
            url: '/chat.getMessage?msgId=' + msgId,
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            }
        }).then(response => {
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    reactMessage(msgId, emoji, callback) {
        axios({
            method: 'POST',
            url: '/chat.react',
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            },
            data: {
                messageId: msgId,
                emoji: emoji
            }
        }).then(response => {
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    editMessage(roomId, msgId, text, callback){
        axios({
            method: 'POST',
            url: '/chat.update',
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            },
            data: {
                roomId: roomId,
                messageId: msgId,
                text: text
            }
        }).then(response => {
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    getPresence(user) {  //TODO: use `user` argument
        return axios({
            method: 'GET',
            url: '/users.getPresence',
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            }
        })
    }
}

export default new useApi();
