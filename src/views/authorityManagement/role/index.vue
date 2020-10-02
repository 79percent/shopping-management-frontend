<template>
  <div>
    <breadcrumb :currentPosition="['权限管理', '角色列表']" />
    <el-card>
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="primary" @click="controlAddDialogVisible">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
              :class="['vcenter', 'bdbottom', index1 === 0 ? 'bdtop' : '']"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                  :class="['vcenter', index2 === 0 ? '' : 'bdtop']"
                >
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="13">
                    <el-tag
                      closable
                      type="warning"
                      v-for="(item3) in item2.children"
                      :key="item3.id"
                      @close="handleClickClose(scope.row.id, item1.id, item2.id, item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" min-width="50" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" min-width="180">
          <template slot-scope="scope">
            <el-input v-model="editRow.roleName" v-if="editId === scope.row.id"></el-input>
            <span v-else>{{scope.row.roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" min-width="180">
          <template slot-scope="scope">
            <el-input v-model="editRow.roleDesc" v-if="editId === scope.row.id"></el-input>
            <span v-else>{{scope.row.roleDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="240">
          <template slot-scope="scope">
            <div v-if="editId === null">
              <el-button type="primary" icon="el-icon-edit" @click="handleClickEdit(scope.row)">编辑</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleClickDelete(scope.row.id)"
              >删除</el-button>
              <el-button
                type="warning"
                icon="el-icon-setting"
                @click="controlSettingDialogVisible(scope.row)"
              >分配权限</el-button>
            </div>
            <div v-else>
              <el-button
                type="success"
                icon="el-icon-check"
                size="small"
                circle
                @click="handleEditOk"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-close"
                size="small"
                circle
                @click="handleEditCancle"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="30%">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
        <el-form-item label="id" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="controlAddDialogVisible">取 消</el-button>
        <el-button type="primary" @click="handleAddOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="配置权限" :visible.sync="settingDialogVisible" width="30%">
      <el-tree
        :data="settingAuthority"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="[]"
        ref="tree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="controlSettingDialogVisible">取 消</el-button>
        <el-button type="primary" @click="handleSettingOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import breadcrumb from '@/components/Breadcrumb'
import { getAllIdFromTree } from './utils'

export default {
  name: 'role',
  components: { breadcrumb },
  data: function() {
    return {
      settingDialogVisible: false,
      editId: null,
      editRow: {},
      tableData: [], // 列表数据
      addDialogVisible: false, // 添加角色弹窗visible
      addRules: {
        // 添加角色验证规则
        id: [{ required: true, message: '请输入id', trigger: 'blur' }],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      addForm: {
        // 添加角色form表单数据
        id: '',
        roleName: '',
        roleDesc: ''
      },
      settingAuthority: [], // 配置权限
      expandedKeys: [] // 权限树扩展的keys
    }
  },
  created() {
    this.init()
  },
  methods: {
    async getData() {
      // 获取table数据
      const { data } = await import('./utils/data.json')
      this.tableData = [...data]
    },
    async getTreeData() {
      // 获取权限树结构
      const { treeData } = await import('./utils/authorityTreeData.json')
      this.settingAuthority = [...treeData]
      this.expandedKeys = getAllIdFromTree(treeData)
    },
    async init() {
      // 初始化页面数据
      await this.getData()
      await this.getTreeData()
    },
    controlAddDialogVisible() {
      // 控制添加角色弹窗visible
      this.addDialogVisible = !this.addDialogVisible
    },
    async handleAddOk() {
      // 添加角色弹窗点击确定
      await this.tableData.push({ ...this.addForm })
      await this.clearAddForm()
      await this.controlAddDialogVisible()
    },
    clearAddForm() {
      // 清空addForm数据
      this.addForm = {
        id: '',
        roleName: '',
        roleDesc: ''
      }
    },
    handleClickEdit(rowData) {
      // 点击编辑按钮
      this.editId = rowData.id
      this.editRow = { ...rowData }
    },
    handleEditOk() {
      // 编辑确定
      this.tableData = this.tableData.map(item => {
        const { id } = item
        if (id === this.editId) {
          return {
            ...this.editRow
          }
        }
        return item
      })
      this.editId = null
      this.editRow = {}
    },
    handleEditCancle() {
      // 编辑取消
      this.editId = null
      this.editRow = {}
    },
    handleClickDelete(id) {
      // 点击删除按钮
      this.tableData = this.tableData.filter(item => id !== item.id)
    },
    handleClickClose(id1, id2, id3, id4) {
      // 点击三级权限删除
      this.$confirm('确定删除此权限？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async res => {
          await this.tableData.some(item1 => {
            if (id1 === item1.id) {
              Array.isArray(item1.children) &&
                item1.children.some(item2 => {
                  if (id2 === item2.id) {
                    Array.isArray(item2.children) &&
                      item2.children.some(item3 => {
                        if (id3 === item3.id) {
                          item3.children = item3.children.filter(
                            item4 => id4 !== item4.id
                          )
                          return true
                        }
                        return false
                      })
                    return true
                  }
                  return false
                })
              return true
            }
            return false
          })
          await this.$message({
            showClose: true,
            message: '删除成功！',
            type: 'success'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    controlSettingDialogVisible(rowData) {
      // 控制配置权限弹窗
      this.settingDialogVisible = !this.settingDialogVisible
    },
    handleSettingOk() {
      // 权限配置点击确定
      const nodes = this.getChecked()
      console.log(nodes)
      this.controlSettingDialogVisible()
    },
    getChecked() {
      // 获取tree组件选中的节点
      return this.$refs.tree.getCheckedNodes()
    }
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
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>