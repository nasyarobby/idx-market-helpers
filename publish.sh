#!/bin/bash
cat package.json | grep "version"
tsc
cp package.json ./dist/package.json
cd ./dist
npm publish
