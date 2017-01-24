/**
 * Created by dantegg on 2017/1/22.
 */
module.exports = {
    path: 'blog/:id',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./blog').default)
        },'blog')
    }
}