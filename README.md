## Purpose
Help you do secure coding; detect security smell; prevent vulnerability from SDLC phase. It works only on Windows OS as for now.

## For User (after install the extension, you need to install the rules!)
Installation/Update rules:
1. You must have Composer. If not, please download here (https://getcomposer.org/Composer-Setup.exe) and install
2. Open CMD/terminal, copy-paste this command (to install/update detection rules [detect security smells]):

```
(IF EXIST "%userprofile%\AppData\Roaming\Composer\vendor\squizlabs\php_codesniffer\src\Standards\laravel_security_sniffer" (RMDIR /S /Q "%userprofile%\AppData\Roaming\Composer\vendor\squizlabs\php_codesniffer\src\Standards\laravel_security_sniffer") ELSE (echo "folder tidak ditemukan, but it's OK")) && composer global require "squizlabs/php_codesniffer=*" && cd %userprofile%\Downloads && curl -L "https://github.com/anghilmi/laravel_security_sniffer_rule/archive/main.tar.gz" | tar -xzf - && MOVE /Y %userprofile%\Downloads\laravel_security_sniffer_rule-main "%userprofile%\AppData\Roaming\Composer\vendor\squizlabs\php_codesniffer\src\Standards\laravel_security_sniffer"
```

## Demo
### Detect weak input validation
![](https://raw.githubusercontent.com/anghilmi/laravel-php-codesniffer/main/assets//validate.gif)

### Detect obsolete hash
![](https://raw.githubusercontent.com/anghilmi/laravel-php-codesniffer/main/assets//md5.gif)

### Detect raw id link
![](https://raw.githubusercontent.com/anghilmi/laravel-php-codesniffer/main/assets//dataid.gif)


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

## Rules
[I tailored these 8 rules](https://github.com/anghilmi/laravel_security_sniffer_rule) to prevent vulnerability on Laravel based web project; based on experiences, discussion with another devs, some refs like [Laravel docs](https://laravel.com/docs), [OWASP Laravel cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Laravel_Cheat_Sheet.html), and so on. (And may be there are future update).

## Related Project
[Laravuln](https://github.com/GustiAdithiya/laravuln): Website Perpustakaan Berbasis Laravel 9 yang sengaja dibuat rentan/vulnerable. Dipakai untuk edukasi, simulasi beragam jenis serangan dan antisipasinya.
