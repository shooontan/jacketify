<template>
  <div class="container">
    <template v-if="ids.length > 0">
      <div v-for="(id, index) in ids" :key="index">
        <img
          :src="item(id)[1] ? item(id)[1].url : item(id)[0].url"
          class="image"
        />
      </div>
    </template>
    <template v-else>
      ...
    </template>
    <template v-if="loading">
      <div v-for="index in 10" :key="`loaing-${index}`">
        <div class="loaing"></div>
      </div>
    </template>
    <div class="next-man">
      <button @click="get">next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Items, Image } from '@/types/response'

@Component({})
export default class IndexPage extends Vue {
  ids: string[] = []
  images: Map<string, Image[]> = new Map()
  loading: boolean = false
  observer: IntersectionObserver | undefined = undefined

  async created() {
    await this.get()
    this.createObserver()
  }

  async get() {
    if (this.loading) {
      return
    }

    this.loading = true
    try {
      const { data }: { data: Items } = await this.$axios.get('/jackets')
      const { items } = data

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

  createObserver() {
    if (typeof IntersectionObserver !== 'function') {
      return
    }
    this.observer = new IntersectionObserver(
      async () => {
        await this.get()
      },
      {
        threshold: 0
      }
    )

    const target = document.querySelector('.next-man')
    this.observer.observe(target as Element)
  }

  item(id) {
    const item = this.images.get(id)
    return item
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.image {
  width: 200px;
  height: auto;
  vertical-align: text-bottom;
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
