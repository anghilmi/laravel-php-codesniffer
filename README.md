# Purpose
Help you do secure coding; detect security smell; prevent vulnerability from SDLC phase

# For User
Installation
1. You must have Composer. If not, please download here (https://getcomposer.org/Composer-Setup.exe) and install
2. Open CMD/terminal, copy-paste this command (install 8 rule):

<code>composer global require "squizlabs/php_codesniffer=*" && cd %userprofile%\Downloads && curl -L "https://github.com/anghilmi/laravel_security_sniffer_rule/archive/main.tar.gz" | tar -xzf - && MOVE /Y %userprofile%\Downloads\laravel_security_sniffer_rule-main "%userprofile%\AppData\Roaming\Composer\vendor\squizlabs\php_codesniffer\src\Standards\laravel_security_sniffer"</code>


# For Developer 
Build extension: 
1. cd /to/project/path
2. npm install
3. Windows Powershell >> run as administrator
4. Get-ExecutionPolicy
5. Set-ExecutionPolicy Unrestricted
5. a
6. vsce package
7. get VSIX file
