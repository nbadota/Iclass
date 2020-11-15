export default {
  $_setToken(state, value) { // 设置存储token
    state.token = value;
    localStorage.setItem('token', value);
  },
  $_removeStorage(state, value){  // 删除token
    localStorage.removeItem('token');
  },
};
