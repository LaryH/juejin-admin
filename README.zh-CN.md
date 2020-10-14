# vue-antd-pro

基于 vue-cli3 和 [ant-design-vue](https://vue.ant.design/docs/vue/introduce/)搭建的后台管理系统模板，使用 json-server 做数据 mock。

### 数据 mock 服务启用

使用 json-server 做数据 mock,关于 json-server 请移步[官网](https://github.com/typicode/json-server)

```
// 进入到server目录
cd server

// 安装依赖
yarn install

// 启动mock服务
yarn start
```

### 前端服务启动

```
// 返回项目根目录
cd ..

// 安装依赖
yarn install

// 启动本地服务
yarn serve
```

### 登录账号

用户名： 任意输入
密码： 字符数字[4-16]位的任意输入

### 生产环境构建

```
yarn run build
```

### 效果预览

![login.png](https://upload-images.jianshu.io/upload_images/1918644-b25648a03fb53583.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![table.png](https://upload-images.jianshu.io/upload_images/1918644-af6a0349ccedba08.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Home.png](https://upload-images.jianshu.io/upload_images/1918644-52e3b8100691eaf9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![setting1.png](https://upload-images.jianshu.io/upload_images/1918644-7a0d2234517ab788.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![setting2.png](https://upload-images.jianshu.io/upload_images/1918644-d460e843cb86ab41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![setting3.png](https://upload-images.jianshu.io/upload_images/1918644-2f29223b39adb363.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Todo:

1.  Pie 组件颜色有问题
2.  Pie 组件 Legend 点击饼图没有变化
3.  offlineData 组件中选中 tab 字体颜色问题
4.  销售额类别占比 图和 legend 响应式 图没有及时更新以及 mounted 的时候未执行初始逻辑
5.  v-slider 组件 onchange 方法不起作用
