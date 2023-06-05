<script setup>
import HomePanel from './HomePanel.vue'
import { getHotList } from '@/apis/home'
import { useRequestLazy } from '@/hooks/request-lazy'
const { target, list, isLoading } = useRequestLazy(getHotList)
</script>

<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
    <ul class="goods-list">
      <li v-for="item in list" :key="item.id">
        <!-- 骨架屏 -->
        <el-skeleton style="width: 306px" animated :loading="isLoading">
          <template #template>
            <el-skeleton-item variant="image" style="width: 306px; height: 306px" />
            <div style="padding: 14px; text-align: center">
              <el-skeleton-item variant="p" style="width: 50%" />
              <div style="display: flex; align-items: center; justify-items: space-between">
                <el-skeleton-item variant="text" style="margin-right: 16px" />
              </div>
            </div>
          </template>
          <template #default>
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="alt">{{ item.alt }}</p>
            </RouterLink>
          </template>
        </el-skeleton>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .alt {
      font-size: 18px;
      color: #b5b5b5;
    }
  }
}
</style>
