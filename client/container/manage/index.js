/**
 * Created by dantegg on 2017/1/22.
 */
module.exports = {
    path: 'manage',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./manage'))
        },'manage')
    }
}