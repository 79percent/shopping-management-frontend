// 从权限树中获取到全部id
export const getAllIdFromTree = (tree, arr = []) => {
  if (Array.isArray(tree) && tree.length > 0) {
    tree.forEach(item => {
      const { id, children } = item
      arr.push(id)
      getAllIdFromTree(children, arr)
    })
  }
  return arr
}