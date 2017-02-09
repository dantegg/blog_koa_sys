this is a blog system based on koa2+react isomorphic server render+redux(react-redux)+react-router+mongodb  
[online address](http://121.43.191.65:3000/home)  

### reference
 * react koa isomorphic demo  
    https://github.com/princeV/koa2-react-redux-webpack-boilerplate  
    https://github.com/chikara-chan/react-isomorphic-boilerplate


### Start

 * development mode

    run `node run.js` or  
    run `nodemon run.js`

 * production mode

    run `node app.production.js`

### client compression

using CDN instead of bundle

 * webpackconfig
```
externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux'
    },
```

 * html
```
<script src="http://cdn.bootcss.com/react/15.4.2/react.min.js"></script>
<script src="http://cdn.bootcss.com/react/15.4.2/react-dom.min.js"></script>
<script src="http://cdn.bootcss.com/redux/3.6.0/redux.min.js"></script>
<script src="http://cdn.bootcss.com/react-redux/5.0.2/react-redux.min.js"></script>
<script src="http://cdn.bootcss.com/highlight.js/9.9.0/highlight.min.js"></script>
```

### Something Important  

 * when using Redux with server rendering,we must send the state of our
 app along in our response,so the client can use it as the initial state  
 [redux on the server](http://redux.js.org/docs/recipes/ServerRendering.html#redux-on-the-server)

### TODO

 * ~~add user initialization~~
 * add gallery module  
 * ~~add session max age~~  
 * ~~add blog tag~~
 * MD5 PASSWORD
 * add fitness module
