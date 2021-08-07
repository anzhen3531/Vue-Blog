import Vue from 'vue'
import Vuex from 'vuex'
import {getTimeInterval} from '../utils/index'
import {fetchSocial} from '@/api'
// 网站基本信息 启动   应该由网络请求过来


Vue.use(Vuex)
// 略:后台获取系统运行时间
const runAt = '1589878800000';
let timer = null;
const state = {
    loading: false,
    token: null,
    runTimeInterval: '',  // 运行时阁异常
    socials: '',    // 社区值
    websiteInfo: {},   // 网站基本信息
    userInfo: null, // 用户基本信息
    searchInfo: {}
}


// 基本设置
const mutations = {

    // 设置加载信息
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    // 设置社区信息
    SET_SOCIALS: (state, v) => {
        state.socials = v;
    },
    // 设置站点信息
    SET_SITE_INFO: (state, userInfo) =>{
        state.userInfo = userInfo;   // 传递参数
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        // 存储的位置  为session 一次会话中保存  不能存储对象   只能序列化之后进行存储
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
        console.log( "通过store 保存成功 token", token )
    },
    // 获取运行时间间隔
    GET_RUNTIME_INTERVAL: (state) => {
        if (!timer || !state.runTimeInterval) {
            clearInterval(timer)
            timer = setInterval(() => {
                state.runTimeInterval = getTimeInterval(runAt);
            }, 1000);
        }
    },
    REMOVE : (state) => {
        // 清楚掉 数据
        // 清楚token 现在没写 后面再写
        // 请空值
        state.userInfo = null;
        //  将userInfo 的值 清空  使用session 保存 用户数据
        sessionStorage.setItem("userInfo", JSON.stringify(""))
        state.token = null;
        // token 使用本地保存    通过这个进行保存
        localStorage.setItem("token", null)
    },

    // 保存搜索信息
    SAVE_SEARCH_INFO : (state, searchInfo) => {
        state.searchInfo = searchInfo
    },

    REMOVE_SEARCH_INFO : (state) => {
        state.searchInfo = null;
    },

}

// 异步调用
const actions = {
    setLoading: ({commit}, v) => {
        commit('SET_LOADING', v);
    },
    initComputeTime: ({commit}) => {
        commit('GET_RUNTIME_INTERVAL');
    },
    getSiteInfo: (state) =>{
        return new Promise(resolve => {
            if (state.userInfo){
                resolve(state.userInfo)
            }
        })
    },
    // 获取社区信息
    getSocials: ({commit,state}) =>{
        return new Promise((resolve => {
            if (state.socials){
                resolve(state.socials)
            } else {
                fetchSocial().then(res =>{
                    let data = res.data || []
                    commit('SET_SOCIALS',data);
                    resolve(data);
                }).catch(err =>{
                    resolve([]);
                })
            }
        }))
    },
}

// 定义 getter 方法
const getters = {
    loading: state => state.loading,
    runTimeInterval: state => state.runTimeInterval,
    // 通知默认  显示
    notice: state => state.userInfo?state.userInfo.notice:'请登录  当前没有登录',
    getUserInfo: state => state.userInfo,
    getSearchInfo: state => state.searchInfo,   //将数据返回
    token: state => state.token
}
//
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {},
    getters
})
