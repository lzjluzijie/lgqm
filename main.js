var electron = require('electron')
var next = require('next')
const { execOnce } = require("next/dist/shared/lib/utils")

var app = electron.app

var BrowserWindow = electron.BrowserWindow

var minWindow = null

app.on('ready',()=>{
  minWindow = new BrowserWindow({
    width:1200,
    height:800,
  })
  electron.Menu.setApplicationMenu(null)
  var exec = require('child_process').exec
  exec('npm run start')

  minWindow.loadURL('http://localhost:3000/')

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })
})
