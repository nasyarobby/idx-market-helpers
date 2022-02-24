#!/bin/bash
cat package.json | grep "version"
cp package.json ./dist
cd ./dist
npm publish
