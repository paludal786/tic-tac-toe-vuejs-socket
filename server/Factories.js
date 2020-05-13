// const uuidv4 = require('uuid/v4')
const { v4: uuidv4 } = require('uuid');
uuidv4();

console.log("factories file called !...");

const createUser = ({ name = "", socketId = null, playing = false, online = false } = {}) => ({
    id: uuidv4(),
    name,
    socketId,
    playing,
    online,
})

const userList = ({} = {}) => ({
    id: 'nhi pta'
})

module.exports = {
    createUser,
    userList
}
