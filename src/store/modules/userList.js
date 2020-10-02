export default {
  namespaced: true,
  state: () => ({
    editRow: {
      id: '',
      name: '',
      email: '',
      mobile: '',
      role: '',
      status: true
    },
    ruleForm: {
      name: '',
      email: '',
      mobile: '',
      role: '',
      status: true
    },
    rules: {
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
      ],
      email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
      mobile: [{ required: true, message: '请输入电话', trigger: 'blur' }],
      role: [{ required: true, message: '请选择角色', trigger: 'blur' }]
    },
    addDialogVisible: false,
    searchValue: '',
    currentPage: 1,
    pageSize: 5,
    pageSizes: [5, 10, 15, 20],
    tableData: [],
    editRowId: null
  }),
  getters: {
    editRowId: ({ editRowId }) => editRowId,
    editRow: ({ editRow }) => editRow,
    ruleForm: ({ ruleForm }) => ruleForm,
    rules: ({ rules }) => rules,
    addDialogVisible: ({ addDialogVisible }) => addDialogVisible,
    searchValue: ({ searchValue }) => searchValue,
    currentPage: ({ currentPage }) => currentPage,
    pageSize: ({ pageSize }) => pageSize,
    pageSizes: ({ pageSizes }) => pageSizes,
    tableData: ({ tableData }) => tableData,
  },
  mutations: {
    updateState(state, payload) {
      const {
        editRowId,
        editRow,
        ruleForm,
        rules,
        addDialogVisible,
        searchValue,
        currentPage,
        pageSize,
        pageSizes,
        tableData
      } = payload;
      editRowId !== undefined && (state.editRowId = editRowId);
      editRow !== undefined && (state.editRow = editRow);
      ruleForm !== undefined && (state.ruleForm = ruleForm);
      rules !== undefined && (state.rules = rules);
      addDialogVisible !== undefined && (state.addDialogVisible = addDialogVisible);
      searchValue !== undefined && (state.searchValue = searchValue);
      currentPage !== undefined && (state.currentPage = currentPage);
      pageSize !== undefined && (state.pageSize = pageSize);
      pageSizes !== undefined && (state.pageSizes = pageSizes);
      tableData !== undefined && (state.tableData = tableData);
    },
  },
  actions: {
    async getData({ commit, state }) {
      const { tableData } = await import('@/views/userManagement/utils')
      const { searchValue } = state;
      const newTableData = tableData.filter(item => {
        const { name } = item
        return name.includes(searchValue)
      })
      commit('updateState', {
        tableData: newTableData
      })
    }
  },
}
