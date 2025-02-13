# Most Usable 100 Ubuntu Server Commands

<a name="top"></a>

1. [Basic File and Folder Actions](#1-basic-file-and-folder-actions)
2. [Permissions for Files and Users](#2-permissions-for-files-and-users)
3. [User and Group Management](#3-user-and-group-management)
4. [Network Diagnostics and Adjustments](#4-network-diagnostics-and-adjustments)
5. [System Monitoring and Process Management](#5-system-monitoring-and-process-management)
6. [Package Management](#6-package-management)
7. [System Administration](#7-system-administration)
8. [File Compression and Archiving](#8-file-compression-and-archiving)
9. [Disk Management](#9-disk-management)
10. [Security and Firewall](#10-security-and-firewall)
11. [Backup and Restore](#11-backup-and-restore)

## ssh connection

<a href="#top">⬅️ Back to top</a> Generate a rsa keypair: (no file name needed)

`ssh-keygen`

then copy it on the server with one simple command:

`ssh-copy-id hassio@192.168.0.2`

you can now log in without password:

`ssh root@192.168.0.2`

connect to remote server:

`ssh andrii@176.126.62.89 -p 2822`

### You can use SSHFS instead of NFS.

1. Install SSH Server addon

2. Configure it to make a successful ssh root@hassio.local
3. `mkdir ~/hassio-sshfs; cd ~/hassio-sshfs`
4. `sshfs root@192.168.0.2:/config ~/hassio-sshfs`

`sshfs root@176.126.62.89:/ ~/hassio-sshfs`

`#password: andrei`

`fusermount -u ~/hassio-sshfs` -> unmount

5. ls # it works!

`/home/username/.ssh` - if authentification problem occur delete known-host file

## 1. Basic File and Folder Actions

<a href="#top">⬅️ Back to top</a>

- `ls` - List directory contents.
- `ls -l` - List with detailed information.
- `ls -a` - List hidden files.
- `cd /path/to/dir` - Change directory.
- `pwd` - Show current directory path.
- `mkdir dir_name` - Create a new directory.
- `mkdir -p /path/to/dir` - Create nested directories.
- `touch file_name` - Create an empty file.
- `cp file1 file2` - Copy a file.
- `cp -r dir1 dir2` - Copy a directory recursively.
- `mv file1 file2` - Move or rename a file.
- `rm file_name` - Remove a file.
- `rm -r dir_name` - Remove a directory and its contents.
- `cat file_name` - Display file content.
- `less file_name` - View file content page by page.
- `head -n 10 file_name` - Display the first 10 lines of a file.
- `tail -n 10 file_name` - Display the last 10 lines of a file.
- `find /path -name file_name` - Search for a file by name.
- `du -h file_or_dir` - Show disk usage of a file or directory.
- `df -h` - Display available disk space.

## 2. Permissions for Files and Users

<a href="#top">⬅️ Back to top</a>

- `chmod 644 file_name` - Set file permissions (read/write for owner, read-only
  for others).
- `chmod -R 755 dir_name` - Set directory permissions recursively.
- `chown user file_name` - Change file owner.
- `chown user:group file_name` - Change file owner and group.
- `chown -R user:group dir_name` - Change ownership recursively.
- `ls -l` - View permissions and ownership.
- `umask 022` - Set default file permissions.

## 3. User and Group Management

<a href="#top">⬅️ Back to top</a>

- `adduser username` - Add a new user.
- `passwd username` - Change a user's password.
- `deluser username` - Delete a user.
- `usermod -aG group username` - Add a user to a group.
- `groupadd group_name` - Create a new group.
- `groupdel group_name` - Delete a group.
- `groups username` - Show groups for a user.
- `id username` - Display user ID and group ID.
- `who` - Show logged-in users.
- `w` - Display active users and their activities.
- `last` - Show login history.
- `sudo visudo` - Edit sudoers file.

## 4. Network Diagnostics and Adjustments

<a href="#top">⬅️ Back to top</a>

- `ifconfig` - Display network interfaces.
- `ip addr` - Show IP addresses.
- `ping host` - Test network connectivity to a host.
- `traceroute host` - Show route to a host.
- `netstat -tuln` - Display active connections.
- `ss -tuln` - Show listening ports and services.
- `curl http://example.com` - Fetch a URL.
- `wget http://example.com` - Download a file from a URL.
- `scp file user@host:/path` - Securely copy a file to a remote host.
- `scp user@host:/path/file .` - Securely copy a file from a remote host.
- `rsync -av source/ dest/` - Synchronize files between locations.
- `nmcli dev status` - Display network status.
- `nmcli con show` - Show active network connections.
- `systemctl restart networking` - Restart networking service.

## 5. System Monitoring and Process Management

<a href="#top">⬅️ Back to top</a>

- `top` - Display running processes.
- `htop` - Interactive process viewer (install with `sudo apt install htop`).
- `ps aux` - Show detailed process list.
- `kill PID` - Terminate a process by PID.
- `killall process_name` - Terminate all processes with a specific name.
- `uptime` - Show system uptime.
- `free -h` - Display memory usage.
- `vmstat` - View system performance.
- `iostat` - Show CPU and I/O stats.
- `df -h` - Show disk usage.
- `du -sh /path` - Show directory size.
- `journalctl -xe` - View detailed system logs.
- `dmesg` - Display kernel logs.
- `sysctl -a` - Show system configuration.

## 6. Package Management

<a href="#top">⬅️ Back to top</a>

- `sudo apt update` - Update package list.
- `sudo apt upgrade` - Upgrade installed packages.
- `sudo apt install package_name` - Install a package.
- `sudo apt remove package_name` - Remove a package.
- `sudo apt autoremove` - Remove unnecessary packages.
- `dpkg -l` - List installed packages.
- `dpkg -s package_name` - Show package details.
- `apt-cache search package_name` - Search for a package.

## 7. System Administration

<a href="#top">⬅️ Back to top</a>

- `sudo systemctl start service_name` - Start a service.
- `sudo systemctl stop service_name` - Stop a service.
- `sudo systemctl restart service_name` - Restart a service.
- `sudo systemctl enable service_name` - Enable a service to start on boot.
- `sudo systemctl disable service_name` - Disable a service from starting on
  boot.
- `sudo systemctl status service_name` - Check the status of a service.
- `reboot` - Restart the system.
- `shutdown now` - Shut down immediately.
- `shutdown -r +5` - Restart the system in 5 minutes.
- `hostnamectl` - Manage the hostname.
- `timedatectl` - Show or set system time and date.

## 8. File Compression and Archiving

<a href="#top">⬅️ Back to top</a>

- `tar -cvf archive.tar /path` - Create a tar archive.
- `tar -xvf archive.tar` - Extract a tar archive.
- `tar -czvf archive.tar.gz /path` - Create a compressed tarball.
- `tar -xzvf archive.tar.gz` - Extract a compressed tarball.
- `gzip file_name` - Compress a file.
- `gunzip file_name.gz` - Decompress a file.
- `zip archive.zip file1 file2` - Create a zip archive.
- `unzip archive.zip` - Extract a zip archive.

## 9. Disk Management

<a href="#top">⬅️ Back to top</a>

- `lsblk` - List block devices.
- `fdisk -l` - Display disk partitions.
- `parted /dev/sdX` - Partition a disk interactively.
- `mkfs.ext4 /dev/sdX1` - Format a partition as ext4.
- `mount /dev/sdX1 /mnt` - Mount a partition.
- `umount /mnt` - Unmount a partition.
- `blkid` - Show UUIDs of devices.
- `df -h` - Check disk usage.
- `du -sh /path` - Show size of a directory.
- `fsck /dev/sdX1` - Check and repair filesystem.

## 10. Security and Firewall

<a href="#top">⬅️ Back to top</a>

- `ufw enable` - Enable the firewall.
- `ufw disable` - Disable the firewall.
- `ufw status` - Check firewall status.
- `ufw allow 22` - Allow SSH (port 22).
- `ufw deny 80` - Deny HTTP (port 80).
- `sudo fail2ban-client status` - Check Fail2Ban status.
- `sudo fail2ban-client restart` - Restart Fail2Ban.

## 11. Backup and Restore

<a href="#top">⬅️ Back to top</a>

- `rsync -av /source /destination` - Sync files for backup.
- `tar -czvf backup.tar.gz /path` - Archive and compress files.
- `scp user@host:/path/to/backup.tar.gz .` - Retrieve a backup.
- `dd if=/dev/sdX of=/path/backup.img` - Create a disk image.
- `dd if=/path/backup.img of=/dev/sdX` - Restore a disk image.
