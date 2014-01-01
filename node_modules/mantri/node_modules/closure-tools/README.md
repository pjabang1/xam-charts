# Google Closure Tools

An npm package that contains the closure tools with a small API that provides the path to the actual files.

## Quick Start

Install...
```shell
npm install closure-tools --save-deps
```

Require...

```js
var closureTools = require('closure-tools');
```

Get the path:

```js
var builderPath = closureTools.getPath('build/closurebuilder.py');
console.log(builderPath);

// prints:
// node_modules/closure-tools/closure-bin/build/closurebuilder.py
```
### getPath( filename )

Get the relative path to your package's root, for the defined `filename`.

> The `filename` can have any value from [the closure bin folder (see below)](#the-closure-bin-contents).

### Full Example

```js
var closureTools = require('closure-tools'),
    exec     = require('require('child_process').exec');

/* ... */

// prepare the closurebuilder command
var command = closureTools.getPath('build/closurebuilder.py') + ' ' + buildOptions;

// run the closureTools command
exec( command, cb );
```

## The Closure `bin` Contents

This is the current breakout of the [Google Closure's Tools folder][closure-bin], and in effect all the possible values the `getPath()` method will make sense:

```text
build/closurebuilder.py
build/depstree_test.py
build/source_test.py
build/depstree.py
build/depswriter.py
build/source.py
build/treescan.py
build/jscompiler.py
calcdeps.py
scopify.py
```

## Release History
- **v0.1.4**, *5 Nov 2013*  Updated closure binaries to latest.


[closure-bin]: http://code.google.com/p/closure-library/source/browse/#git%2Fclosure%2Fbin "Google closure bin folder"
