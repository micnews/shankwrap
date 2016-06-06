# shankwrap

A javascript module that cleans up the `npm-shrinkwrap.json` file created by running `npm shrinkwrap`.

It does the following:

1. Removes any `resolved` properties for which the link supplied is NOT a git repository.
1. Allows for custom blacklisting of dependencies through the command line. (Useful because shrinkwrap does NOT remove optional dependencies.)

Major credit to [shonkwrap](https://github.com/skybet/shonkwrap), for giving us the starting code for this.


## Installation

```shell
npm install shankwrap
```

## Usage

Command Line/NPM Script:


```shell
# (Must be in the directory of your `npm-shrinkwrap.json`):
shankwrap [:blacklisted items separated by spaces]

# example
shankwrap elton john
# this will make sure that the dependencies `elton` and `john` are removed from the output
```
