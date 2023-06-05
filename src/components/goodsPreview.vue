<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'
// 图片列表
defineProps({
  mainPictures: {
    type: Array,
    default: () => []
  }
})
// 当前选中的图片索引
const currentIndex = ref(0)
// 获取鼠标相对位置
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
const X = ref(0)
const Y = ref(0)
// 监听鼠标相对位置的变化
watch([elementX, elementY, isOutside], () => {
  if (isOutside.value) {
    return
  }
  if (elementX.value > 100 && elementX.value < 300) {
    X.value = elementX.value - 100
  } else if (elementX.value <= 100) {
    X.value = 0
  } else {
    X.value = 200
  }
  if (elementY.value > 100 && elementY.value < 300) {
    Y.value = elementY.value - 100
  } else if (elementY.value <= 100) {
    Y.value = 0
  } else {
    Y.value = 200
  }
})
const positionX = computed(() => -X.value * 2)
const positionY = computed(() => -Y.value * 2)
</script>

<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="mainPictures[currentIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${X}px`, top: `${Y}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li
        v-for="(img, i) in mainPictures"
        :key="i"
        @mouseenter="currentIndex = i"
        :class="{ active: currentIndex === i }"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div
      class="large"
      :style="[
        {
          backgroundImage: `url(${mainPictures[currentIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`
        }
      ]"
      v-show="!isOutside"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
