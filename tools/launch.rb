require 'fileutils'

Dir.chdir("/var/www/stepkingdom.com")
system("(cd programs/server/ && npm install)
PORT=3000 MONGO_URL=mongodb://localhost:27017/stepkingdom ROOT_URL=https://www.stepkingdom.com node main.js")
