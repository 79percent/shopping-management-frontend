<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in currentPosition" :key="item">
      {{ item }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
/**
 * 面包屑组件，接收一个数组，包含除了首页以外的目录
 * 例如：:currentPosition="['权限管理', '权限列表']"
 * 结果：首页/权限管理/权限列表
 */
export default {
  name: 'my-breadcrumb',
  props: {
    currentPosition: {
      type: Array,
      default: []
    }
  }
}
</script>
