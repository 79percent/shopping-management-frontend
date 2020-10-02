<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="header-container">
        <div class="header-left">后台管理系统</div>
        <div class="header-right">
          <el-button type="info" @click="handleLogOut">退出登录</el-button>
        </div>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="collapse" @click="handleClickCollapseBtn">
          <span v-text="isCollapse ? '》' : '《'"></span>
        </div>
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          :unique-opened="false"
          :router="true"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="activePath"
        >
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.key">
            <template slot="title">
              <i :class="menuIconMap[item.id] || menuIconMap['defalut']"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="subItem.key"
              @click="saveNavState(subItem.key)"
            >
              <i :class="menuIconMap[subItem.id] || menuIconMap['defalut']"></i>
              <span>{{ subItem.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menuArr, menuIconMap } from './utils'

export default {
  data() {
    return {
      menuIconMap,
      menuList: [],
      isCollapse: false,
      activePath: null
    }
  },
  created() {
    this.getMenuList().then(res => {
      this.menuList = res
      this.activePath = sessionStorage.getItem('activePath')
    })
  },
  methods: {
    //退出登录
    handleLogOut() {
      const { $router, $message } = this
      localStorage.removeItem('userName')
      sessionStorage.removeItem('activePath')
      $message.success('退出登录成功')
      $router.push('/login')
    },
    //获取用户的目录
    async getMenuList() {
      const res = await new Promise(resolve => {
        resolve(menuArr)
      })
      return res
    },
    //点击收起/展开侧边目录
    handleClickCollapseBtn() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(path) {
      sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333744;
  color: #fff;
  .collapse {
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    background-color: #4a5064;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    span {
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.home-container {
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left {
    font-size: 1.5rem;
  }
}
</style>
