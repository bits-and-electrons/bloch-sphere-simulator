# <img src="images/logo.png" width="30" height="30" alt="" /> [Bloch sphere simulator](https://bits-and-electrons.github.io/bloch-sphere-simulator/)

[![Build Status](https://dev.azure.com/bits-and-electrons/bloch-sphere-simulator/_apis/build/status/bits-and-electrons.bloch-sphere-simulator.build?branchName=main)](https://dev.azure.com/bits-and-electrons/bloch-sphere-simulator/_build/latest?definitionId=6&branchName=main)
![Code Coverage](https://img.shields.io/azure-devops/coverage/bits-and-electrons/bloch-sphere-simulator/6)

A simple web based Bloch sphere simulator, intended to help people to understand and visualize transition of single qubit state on applying different Quantum logic gates.

There is no installation required, just go to https://bits-and-electrons.github.io/bloch-sphere-simulator/.

## Browser Compatibility
Bloch sphere model is rendered using WebGL. It is well supported in all modern browsers.

Google Chrome 9+, Firefox 4+, Opera 15+, Safari 5.1+, Internet Explorer 11 and Microsoft Edge are known to support WebGL. Complete list can be found at [Can I use WebGL?](https://caniuse.com/webgl)

## Development
Prerequisite to install [Git](https://git-scm.com/downloads) and [NodeJS](https://nodejs.org/en/download/) in your machine

### Clone the repository
```
git clone https://github.com/bits-and-electrons/bloch-sphere-simulator
```

### Install dependencies
```
npm install
```

### Test your changes locally
```
npm test
```

## Libraries Used
- [Three.JS](https://threejs.org/)
- [JQuery](https://jquery.com/)
- [Bootstrap](https://getbootstrap.com/)
