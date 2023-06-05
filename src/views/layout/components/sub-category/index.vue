<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/sub-category'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import GoodsItem from '@/components/GoodsItem.vue'
const route = useRoute()
const subCategoryData = ref({})
const activeName = ref('publishTime')
getCategoryFilterAPI(route.params.id).then((res) => {
  subCategoryData.value = res.data.result
})
// 选项卡改变时
const queryData = ref({
  categoryId: subCategoryData.value.parentId,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const goodsList = ref([])
const getSubCategory = () => {
  getSubCategoryAPI(queryData.value).then((res) => {
    goodsList.value = [...goodsList.value, ...res.data.result.items]
  })
}
getSubCategory()
const changeSelected = (val) => {
  queryData.value.sortField = val
  getSubCategory()
}
// 无线滚动加载
const disabled = ref(false)
const load = () => {
  queryData.value.page++
  getSubCategoryAPI(queryData.value).then((res) => {
    goodsList.value = [...goodsList.value, ...res.data.result.items]
    if (!res.data.result.items.length) disabled.value = true
  })
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="`/category/${subCategoryData.parentId}`">{{
          subCategoryData.parentName
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ subCategoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs @tab-change="changeSelected" v-model="activeName">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
