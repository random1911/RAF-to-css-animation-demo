# RAF-to-css-animation-demo

Idea behind this example - you can start animation via request animation frame, using user input, and end it with CSS animation, pass data via CSS variable.

SidebarMenu following user swipe at start and then just plays CSS animation:

```
@keyframes menuOut {
  from {
    transform: translate(var(--transformLeft), 0);
  }
  to {
    transform: translate(-100%, 0);
  }
}
```

[DEMO @ GH_PAGES](https://random1911.github.io/RAF-to-css-animation-demo/)



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
