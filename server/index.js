//nodejs服务器
const express=require('express');
const Vue =require('vue');
const path =require('path');

const app =express();
const fs =require('fs');
//用vue实例换一个html的内容
const {createBundleRenderer}=require('vue-server-renderer');
const serverBundle=require('../dist/server/vue-ssr-server-bundle.json');
const clientManifest=require('../dist/client/vue-ssr-client-manifest.json');
let pageUrl=path.join(__dirname,'../public/index-temp.html')

const renderer =createBundleRenderer(serverBundle,{
    //可选
    runInNewContext:false,
    //宿主模板，生成 到哪自己写一下
    //下面的必选
    template:fs.readFileSync(pageUrl, 'utf-8'),
    clientManifest
});

// const page = new Vue({
// template:'<div>hello word</div>'
// })

//中间件处理静态文件请求
//关掉index的话，才能避免ssr加载的时候不会出现只加载了一个index的空壳
app.use(express.static('./dist/client',{index:false}))
//路由处理交给vue
app.get('*',async (req,res)=>{
    try {
        const context={
            url:req.url,
            //标题
            title:'ssr test'
        }
        const html = await renderer.renderToString(context);
        console.log(html);
        res.send(html);
    } catch (error) {
        res.status(500).send('服务器内部错误')
    }
})

app.listen(3000,()=>{
    console.log('渲染服务启动成功');
})