#!/usr/bin/env node

const NS = ['create','babel','bootstrap'].join('-')
const shell = require('shelljs');
const argv = require('yargs').argv
const d = require('debug')(NS)
const path = require('path')
const NIY = 'TBD:NIY'
const package = require('../package.json')

const REPO_URL = package.repository.url

const SUCCESS_MESSAGE = NS + ' is cloned.'

shell.config.silent  = true
shell.config.verbose = true
shell.config.fatal   = false

function isGitInstalled() {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
    return false;
  } else {
    return true;
  }
}

d('start')
function createWithParents(targetDir) {
  return shell.mkdir('-p', targetDir)
}
function handleNonExisting(next, targetDir) {
  if (path.isAbsolute(targetDir)) {
    let r = createWithParents(targetDir)
    if (r.code !== 0) {
      next(r)
    } else {
      next(null, targetDir)
    }
  } else {
    let e = new Error('Target path is not absolute. ' + targetDir + ' ' + NIY)
    next(e)
  }
}

function exeGitCommand(next, cmd) {
  let command = cmd
  r = shell.exec(command)
  if (r.code !== 0) {
    e = new Error(r.stderr)
    shell.echo(e.toString())
    shell.exit(1)
  } else {
    next(r)
  }
}

function successMessage() {
  shell.echo(SUCCESS_MESSAGE)
}

if (isGitInstalled()) {
 if(argv && argv._ && argv._[0]){
   let targetDir = argv._[0]
   let result = shell.ls(targetDir)
   let e,r;
   switch (result.code) {
     case 2:
       // folder doesns't exist
       // create folder
       handleNonExisting((err, targetDir) => {
         if (err) {
           shell.echo(err.toString())
           shell.exit(1)
         } else {
           r = shell.cd(targetDir)
           if (r.code !== 0) {
             e = new Error(r.stderr)
             shell.echo(e.toString())
             shell.exit(1)
           } else {
             // clone master into current dir
             let command = [ 'git clone -b master' , REPO_URL , targetDir ].join(' ')
             let command1 = 'git remote add upstream ' + REPO_URL
             exeGitCommand((r) => {
               exeGitCommand((r) => {
                 successMessage()
               }, command1)
             }, command)
           }
         }
       }, targetDir)
       break;
     case 0:
       // folder exist
       r = shell.cd(targetDir)
       e = new Error('Target directory exist. ' + NIY)
       shell.echo(e.toString())
       shell.exit(1)
       // TODO check if empty , if so master branch can be cloned into it.
       break;
     default:
       e = new Error('nodejs script error : ' + result.stderr)
       shell.echo(e.toString())
       shell.exit(1)
   }
 } else {
   let e = new Error('Non valid arguments.')
   shell.echo(e.toString())
   shell.exit(1)
 }
}


