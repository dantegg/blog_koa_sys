/**
 * Created by dantegg on 17-1-4.
 */
import fs from 'fs'
import path from 'path'
import compose from 'koa-compose'

const middlewares = fs.readdirSync(__dirname)
    .filter(filename =>
        filename !== path.basename(__filename)
    )
    .map(filename =>
        require(`./${filename}`)
    )

export default compose(middlewares)
