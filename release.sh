#!/bin/bash

npm run build
pm2 restart nest
pm2 logs nest