import React from 'react'
import ReactDom from 'react-dom'

import App from '../src/App'

// 客户端入口
ReactDom.hydrate(App, document.getElementById('root'))