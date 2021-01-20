#!/bin/bash

npm run build || exit 1
pm2 startOrReload nest
pm2 logs nest