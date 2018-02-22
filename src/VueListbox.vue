<script>
import VueScrollbox from 'vue-scrollbox'

export default {
  name: 'vue-listbox',
  components: {
    VueScrollbox
  },
  render (h) {
    // Обновление отображения
    this.updateRender()
    // Отрисовка
    const canvas = h('div', {
      class: 'list-box__canvas',
      style: {
        paddingTop: `${this.render.offset}px`
      }
    }, this.render.slots)
    const scroll = h('vue-scrollbox', {
      attrs: {
        mode: 'vertical'
      },
      props: {
        height: this.canvas.height
      },
      on: {
        scroll: this.onScroll,
        resize: this.onResize
      }
    }, [ canvas ])
    return h('div', {
      class: 'list-box'
    }, [ scroll ])
  },
  data () {
    return {
      indexes: {
        begin: 0,
        end: 0
      },
      canvas: {
        offset: 0,
        height: 0
      },
      scroll: {
        offsetTop: 0,
        canvasWidth: 0,
        viewportHeight: 0
      }
    }
  },
  computed: {
    // Режим работы - сетка
    isModeRowWrap () {
      const mode = this.$attrs[`mode`]
      return mode && mode === `row-wrap`
    }
  },
  created () {
    // Создаем обьект render лишенный реактивности
    this.render = {
      DELAY: 16, // оптимизация отрисовки при прокрутке
      timer: null, // быстрее чем 1 область видимости на 16 мс
      slots: [], // слоты в области видимости
      begin: 0, // индекс
      end: 0, // индекс
      offset: 0 // смещение области видимости от верха canvas
    }
  },
  methods: {
    // -----------------------------------------------------------------------------
    // Обработчики
    // Событие прокрутки скролла
    onScroll (offset) {
      this.scroll.offsetTop = offset.top
      this.recalc()
    },
    // Событие изменения размеров скролла
    onResize (viewport, canvas) {
      this.scroll.canvasWidth = canvas.width
      this.scroll.viewportHeight = viewport.height
      this.recalc()
    },

    // -----------------------------------------------------------------------------
    // Функции
    // Обновление отображения
    updateRender () {
      const slots = this.$slots.default || []
      this.updateCanvasHeight(slots)
      if (this.render.timer && this.render.slots.length) {
        this.restartRenderDelay()
      } else {
        this.render.begin = this.indexes.begin
        this.render.end = this.indexes.end
        this.render.offset = this.canvas.offset
        this.render.slots = slots.filter(
          (slot, index) => index >= this.render.begin && index < this.render.end
        )
        this.startRenderDelay()
      }
    },
    // Обновить размер области отображения
    updateCanvasHeight (slots) {
      let height = 0
      let index = 0
      let row = null
      while (true) {
        row = this.getRow(slots, index)
        if (row.height === 0) { break }
        height += row.height
        index = row.end + 1
      }
      this.canvas.height = height
    },
    // Перезапуск таймера отложенного рендера
    restartRenderDelay () {
      this.startRenderDelay(true)
    },
    // Запуск таймера
    startRenderDelay (isReset = false) {
      clearTimeout(this.render.timer)
      this.render.timer = setTimeout(_ => {
        this.render.timer = null
        if (isReset) {
          this.$forceUpdate()
        }
      }, this.render.DELAY)
    },

    // Перерасчет отображения
    recalc () {
      const { top, bottom } = this.getViewBorders()
      const { begin, end, offset } = this.getViewIndexes(top, bottom)

      this.canvas.offset = offset
      this.indexes.begin = begin
      this.indexes.end = end

      if ((this.render.begin !== this.indexes.begin ||
        this.render.end !== this.indexes.end ||
        this.render.offset !== this.canvas.offset) &&
        this.render.timer) {
        this.restartRenderDelay()
      }
    },
    // Расчет индексов области видимости и ее смещения
    getViewIndexes (top, bottom) {
      const slots = this.$slots.default || []
      const length = slots.length

      let pos = 0
      let offset = 0
      let begin = 0
      let end = 0
      let index = 0
      let row = null
      let isFindTop = false

      while (true) {
        end = index
        if (pos >= bottom) {
          break
        }
        if (pos >= top && isFindTop === false) {
          begin = index
          offset = pos
          isFindTop = true
        }
        if (index >= length) { break }

        row = this.getRow(slots, index)

        pos += row.height
        index = row.end + 1
      }
      return {
        begin: this.clamp(begin, 0, length),
        end: this.clamp(end, 0, length),
        offset
      }
    },
    // Расчет окна области видимости в px
    getViewBorders () {
      const height = this.canvas.height
      const view = this.scroll.viewportHeight * 3
      const center = this.scroll.offsetTop + this.scroll.viewportHeight / 2

      let top = this.clamp(center - view / 2, 0)
      let bottom = Math.ceil(this.clamp(top + view, 0, height))
      top = Math.ceil(this.clamp(bottom - view, 0, height))

      top = Math.floor(top / this.scroll.viewportHeight)
      top *= this.scroll.viewportHeight
      top = this.clamp(top, 0, height)

      bottom = Math.ceil(bottom / this.scroll.viewportHeight)
      bottom *= this.scroll.viewportHeight
      bottom = this.clamp(bottom, 0, height)

      return {
        top,
        bottom
      }
    },
    // Возвращает рассчитанную строку (индексы, высота)
    getRow (slots, begin) {
      const canvasWidth = this.scroll.canvasWidth
      let width = 0
      let height = 0
      let index = begin
      let item = null

      while (true) {
        item = slots[index]
        if (item == null) { break }
        const size = this.getSize(item)

        if (this.isModeRowWrap) {
          if (size.width === 0) {
            if (index === begin) {
              height = size.height
            }
            break
          } else {
            width += size.width
            if (width >= canvasWidth) {
              if (index === begin) {
                height = size.height
              }
              break
            } else {
              height = size.height > height
                ? size.height
                : height
            }
          }
        } else {
          height = size.height
          break
        }

        index++
      }

      index-- // корректировка
      return {
        begin,
        end: index >= begin
          ? index
          : begin,
        height
      }
    },
    // Возвращает размеры одного элемента списка
    getSize (item) {
      const attrs = item && item.data && item.data.attrs
      return {
        width: (attrs && attrs.width) || 0,
        height: (attrs && attrs.height) || 0
      }
    },
    // Обрезать значение по границам
    clamp (value, min = 0, max = Number.POSITIVE_INFINITY) {
      return Math.min(Math.max(value, min), max)
    }
  }
}
</script>

<style lang="scss" scoped>
%fix {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0;
}
.list-box {
  @extend %fix;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 0px;
}
.list-box__canvas {
  @extend %fix;
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 auto;
}
.list-box[mode="row-wrap"] {
  .list-box__canvas {
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
  }
}
</style>
