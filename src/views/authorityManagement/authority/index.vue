<template>
  <div>
    <breadcrumb :currentPosition="['权限管理', '权限列表']"/>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" min-width="50"> </el-table-column>
        <el-table-column prop="name" label="权限名称" min-width="250">
        </el-table-column>
        <el-table-column prop="path" label="路径" min-width="250">
        </el-table-column>
        <el-table-column prop="level" label="权限等级" min-width="180">
          <template slot-scope="scope">
            <el-tag
              :type="tagLevelmap[scope.row.level].type"
              disable-transitions
              >{{ tagLevelmap[scope.row.level].label }}</el-tag
            >
            <!-- 或者列出所有标签颜色，再使用 v - if 条件渲染哪一个 -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { tableData as defalutTableData } from './utils'
import { tagLevelmap } from '@/utils'
import breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'authority',
  components: {
    breadcrumb
  },
  data: function() {
    return {
      tagLevelmap,
      tableData: defalutTableData
    }
  },
  created() {
    console.log(tagLevelmap)
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 20px;
}
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
