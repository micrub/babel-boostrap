const package = require('../package.json')
const REPO_URL = package.repository.url
const NS = ['babel','bootstrap'].join('-')
const SUCCESS_MESSAGE = NS + ' is cloned.'

module.exports = {REPO_URL, package, NS, SUCCESS_MESSAGE }
