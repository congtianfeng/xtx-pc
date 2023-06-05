<script setup>
import HomeCategory from './HomeCategory.vue'
import HomeBanner from './HomeBanner.vue'
import HomeHot from './HomeHot.vue'
import HomeNew from './HomeNew.vue'
import HomeProduct from './HomeProduct.vue'
</script>

<template>
  <div class="container">
    <!-- 分类区域 -->
    <HomeCategory />
    <!-- 轮播图区域 -->
    <HomeBanner />
  </div>
  <!-- 新鲜好物区域 -->
  <HomeNew />
  <!-- 人气推荐区域 -->
  <HomeHot />
  <!-- 产品列表区域 -->
  <HomeProduct />
</template>

<style scoped lang="scss"></style>
