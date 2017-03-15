const expect = require('expect')

const {isRealString} = require('./validation')

describe('isRealString', () => {
    it ('shoud reject non-string values', () => {
        var res = isRealString(98)
        expect(res).toBe(false)
    })

    it ('Shoud reject string with only spaces', () => {
        var res = isRealString('     ')
        expect(res).toBe(false)
    })

    it ('should allow string with non-space characters', () => {
        var res = isRealString('   Tom    ')
        expect(res).toBe(true)
    })
})