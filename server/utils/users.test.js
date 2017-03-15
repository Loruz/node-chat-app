const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
    let users

    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: '1',
            name: 'tomas',
            room: 'Node'
        }, {
            id: '2',
            name: 'Pomas',
            room: 'React'
        }, {
            id: '3',
            name: 'Mergike',
            room: 'Node'
        }]
    })

    it('Should add new user', () => {
        let users = new Users()
        let user = {
            id: '123',
            name: 'Tadas',
            room: 'The fanas'
        }
        let resUser = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([user])
    })

    it('Shoud remove a user', () => {
        let userId = '3'
        let user = users.removeUser(userId)

        expect(user.id).toBe(userId)
        expect(users.users.length).toBe(2)
    })

    it('Should not remove user', () => {
        let userId = '99'
        let user = users.removeUser(userId)

        expect(user).toNotExist()
        expect(users.users.length).toBe(3)
    })

    it('Should find user', () => {
        let userId = '2'
        let user = users.getUser(userId)
        expect(user.id).toBe(userId)
    })

    it('Should not find user', ()=> {
        let userId = '999'
        let user = users.getUser(userId)
        expect(user).toNotExist()
    })

    it('Shoud return names for node course', () => {
        let userList = users.getUserlist('Node')
        expect(userList).toEqual(['tomas', 'Mergike'])
    })
})