<template>
    <!-- テーブルはコンポーネント化してもいいかもね -->
    <!-- 配列の管理もテーブルのコンポーネントに任せた方がいいね -->
    <v-simple-table style="text-align: center; margin-top: 30px">
        <thead>
            <tr>
                <th>商品コード</th>
                <th>商品名</th>
                <th>価格</th>
                <th>編集/削除</th>
            </tr>
        </thead>
        <tbody>
            <Product v-for="p in products" v-bind:product="p" v-bind:key="p.code" />
        </tbody>
    </v-simple-table>
</template>
  
<script>
import dProduct from "./dProduct";
import Product from "./Product";
import { serverUrl } from "./config";
export default {
    name: "ProductTable",
    components: {
        Product,
    },
    computed: {
        products() {
            return this.$store.getters.products;
        },
    },
    methods: {
        setProductTable(products) {
            this.$store.commit("setProducts", products);
        },
        showSnackbar(text) {
            this.$store.commit("showSnackbar", text);
        },

        getProductsFromUsginAPI: async function () {
            const data = await(await fetch(serverUrl)
                .catch(() => {
                    this.$store.dispatch("showSnackbarAction", "データの取得に失敗しました");
                    return "[]";
                })).json();
            this.setProductTable(Array.from(data).map(p => new dProduct(p.id, p.name, p.price)));
        }
    },
    async mounted() {
        await this.getProductsFromUsginAPI();
        this.$store.dispatch("showSnackbarAction", "データを取得しました");
        setInterval(async () => await this.getProductsFromUsginAPI() , 10000);
    }
};
</script>