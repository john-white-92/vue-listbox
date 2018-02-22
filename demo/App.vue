<template>
  <div id="app">
    <h1>DEMO VUE-LISTBOX</h1>

    <vue-listbox class="listbox-border" mode="row-wrap">
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

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      id: 0,
      listItems: []
    }
  },
  mounted () {
    this.listItems = this.getItems(10000)
  },
  methods: {
    getItems (count) {
      const result = []
      while (count > 0) {
        result.push(this.getRandomItem())
        count--
      }
      return result
    },
    getRandomItem () {
      const random = Math.random()
      return random > 0.5 ? this.getItemTest1() : this.getItemTest2()
    },
    getItemTest1 () {
      const id = this.getId()
      return {
        id,
        component: `item-test-1`,
        width: 260,
        height: 100,
        data: {
          title: `Big item { id: ${id} }`,
          description: `some description`
        }
      }
    },
    getItemTest2 () {
      const id = this.getId()
      return {
        id,
        component: `item-test-2`,
        width: 200,
        height: 70,
        data: {
          title: `Little item { id: ${id} }`
        }
      }
    },
    getId () {
      return this.id++
    }
  }
}
</script>

<style lang="scss">
%fix {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0;
}
html,
body {
  @extend %fix;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 auto;
  height: 100%;
  outline: none;
  font-size: 16px;
  font-family: "Segoe UI", Helvetica, Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  @extend %fix;
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 0px;
  padding: 24px;
}
.listbox-border {
  border: solid 1px #ccc;
}

</style>