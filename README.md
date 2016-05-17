# UrbanRobot
SysVentor SaaS

- Its a school project to simulate a real job from a real client

## Setup

1. Pull the repo from the server
2. Install the angularCli and NPM
4. Run npm install -> then do the workarround
3. run ```ng build``` then ```ng serve```
 
## Workarround for prime ng deprecated usings

replace the followed system.js import after npm install:

/node_modules/primeng/components/splitbutton/splitbutton.js

```javascript
replace:
var router_deprecated_1 = require('@angular/router-deprecated');
by:
var router_deprecated_1 = require('@angular/router');
```

then run ```ng build and ng serve again```