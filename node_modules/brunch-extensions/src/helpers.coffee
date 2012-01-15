async = require 'async'
fs = require 'fs'
path = require 'path'
util = require 'util'

# Copies single file and executes callback when done.
exports.copyFile = (source, destination, callback) ->
  read = fs.createReadStream source
  write = fs.createWriteStream destination
  util.pump read, write, -> callback?()

# Asynchronously walks through directory tree, creates directories and copies
# files. Similar to `cp -r` in Unix.
# 
# Example
# 
#   walkTreeAndCopyFiles 'assets', 'build'
# 
exports.walkTreeAndCopyFiles = (source, destination, callback) ->
  fs.readdir source, (error, files) ->
    return callback error if error

    # iterates over current directory
    async.forEach files, (file, next) ->
      return next() if file.match /^\./

      sourcePath = path.join source, file
      destPath = path.join destination, file

      fs.stat sourcePath, (error, stats) ->
        if not error and stats.isDirectory()
          fs.mkdir destPath, 0755, ->
            exports.walkTreeAndCopyFiles sourcePath, destPath, (error, destPath) ->
              if destPath
                callback error, destPath
              else
                next()
        else
          exports.copyFile sourcePath, destPath, ->
            callback error, destPath
            next()
    , callback
