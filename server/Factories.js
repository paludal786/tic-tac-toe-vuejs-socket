// const uuidv4 = require('uuid/v4')
const { v4: uuidv4 } = require('uuid');
uuidv4();

console.log("factories file called !...");

const createUser = ({ name = "" } = {}) => ({
    id: uuidv4(),
    name
})

module.exports = {
    createUser
}