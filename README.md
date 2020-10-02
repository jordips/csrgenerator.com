# csrgenerator.com

Forked from: https://github.com/DavidWittman/csrgenerator.com

This is the public repository for https://csrgenerator.com. It's a pretty simple Flask webapp which generates a Certificate Signing Request for creating SSL certificates. Sure, you can do it with OpenSSL via the command-line, but not everyone is as smart as you are.

## CHANGES

Changes added respect original code:

- Modal modified: CSR and KEY are showed in different textareas and download button for each added as well

## Running with Docker

``` bash
$ docker build -t csrgen .
$ docker run -d -p 8080:80 --name csrgen
```
