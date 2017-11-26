#!/usr/bin/env node

const shell = require('shelljs');
const path = require('path')
const yargs = require('yargs')

const consts  = require('./consts');
const REPO_URL = consts.REPO_URL;
const package = consts.package;
const SUCCESS_MESSAGE = consts.SUCCESS_MESSAGE;
const NS = consts.NS;
const d = require('debug')(NS)
const argv = yargs.argv

shell.config.silent  = true
shell.config.verbose = true
shell.config.fatal   = false

d('start')
//TODO should be runned forom repos root folder
try {
  let name  = package.name
  d(name, NS)
  if (name === NS) {
    let options, src, target, r;
    let current_dir = [shell.pwd().stdout, 'bin'].join('/')
    options = '-s'
    src = current_dir + '/clone.js'
    target = '~/bin/clone-'+ NS
    r = shell.ln(options, src, target)
    if (r.code !== 0) {
      shell.echo(r.stderr);
      shell.exit(1)
    } else {
      shell.echo(SUCCESS_MESSAGE);
      shell.exit(0)
    }
  } else {
    shell.echo("Must be executed from repository root or bin directory.");
    shell.exit(1)
  }

} catch (e) {
  /* handle error */
  shell.echo("Must be executed from repository root or bin directory.");
  shell.exit(1)
}

