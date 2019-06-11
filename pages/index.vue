<template>
  <div class="container">
    <template v-if="images.length > 0">
      <div v-for="(img, index) in images" :key="index">
        <img :src="img[1].url" class="image" />
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Items, Image } from '@/types/response'

@Component({})
export default class IndexPage extends Vue {
  images: Image[][] = []
  loading: boolean = false

  async created() {
    this.loading = true
    try {
      const { data }: { data: Items } = await this.$axios.get('/jackets')

      const { items } = data
      const images = Object.keys(items).map(key => items[key].images)
      this.images = images
    } catch (__) {
    } finally {
      this.loading = false
    }
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
</style>
