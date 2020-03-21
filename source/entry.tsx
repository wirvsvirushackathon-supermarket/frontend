import React from 'react'
import { render } from 'react-dom'
import { App } from './app'

render(<App />, document.getElementById('root'))

if ('serviceWorker' in navigator) {
  // eslint-disable-next-line func-names
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.ts')
  })
}
