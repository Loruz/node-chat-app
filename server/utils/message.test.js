let expect = require('expect')
let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('Shoud generate correct message object', ()=>{
        let from = 'Jen'
        let text = 'some message'
        let message = generateMessage(from,text)

        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from, text});
    })
})

describe('generateLocationMessage', () => {
    it('Shoud generate correct location object ', () => {
        let from = 'Deb'
        let lat = 1
        let long = 1
        let url = 'https://www.google.com/maps?q=1,1'
        let message = generateLocationMessage(from, lat , long)

        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from, url})
    })
})