const package = require('../package.json')
const REPO_URL = package.repository.url
const NS = ['babel','bootstrap'].join('-')
const SUCCESS_MESSAGE = NS + ' is cloned.'
const shell = require('shelljs');

shell.config.silent  = true
shell.config.verbose = false
shell.config.fatal   = false

module.exports = {REPO_URL, package, NS, SUCCESS_MESSAGE, shell }
