# `@nk/vdom-launch-editor`

## 安装
```bash
npm i -D @nk/vdom-launch-editor
```

## 用法
vue-cli版本:**@vue/cli 4.5.3**

```javascript
const vdomLaunchEditorPlugin = require('@nk/vdom-launch-editor/dist/plugin').default

module.exports = {
  chainWebpack: config => {


      config.module
        .rule('vue')
        .use('vdomLaunchEditorLoader')
        .loader('@nk/vdom-launch-editor')
        .after('vue-loader')
        .end()
      config.plugin('vdomLaunchEditorPlugin')
        .use(vdomLaunchEditorPlugin)
  }
}

```
