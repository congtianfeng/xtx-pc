<script setup>
import Topnav from './components/topnav.vue'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import HeaderSticky from './components/header-sticky.vue'
import { useScroll } from '@vueuse/core'
import { useCategoryStore } from '@/stores/category'
const { y } = useScroll(window)
const { getCategory } = useCategoryStore()
getCategory()
</script>

<template>
  <!-- 顶部Nav栏 -->
  <Topnav />
  <!-- 顶部导航栏 -->
  <Header />
  <!-- 吸顶导航 -->
  <HeaderSticky :y="y" />
  <!-- 中间二级菜单 -->
  <router-view></router-view>
  <!-- 底部 -->
  <Footer />
</template>

<style scoped lang="scss"></style>
