<template>
  <div class="container" :style="containerStyle">
    <template v-if="displayIds.length > 0">
      <div v-for="ids in displayIds" :key="ids.join('-')">
        <JacketImage
          v-for="id in ids"
          :key="id"
          :src="item(id)[1] ? item(id)[1].url : item(id)[0].url"
        />
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
import * as jacketsApi from '@/api/jacketsApi'
import sleep from '@/utils/sleep'

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

      await sleep(1000)

      const MAX_FETCH_COUNT = 10
      const JACKET_ROW_MARGIN = 2

      for (const _ of new Array(MAX_FETCH_COUNT).fill(0)) {
        const JACKET_ROW = this.ids.length / this.col - JACKET_ROW_MARGIN
        if (window.innerHeight > JACKET_ROW * HEIGHT) {
          await Promise.all([sleep(1500), this.get()])
        } else {
          break
        }
      }
    }
  }

  async get() {
    if (this.loading) {
      return
    }

    this.loading = true
    try {
      const { items } = await jacketsApi.get()

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
    const nestIds: typeof ids[] = []
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

    for (let index = 0; index < Math.ceil(ids.length / col); index++) {
      const nestIndex = index * col
      const nestItem = ids.slice(nestIndex, nestIndex + col)
      nestIds.push(nestItem)
    }

    return nestIds
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
