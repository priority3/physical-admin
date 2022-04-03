const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  list: state => state.list.tableList,
  detailName: state => state.list.detailName,
  detailId: state => state.list.detailId,
  permission_routes: state => state.permission.routes,
  roles: state => state.user.roles,
  headid: state => state.user.headid

}
export default getters
