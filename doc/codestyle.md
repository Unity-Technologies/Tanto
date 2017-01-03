Follow AirBnb code style
https://github.com/airbnb/javascript/tree/master/react#basic-rules


On top of it some extra rules:

1. No semicolons in javascript
2. Minimizing bundle size

Prefer imporing bindings from library libs directory(if available) instead of importing full lib bindings, especially when importing
Bootstrap or Material-UI components:

Good:
`import Navbar from 'react-bootstrap/lib/Navbar'`
`import Route from 'react-router/lib/Route'`

Bad:
`import { Navbar } from 'react-bootstrap'`
`import { Route, IndexRoute } from 'react-router'`
