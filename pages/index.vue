<template>
  <div class="container" :style="containerStyle">
    <template v-if="displayIds.length > 0">
      <div v-for="(id, index) in displayIds" :key="index">
        <JacketImage :src="item(id)[1] ? item(id)[1].url : item(id)[0].url" />
      </div>
    </template>
    <template v-else>
      ...
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Image } from '@/types/response'
import JacketImage from '@/components/atoms/JacketImage.vue'
import * as jacketsHttp from '@/http/jackets.http'

const { ceil, floor, min } = Math

const HEIGHT = 200
const SHOW_MAX_ITEM_COUNT = 30
const MAX_COL = 7
const MARGIN_ROW = 1

@Component({
  components: {
    JacketImage
  }
})
export default class IndexPage extends Vue {
  ids: string[] = []
  images: Map<string, Image[]> = new Map()
  loading: boolean = false
  observer: IntersectionObserver | undefined = undefined

  position = {
    x: 0,
    y: 0
  }

  offset = 0
  col = 7

  async created() {
    if (process.client) {
      this.resize()
      await this.get()
      addEventListener('scroll', this.scroll)
      addEventListener('resize', this.resize)
    }
  }

  async get() {
    if (this.loading) {
      return
    }

    this.loading = true
    try {
      const { items } = await jacketsHttp.get()

      const ids: string[] = []

      Object.keys(items).forEach(id => {
        const item = items[id].images
        ids.push(id)
        this.images.set(id, item)
      })

      this.ids = [...new Set([...this.ids, ...ids])]
    } catch (__) {
    } finally {
      this.loading = false
    }
  }

  get displayIds() {
    const ids: string[] = []
    const { col, offset } = this

    for (
      let index = offset;
      index < offset + SHOW_MAX_ITEM_COUNT + MARGIN_ROW * col;
      index++
    ) {
      if (this.ids[index]) {
        ids.push(this.ids[index])
      }
    }

    return ids
  }

  get containerStyle() {
    return {
      'padding-top': `${this.paddingTop}px`,
      'padding-bottom': `${this.paddingBottom}px`
    }
  }

  get paddingTop() {
    return (this.offset * HEIGHT) / this.col
  }

  get paddingBottom() {
    const { col } = this
    return (
      (ceil(this.ids.length / col) -
        ceil(this.offset / col) -
        ceil(this.displayIds.length / col)) *
      HEIGHT
    )
  }

  item(id) {
    const item = this.images.get(id)
    return item
  }

  scroll() {
    this.position.y = window.pageYOffset
    this.offset = floor(this.position.y / HEIGHT) * this.col
  }

  resize() {
    this.position.x = window.innerWidth
    this.col = min(floor(this.position.x / HEIGHT), MAX_COL)
  }

  @Watch('offset')
  onchangeOffset() {
    if (this.paddingBottom / HEIGHT < 3) {
      this.get()
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1400px; /* 200*7 */
}

.loaing {
  width: 200px;
  height: 200px;
  vertical-align: text-bottom;
}

.next-man {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
</style>
