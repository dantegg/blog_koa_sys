/**
 * Created by dantegg on 2017/1/7.
 */
const models = require('../models')
const NewsServices = require('./news')

exports.news = new NewsServices(models.blog)