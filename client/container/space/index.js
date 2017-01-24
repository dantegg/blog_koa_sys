/**
 * Created by dantegg on 2017/1/22.
 */
module.exports = {
    path: 'space',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./space').default)
        },'space')
    }
}