<template>
  <div class="item-test-1">
    <span class="item-test-1__title">{{title}}</span>
    <span class="item-test-1__description">{{description}}</span>
    <span class="item-test-1__alive">alive: {{counter}} sec</span>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: {
    title: {},
    description: {}
  },
  data () {
    return {
      counter: 0,
      interval: null
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.counter++
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>

$background-color: #00BCD4;
$border-color: rgba(#000, 0.1);
$main-text-color: #000;
$second-text-color: rgba(#fff, 0.6);

%fix {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0;
}
.item-test-1 {
  @extend %fix;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 auto;
  padding: 8px 16px;
  background: $background-color;
  &:before {
    content: '';
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    border: solid 1px $border-color;
  }
}
.item-test-1__title {
  font-size: 1em;
  font-weight: bold;
  color: $main-text-color
}
.item-test-1__description {
  font-size: 1em;
  color: $main-text-color
}
.item-test-1__alive {
  font-size: 0.8em;
  color: $second-text-color;
}
</style>
