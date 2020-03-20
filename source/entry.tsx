import React from 'react'
import { render } from 'react-dom'
import { App } from './app'
import { Head } from './head'

render(<App />, document.getElementById('root'))
render(<Head />, document.head)
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/sw.ts')
//   })
// }
