export const menuArr = [
  {
    id: '01',
    name: '用户管理',
    key: 'userManagement',
    children: [
      {
        id: '01-0',
        name: '用户列表',
        key: 'userList',
        children: null
      },
    ]
  },
  {
    id: '02',
    name: '权限管理',
    key: 'authorityManagement',
    children: [
      {
        id: '02-0',
        name: '角色列表',
        key: 'roleList',
        children: null
      },
      {
        id: '02-1',
        name: '权限列表',
        key: 'authorityList',
        children: null
      }
    ]
  },
  {
    id: '03',
    name: '商品管理',
    key: 'commodityManagement',
    children: [
      {
        id: '03-0',
        name: '商品列表',
        key: 'commodityList',
        children: null
      },
      {
        id: '03-1',
        name: '添加商品',
        key: 'commodityAdd',
        children: null
      }
    ]
  },
  {
    id: '04',
    name: '订单管理',
    key: 'orderManagement',
    children: [
      {
        id: '04-0',
        name: '订单列表',
        key: 'orderList',
        children: null
      },
      {
        id: '04-1',
        name: '添加订单',
        key: 'orderAdd',
        children: null
      }
    ]
  },
  {
    id: '05',
    name: '数据统计',
    key: 'dataStatistics',
    children: [
      {
        id: '05-0',
        name: '数据展示',
        key: 'dataShow',
        children: null
      }
    ]
  }
]

export const menuIconMap = {
    '01': 'el-icon-user-solid',
    '02': 'el-icon-bangzhu',
    '03': 'el-icon-shopping-cart-1',
    '04': 'el-icon-collection',
    '05': 'el-icon-ice-tea',
    defalut: 'el-icon-menu'
  }
