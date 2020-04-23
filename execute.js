#!/usr/bin/env node

const path = require("path");
const childProc = require("child_process");
require.resolve("electron");

const electronScriptPath = path.resolve(path.dirname(require.resolve("electron")), "cli.js");
childProc.fork(electronScriptPath, [__dirname], {
	detached: true,
	silent: true,
});
process.exit(0);