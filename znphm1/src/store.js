import Vue from 'vue'
import Vuex from 'vuex'
import dProduct from "./dProduct";

Vue.use(Vuex)

// Vuexインスタンス生成
export default new Vuex.Store({
    // state: Vuexで管理する状態を定義
    state: {
        products:[],
        productForm: new dProduct("", "", 0),
        snackbar: { isShow: false, text: "メッセージはありません" },
    },

    // getters : stateの値を取得する処理を定義
    //   引数のstateは上で宣言した状態管理オブジェクト
    getters: {
        products: state => state.products,
        productForm: state => state.productForm,
        snackbar: state => state.snackbar,
    },

    // mutations : stateの値を変更する処理を定義
    //   引数のstateは上で宣言した状態管理オブジェクト
    //   非同期処理に対応していない
    mutations: {
        setProducts(state, produsts) {
            state.products = produsts;
        },
        setProductForm(state, product) {
            state.productForm = product;
        },
        setSnackbar(state, snackbar) {
            state.snackbar = snackbar;
        },
        showSnackbar(state, text) {
            state.snackbar.text = text;
            state.snackbar.isShow = true;
        }
    },
    // actions : mutationを呼び出す処理を定義
    //   非同期も対応している
    actions: {
        setProductsAction({ commit }, products) {        // 6
            commit('setProducts', products)
        },
        setProductFormAction({ commit }, product) {          // 7
            commit('setProductForm', product)
        },
        setSnackbarAction({ commit }, snackbar) {  // 7
            commit('setSnackbar', snackbar)
        },
        showSnackbarAction({ commit }, text) {
            commit('showSnackbar', text);
        }
    }
})