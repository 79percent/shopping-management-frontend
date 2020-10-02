import breadcrumb from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'

export default {
  name: 'userList',
  components: { breadcrumb },
  computed: {
    ...mapGetters('userList', [
      'editRowId',
      'editRow',
      'ruleForm',
      'rules',
      'addDialogVisible',
      'currentPage',
      'pageSize',
      'pageSizes',
      'tableData',
    ]),
    searchValue: {
      get() {
        return this.$store.state.userList.searchValue
      },
      set(val) {
        this.$store.commit('userList/updateState', {
          searchValue: val,
        })
      }
    },
    addDialogVisible: {
      get() {
        return this.$store.state.userList.addDialogVisible
      },
      set(val) {
        this.$store.commit('userList/updateState', {
          addDialogVisible: val,
        })
      }
    }
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created')
    this.$store.dispatch('userList/getData')
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  destroyed() {
    console.log('destroyed');
  },
  methods: {
    //编辑
    handleEdit(rowId, row) {
      this.$store.commit('userList/updateState', {
        editRowId: rowId,
        editRow: { ...row }
      })
    },
    async handleEditOk() {
      const tableData = this.tableData.map(item => {
        const { id, status } = item
        if (id === this.editRowId) {
          return { ...this.editRow, status }
        } else {
          return item
        }
      })
      await this.$store.commit('userList/updateState', {
        tableData,
        editRowId: null
      })
      await this.$message({
        showClose: true,
        message: '修改成功！',
        type: 'success'
      })
    },
    handleEditCancle() {
      this.$store.commit('userList/updateState', {
        editRowId: null,
      })
    },
    //删除
    handleDelete(rowId) {
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const tableData = this.tableData.filter(item => {
            const { id } = item
            return id !== rowId
          })
          this.$store.commit('userList/updateState', {
            tableData,
          })
          this.$message({
            showClose: true,
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //页码改变
    handleSizeChange(val) {
      this.$store.commit('userList/updateState', {
        pageSize: val,
      })
    },
    //当前页数改变
    handleCurrentChange(val) {
      this.$store.commit('userList/updateState', {
        currentPage: val,
      })
    },
    //当前页的列表
    filterCurrentList(index) {
      const { currentPage, pageSize } = this
      const prev = (currentPage - 1) * pageSize
      const next = currentPage * pageSize
      return index >= prev && index < next
    },
    //状态改变
    handleStatusChange(rowId, value) {
      const tableData = this.tableData.map(item => {
        const { id } = item
        if (id === rowId) {
          this.$message({
            showClose: true,
            message: '修改状态成功！',
            type: 'success'
          })
          return {
            ...item,
            status: value
          }
        }
        return item
      })
      this.$store.commit('userList/updateState', {
        tableData,
      })
    },
    //搜索
    handleSearch() {
      this.$store.dispatch('userList/getData')
    },
    //清除搜索框
    async handleClear() {
      await this.$store.commit('userList/updateState', {
        searchValue: '',
      })
      await this.$store.dispatch('userList/getData')
    },
    //点击添加用户
    handleAddUserBtnClick() {
      this.$store.commit('userList/updateState', {
        addDialogVisible: true,
      })
    },
    //取消添加用户
    handleAddUserCancle() {
      this.$store.commit('userList/updateState', {
        addDialogVisible: false,
      })
    },
    //确认添加用户
    handleAddUserOk() {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          console.log(this.ruleForm)
          const len = this.tableData.length
          const id = this.tableData[len - 1].id + 1
          const newTableData = [...this.tableData, { ...this.ruleForm, id }]
          await this.$store.commit('userList/updateState', {
            addDialogVisible: false,
            tableData: newTableData,
            ruleForm: {
              name: '',
              email: '',
              mobile: '',
              role: '',
              status: true
            }
          })
          await this.$message({
            showClose: true,
            message: '添加用户成功！',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}