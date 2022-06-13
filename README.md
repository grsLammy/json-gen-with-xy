# PLOTS METADATA

simple script to generate metadata for 300x300 (90k) plot

## PRE-REQUISITE

to be able to upload 90k json files to IPFS in a directory
- Download IPFS Desktop App https://docs.ipfs.io/install/ipfs-desktop/ (for UI Experience)

to add ipfs.exe to your PATH
- go to the path where your IPFS Desktop App is installed (ipfs.exe)
- Save the current working directory into a temporary variable
```sh
$GO_IPFS_LOCATION = pwd
```
- Create a powershell profile
```sh
if (!(Test-Path -Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
```
This command first checks to see if you have a profile set. If you do, it leaves it there and doesn't create a new one. You can view the contents of your profile by opening it in Notepad
```sh
notepad $PROFILE
```
- Add the location of your Go-IPFS daemon and add it to PowerShell's PATH by truncating it to the end of your PowerShell profile
```sh
Add-Content $PROFILE "`n[System.Environment]::SetEnvironmentVariable('PATH',`$Env:PATH+';;$GO_IPFS_LOCATION')"
```
- Load your `$profile`
```sh
& $profile 
```
- Test that your IPFS path is set correctly by going to your home folder and asking IPFS for the version
```sh
cd ~
ipfs --version
```
## GETTING STARTED
- Clone this repository
```sh
git clone https://github.com/grsLammy/json-gen-with-xy
```
- Navigate to `json-gen-with-xy`
```sh
cd json-gen-with-xy
```
- Install dependencies
```sh
yarn
```

## Usage
- Execute the script to generate your metadata for 300x300 (90k) plot
```javascript
node ./src/generate.js
```
- Execute the cli-cmd to run a service on your local machine and allow access to other peers on the network
```sh
ipfs daemon
```
- Execute the cli-cmd to upload your generated metadata json files to the IPFS
```sh
ipfs add -r --cid-version=1 "absolutePathToDirectory"
```
Once your files are done uploading, you'll get the CID for the folder/directory where your files are uploaded to
example:
```sh
added bafybeibl436kh2ytyk4pym46auzd6rgydm4f3hpw4tT36rqu3jioWr3xwu plot_metadata
```
simply copy this CID add pin it to Pinata. 

