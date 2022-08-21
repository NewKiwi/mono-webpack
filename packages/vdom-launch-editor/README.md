# `@nk/vdom-launch-editor`

## Usage

```
const vdomLaunchEditor = require('@nk/vdom-launch-editor');

// TODO: DEMONSTRATE API
```

## vue-cli创建项目配置
vue-cli版本:@vue/cli 4.5.3

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

## 待办
因为vue-loader的配置和执行流程，会让vdom-launch-editor执行两次，要增加条件判断

