require 'fileutils'

Dir.chdir("../stepkingdom")
system("meteor build release")
FileUtils.cp("release/stepkingdom.tar.gz", "/var/www")

Dir.chdir("/var/www")
FileUtils.rm_rf("bundle")
system("tar -zxvf stepkingdom.tar.gz")
FileUtils.rm_f("stepkingdom.tar.gz")