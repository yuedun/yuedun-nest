## 项目描述

本项目主要用于展示一个组件化网站，在本项目中开发相应组件，通过后台来控制要展示的页面。

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# incremental rebuild (webpack)增量编译，可以加快编译速度，需要两个命令组合执行
$ npm run webpack
$ npm run hmr

# production mode
$ npm run prod
$ ./release.sh
```

## Test

```bash
# unit tests单元测试app.controller.spec.ts
$ npm run test

# e2e tests端对端黑盒测试，模拟用户app.e2e-spec.ts
$ npm run test:e2e

# test coverage覆盖率测试
$ npm run test:cov
```

## command

```bash
# 创建controller
$ nest g controller cats

#创建service（provider）
$ nest g service cats/cats

#创建module
$ nest g module cats
```

## debug

```bash
# 命令行中启动服务
$ npm run debug

# vscode中启动Attach
以上两个步骤组合可实现编译和调试同时进行，无需手动重启服务

```

```
"start": "ts-node -r tsconfig-paths/register src/main.ts", //简单的启动服务，不会自动编译重启
"dev": "nodemon", //可以自动编译重启
"debug": "nodemon --config nodemon-debug.json", //调试模式，需要配合chrome devtool或者vscode Attach来debug调试
"hmr": "node dist/server",
"prestart:prod": "rimraf dist && tsc", //生产环境服务启动前编译ts代码为js代码
"prod": "node dist/main.js",//启动生产服务
"lint": "tslint --fix -p tsconfig.json -c tslint.json", //tslint格式化代码
"format": "prettier --write \"src/**/*.ts\"", //prettier格式化代码
"test": "jest", //跑测试
"test:watch": "jest --watch",
"test:cov": "jest --coverage",
"test:e2e": "jest --config ./test/jest-e2e.json",
"webpack": "webpack --config webpack.config.js"
```

![组件流程](http://5b0988e595225.cdn.sohucs.com/images/20180904/a81a984ffda84e348cdbdb12b7cc10af.jpeg)

> 客户端请求 ---> 中间件(NestMiddleware) ---> 守卫(CanActivate) ---> 拦截器之前(NestInterceptor) ---> 管道 ---> 控制器处理并响应 ---> 拦截器之后 ---> 过滤器(ExceptionFilter)

## License

  Nest is [MIT licensed](LICENSE).
