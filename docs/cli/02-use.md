# Usage

Quick examples on how to use the CLI.

## Start and Stop

You can start an application with the `start` command

```bash
ambiorix-cli start
```

The advantage over running it from the R console is that it
runs in the background, leaving the terminal available for
other processes.


You can always stop the server like so.

```bash
ambiorix-cli stop
```

## Create

You can create ambiorix projects with, e.g.: the `create-package` 
command (recommended), passing it the name of the application to
create.

```bash
ambiorix-cli create-package myapp
```
