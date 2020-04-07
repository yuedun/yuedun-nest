#!/bin/bash

npm run prestart:prod
pm2 restart nest
pm2 logs nest