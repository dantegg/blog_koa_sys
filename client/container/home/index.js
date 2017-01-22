/**
 * Created by dantegg on 2017/1/22.
 */
module.exports = {
    path: 'home',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./home'))
        },'home')
    }
}