# vite 是怎么让浏览器可以识别.vue文件的

```js
yarn install vite
```

yarn create实际上就等于在安装create-vite脚手架，然后使用脚手架的指令去构建项目

```js
yarn create vite my-vue-app --template vue
```

我们来实现一套简单的vite开发服务器

1. 解决浏览器识别.vue文件的问题
2. 对开发服务器的原理层有一个基础的简单认识

需要用到[koa](https://koajs.com/) （node端的一个框架）

```js
// index.js

const Koa = require("koa"); // 不能用esmodule 必须使用commonjs
const fs = require("fs"); // node 环境注入给js的特殊能力 
const path = require("path");

// doucument.getElementById(Dom节点的id名); --> 浏览器环境注入给js的特殊能力

// 不同的宿主环境会给js赋予不同的一些能力

const app = new Koa(); // const vue = new Vue();

// node最频繁做的事情就是在处理请求和操作文件

// 当请求来临以后会直接进入到use注册的回到函数
app.use(async (ctx)=>{ // ctx 上下文 request --> 请求信息 响应信息
	console.log("ctx", ctx.request, ctx.response);
	if(ctx.request.url === "/"){
		// 这就意味着其他人在找我们要根路径的东西
		const indexContent = await fs.promises.readFile(path.resolve(__dirname,"./index.html")); // 在服务端一般不会这么用，因为一些性能问题
		ctx.response.body = indexContent; // 作为响应体发给对应的人
		//要以什么形式发给他呢？你希望对象拿到你的东西的时候以什么方式解析？
		// json --> application/json text/html text/javascript
		ctx.response.set("Content-Type","text/html");
		
	}

	if(ctx.request.url === "/main.js"){
		const mainContent = await fs.promises.readFile(path.resolve(__dirname,"./main.js"));
		ctx.response.body = mainContent ; 
		ctx.response.set("Content-Type","text/javascript");
	}

	if(ctx.request.url === "/App.vue"){
		const mainVueContent = await fs.promises.readFile(path.resolve(__dirname,"./App.vue")); 
		//  如果是Vue文件，会做一个字符串替换：mainVueContent .toString().find("<template>") 如果匹配到了就直接全部进行字符串替换
		// AST 语法分析 ---> Vue.createElement() --> 构建原生的dom
		ctx.response.body = mainVueContent; 
		// 告诉浏览器即使看到了.vue的文件，也要用.js的方式去解析
		// 在浏览器和服务器眼里，你的文件都是字符串
		ctx.response.set("Content-Type","text/javascript");
	}
})


app.listen(5173, ()=>{
	console.log("vite dev serve listen on 5173");
})
```

```json
// package.json

{
	"script": {
		"dev": "node index.js"
	}
}
```

```js
// main.js
import "./App.vue";

console.log("main.js 123");
```

```js
// App.vue

// app.vue里面的东西已经是经过编译过后的了
console.log("app.vue");
```
