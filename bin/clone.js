#!/usr/bin/env node

const path = require('path')
const yargs = require('yargs')

const consts  = require('./consts');
const shell = consts.shell;
const REPO_URL = consts.REPO_URL;
const SUCCESS_MESSAGE = consts.SUCCESS_MESSAGE;
const NS = consts.NS;
const d = require('debug')(NS)
const argv = yargs.argv

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
    let e = new Error('Target path must be absolute. ' + targetDir)
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
       e = new Error('Target directory must NOT exist. ')
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


