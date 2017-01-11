this is a blog system based on koa2+react isomorphic server render+redux(react-redux)+react-router+mongodb
### reference
 * react koa isomorphic demo  
    https://github.com/princeV/koa2-react-redux-webpack-boilerplate  
    https://github.com/chikara-chan/react-isomorphic-boilerplate


### Start
development mode  
run `node run.js`  

### Something Important  

 * when using Redux with server rendering,we must send the state of our
 app along in our response,so the client can use it as the initial state  
 [redux on the server](http://redux.js.org/docs/recipes/ServerRendering.html#redux-on-the-server)

###TODO  
add user initialization
add session time out