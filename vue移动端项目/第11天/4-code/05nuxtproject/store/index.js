export const state = () => ({
  user: ''
});

export const mutations = {
  setuser(state, user) {
    state.user = user;
    // 保存到本地
    window.localStorage.setItem("user", JSON.stringify(user));
  }
};
