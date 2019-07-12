<template>
  <img :src="imgsrc" class="jacket" @load="load" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import sleep from '@/utils/sleep'

const LOADING_IMG = 'https://placehold.jp/333333/333333/10x10.png'

@Component({})
export default class JacketImage extends Vue {
  @Prop(String) readonly src

  loaded = false

  get imgsrc(): string {
    return this.loaded ? this.src : LOADING_IMG
  }

  imgLoader(url) {
    const existPromise: Promise<true> = new Promise((resolve, reject) => {
      const img = new Image()
      img.onerror = () => {
        return reject(new Error())
      }
      img.onload = () => {
        return resolve(true)
      }
      img.src = url
    })

    return Promise.race([sleep(0, false), existPromise])
  }

  load() {
    this.loaded = true
  }

  @Watch('src')
  async watchSrc(src: string) {
    const isExist = await this.imgLoader(src)
    if (isExist !== true) {
      this.loaded = false
    }
  }
}
</script>

<style scoped>
.jacket {
  width: 260px;
  height: 260px;
  padding: 6px;
  vertical-align: bottom;
}
</style>
