<template>
  <div>
    <breadcrumb :currentPosition="['用户管理', '用户列表']" />
    <el-card>
      <!-- 搜索框和添加用户按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入姓名" v-model="searchValue" clearable @clear="handleClear">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="handleAddUserBtnClick">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- table列表 -->
      <el-table
        :data="tableData.filter((item, index) => filterCurrentList(index))"
        :row-key="row => row.id"
        border
        style="width: 100%"
      >
        <el-table-column prop="name" label="姓名" width="180">
          <template slot-scope="scope">
            <el-input v-model="editRow.name" v-if="editRowId === scope.row.id"></el-input>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="250">
          <template slot-scope="scope">
            <el-input v-model="editRow.email" v-if="editRowId === scope.row.id"></el-input>
            <span v-else>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
          <template slot-scope="scope">
            <el-input v-model="editRow.mobile" v-if="editRowId === scope.row.id"></el-input>
            <span v-else>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <el-select v-model="editRow.role" placeholder="请选择角色" v-if="editRowId === scope.row.id">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
            <span v-else>{{ scope.row.role }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#409EFF"
              inactive-color="#DCDFE6"
              @change="value => handleStatusChange(scope.row.id, value)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="editRowId !== scope.row.id">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="handleEdit(scope.row.id, scope.row)"
              />
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="handleDelete(scope.row.id)"
              />
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
      <!-- 分页信息 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </el-card>
    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="ruleForm.status"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAddUserCancle">取 消</el-button>
        <el-button type="primary" @click="handleAddUserOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./js"></script>

<style lang="less" scoped src="./css/index.less"></style>
