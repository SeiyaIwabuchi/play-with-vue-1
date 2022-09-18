<template>
    <!-- 入力フォームはコンポーネント化してもいいかもね -->
    <div style="
          display: flex;
          flex-direction: column;
          width: 300px;
          align-items: center;
        ">
        <div>
            <v-text-field label="商品コード" :rules="rules" hide-details="auto" v-model="productForm.code" filled clearable />
        </div>
        <div>
            <v-text-field label="商品名" v-model="productForm.name" filled clearable />
        </div>
        <div>
            <v-text-field label="価格" v-model="productForm.price" filled clearable />
        </div>
        <v-btn @click="doAfterValidation(error, add)">追加</v-btn>
    </div>
</template>
  
<script>
import dProduct from "./dProduct";
const serverUrl = "http://192.168.1.5:3000/products";
export default {
    name: "ProductForm",
    computed: {
        productForm() {
            return this.$store.getters.productForm;
        }
    },
    data() {
        return {
            error: false,
            rules: [
                value => {
                    this.error = value.length < 1;
                    return !!value || 'Required.';
                }
            ],
        };
    },
    methods: {
        setProductTable(products) {
            this.$store.commit("setProducts", products)
        },
        showSnackbar(text){
            this.$store.commit("showSnackbar", text);
        },
        setProductForm(product) {
            this.$store.commit("setProductForm", product);
        },
        doAfterValidation: function (test, callback) {
            if (!test) callback();

            this.showSnackbar("エラー:入力内容を確認してください");
        },
        add: async function () {
            // 最新のデータを取得する
            let data = await (await fetch(serverUrl)).json();

            this.setProductTable(Array.from(data).map(p => new dProduct(p.id, p.name, p.price)));

            const sendData = JSON.stringify({
                id: this.productForm.code,
                name: this.productForm.name,
                price: this.productForm.price
            });

            //新規データなら追加、既存データなら更新
            if (Array.from(data).find(p => p.id === this.productForm.code) === undefined) {

                await fetch(serverUrl, {
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: sendData,
                    method: "post"
                });
                this.showSnackbar("追加しました");
            } else {
                await fetch(`${serverUrl}/${this.productForm.code}`, {
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: sendData,
                    method: "put"
                });
                this.showSnackbar("更新しました");
            }

            // 更新後のデータを取得する
            data = await (await fetch(serverUrl)).json();

            this.setProductTable(Array.from(data).map(p => new dProduct(p.id, p.name, p.price)));

            this.setProductForm(new dProduct("", "", 0));
        },
    },
};
</script>