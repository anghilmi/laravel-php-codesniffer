## Purpose
Help you do secure coding; detect security smell; prevent vulnerability from SDLC phase

## For User
Installation
1. You must have Composer. If not, please download here (https://getcomposer.org/Composer-Setup.exe) and install
2. Open CMD/terminal, copy-paste this command (to install 8 rules [detect security smells]):

```
composer global require "squizlabs/php_codesniffer=*" && cd %userprofile%\Downloads && curl -L "https://github.com/anghilmi/laravel_security_sniffer_rule/archive/main.tar.gz" | tar -xzf - && MOVE /Y %userprofile%\Downloads\laravel_security_sniffer_rule-main "%userprofile%\AppData\Roaming\Composer\vendor\squizlabs\php_codesniffer\src\Standards\laravel_security_sniffer"
```

## Demo
### Detect weak input validation
![](https://github.com/anghilmi/laravel-php-codesniffer/blob/main/assets/validate.gif)

### Detect obsolete hash
![](https://github.com/anghilmi/laravel-php-codesniffer/blob/main/assets/md5.gif)

### Detect raw id link
![](https://github.com/anghilmi/laravel-php-codesniffer/blob/main/assets/dataid.gif)


## For VSCode Extension Developer 
Build extension: 
```
cd /to/project/path
```
```
npm install
```
Windows Powershell >> run as administrator
```
Get-ExecutionPolicy
```
```
Set-ExecutionPolicy Unrestricted
```
```
a
```
```
vsce package
```
output: *.VSIX file
