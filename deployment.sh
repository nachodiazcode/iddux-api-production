#!/bin/sh 
cd ../../projects/iddyx-backend/
git pull origin master
pm2 restart index.js