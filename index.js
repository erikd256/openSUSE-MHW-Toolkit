#!/usr/bin/env node
var arguments = require('yargs/yargs')(process.argv.slice(2)).argv;
const cliSpinners = require('cli-spinners');
var shell = require('shelljs');
var wget = require('node-wget');
var prompt = require('prompt-sync')({
    history: require('prompt-sync-history')() //open history file
});  
/* 
    Possible flags 

        - init: tw/leap
        - chroot: enter chroot
        - build: kernel 

*/



if (arguments.init){
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    };
    if (!shell.which('chroot')) {
        shell.echo('Sorry, this script requires chroot');
        shell.exit(1);
    };
    var chrootDir = prompt("Directory used to init : ");
    if (shell.exec('ls ' + chrootDir).code == 0, {silent:true}) {
        shell.rm('-rf', chrootDir);
    };
    shell.mkdir(chrootDir);
    shell.mkdir(chrootDir+"/config");
    shell.mkdir(chrootDir+"/build");
    shell.mkdir(chrootDir+"/install");
    if (shell.exec("git clone https://github.com/erikd256/openSUSE-MHW.git " + chrootDir, {silent:true})!==0){
        console.log("git clone failed");
    };
    var flavour = prompt("Flavour used for device (TumbleWeed-AARCH64 | TumbleWeed-ARMv7 | Leap-AARCH64 | Leap-ARMv7 | TumbleWeed-ARMv6) : ");
    switch (flavour) {
    case 'TumbleWeed-AARCH64':
        wget({url: "https://download.opensuse.org/ports/aarch64/tumbleweed/appliances/openSUSE-Tumbleweed-ARM-JeOS.aarch64-rootfs.aarch64.tar.xz", dest: chrootDir});
        break;
    case 'TumbleWeed-ARMv7':
        wget({url: "https://download.opensuse.org/ports/armv7hl/tumbleweed/appliances/openSUSE-Tumbleweed-ARM-JeOS.armv7-rootfs.armv7l.tar.xz", dest: chrootDir});
        break;
    case 'Leap-AARCH64':
        wget({url: "https://download.opensuse.org/ports/aarch64/distribution/leap/15.4/appliances/openSUSE-Leap-15.4-ARM-JeOS.aarch64-rootfs.aarch64.tar.xz", dest: chrootDir});
        break;
    case 'Leap-ARMv7':
        wget({url: "https://download.opensuse.org/ports/armv7hl/distribution/leap/15.4/appliances/openSUSE-Leap-15.4-ARM-JeOS.armv7-rootfs.armv7l.tar.xz", dest: chrootDir});
        break;
    case 'TumbleWeed-ARMv6':
        wget({url: "https://download.opensuse.org/ports/armv6hl/tumbleweed/appliances/openSUSE-Tumbleweed-ARM-JeOS.armv6-rootfs.armv6l.tar.xz", dest: chrootDir});
        break;
    default:
    console.log('Please put in a valid flavour');
    }
    prompt.history.save() //save history back to file
}
else if(arguments.chroot){
}
else if(arguments.build){
}
else{
    console.log("following arguments are supported:")
};