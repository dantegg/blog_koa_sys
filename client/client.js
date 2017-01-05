/**
 * Created by dantegg on 16-12-27.
 */
import React from 'react'
import {render} from 'react-dom'
//import ReactDOM from 'react-dom'
// import routes from '../../app/routes'
import {Router, match, browserHistory} from 'react-router'
import routes from './route'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
const store = configureStore(window.REDUX_STATE)
// ReactDOM.render(
// <Provider store={store}>
//     {Route}
//     </Provider>,
//     document.querySelector('.react-container')
// )


match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
    render(
        <Provider store={store}>
            <Router {...renderProps}/>
        </Provider>,
        document.getElementById('root')
    )
})