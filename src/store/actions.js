//给action注册事件处理函数
export function setUserInfo({commit},user) {
  return commit('setUserInfo',user)
}
export function setDailyBaseDetail({commit},dailyDaseDetails) {
  return commit('setDailyBaseDetail',dailyDaseDetails)
}

export function setPatientCase({commit},patientCase) {
  return commit('setPatientCase',patientCase)
}

