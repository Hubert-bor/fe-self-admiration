---
outline: deep
---
# 在vite中处理css

vite 天生就支持对css文件的直接处理

1. vite在读取到main.js中引用了index.css
2. 直接去使用fs模块去读取index.css中的文件内容
3. 直接创建一个style标签，将index.css中的文件内容直接copy进style标签里
4. 将style标签插入到index.html的head中
5. 将该css文件中的内容直接替换为js脚本（方便热更新或者css模块化），同时设置Content-Type为js，从而让浏览器以js脚本形式来执行该css后缀的文件

场景：
一个组件最外层的元素类名一般取名：wrapper
一个组件最底层的元素类名我们一般取名：.footer

你取了footer这个名字，别人因为没有看到你这个组件的源代码，也可能去取名footer这个类名

最终可能会导致样式被覆盖（因为类名重复），这就是我们在协同开发的时候很容易出现的问题。

cssmodule就是来解决这个问题的

大概原理：

全部都是基于node的

1. module.css （module是一种约定，表示要开启css模块化）
2. 他会将你的所有类名进行一定规则的替换（将footer替换为_footer_122st_1）
3. 同时创建一个映射对象`{footer: "_footer_122st_1"}`
4. 将替换过后的内容塞进style标签里面，然后放入到head标签中（能够读到index.html文件内容）
5. 将componentA.module.css内容全部进行抹除，替换成js脚本
6. 将创建的映射对象在脚本中进行默认导出

less（预处理器）：less给我们提供了一些方便且非常实用的方法
