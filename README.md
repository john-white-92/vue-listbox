# vue-listbox
A Vue.js (v2.x+) component that support large list with high scroll performance.

# Dependencies
* Vue.js (v2.x+)
* vue-scrollbox (v1.0.1)

# Installation
## NPM

 `$ npm install vue-listbox  --save`

import the script:

   import VueListbox from 'vue-listbox';

## Script tag
Grab the minified version under `dist/vue-listbox.min.js`
It will export a global `VueListbox` variable.

# Usage

## Register the component globally or locally:
```js
Vue.component('vue-listbox', VueListbox);
```
OR
```js
...
components: {
  VueListbox
}
...
```

## HTML
```vue
<vue-listbox mode="row-wrap">
  <component
    v-for="item in listItems"
    :key="item.id"
    :is="item.component"
    :width="item.width"
    :height="item.height"
    :style="{ 'width': `${item.width}px`, height: `${item.height}px` }"
    v-bind="item.data">
  </component>
</vue-listbox>
```

## Props
| Name | Type | Description |
| --- | --- | --- |
| `mode` | `String` | `row-wrap` **default: none** |

## DEMO Item
```js
let id = 6
{
  id, // unique, don't use index
  component: `item-test-1`,
  width: 260, // px
  height: 100, // px
  data: {
    title: `Big item { id: ${id} }`,
    description: `some description`
  }
}
```
