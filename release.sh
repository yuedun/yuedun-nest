#!/bin/bash

npm run build || exit 1
pm2 startOrReload pm2.json
pm2 logs nest