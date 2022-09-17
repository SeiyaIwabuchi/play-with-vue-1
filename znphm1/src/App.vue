<template>
  <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
    ">
    <!-- 入力フォームはコンポーネント化してもいいかもね -->
    <div style="
        display: flex;
        flex-direction: column;
        width: 300px;
        align-items: center;
      ">
      <div>
        <v-text-field label="商品コード" v-model="newProduct.code" filled clearable />
      </div>
      <div>
        <v-text-field label="商品名" v-model="newProduct.name" filled clearable />
      </div>
      <div>
        <v-text-field label="価格" v-model="newProduct.price" filled clearable />
      </div>
      <v-btn v-on:click="add">追加</v-btn>
    </div>
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
        <Product v-for="p in products" v-bind:product="p" v-bind:key="p.code" v-bind:events="events" />
      </tbody>
    </v-simple-table>
    <v-snackbar v-model="snackbar.isShow">
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar.isShow = false">
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import dProduct from "./dProduct";
import Product from "./Product";
const serverUrl = "http://192.168.1.5:3000/products";
export default {
  name: "App",
  components: {
    Product,
  },
  data() {
    return {
      products: [
        // new dProduct("A-00000001", "りんご", "100"),
        // new dProduct("A-00000002", "みかん", "200"),
      ],
      newProduct: new dProduct("", "", 0),
      events: {
        remove: this.remove,
        edit: this.edit,
      },
      snackbar: { isShow: false, text: "メッセージはありません" },
    };
  },
  methods: {
    add: async function () {
      // 最新のデータを取得する
      let data = await (await fetch(serverUrl)).json();
      this.products = Array.from(data).map(p => new dProduct(p.id, p.name, p.price));

      const sendData = JSON.stringify({
        // eslint-disable-next-line no-console
        id: (() => { console.log(this.newProduct); return this.newProduct.code })(),
        name: this.newProduct.name,
        price: this.newProduct.price
      });

      //新規データなら追加、既存データなら更新
      if (Array.from(data).find(p => p.id === this.newProduct.code) === undefined) {

        await fetch(serverUrl, {
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: sendData,
          method: "post"
        });
        this.snackbar.text = "追加しました";
      } else {
        await fetch(`${serverUrl}/${this.newProduct.code}`, {
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(sendData),
          method: "put"
        });
        this.snackbar.text = "更新しました";
      }

      // 更新後のデータを取得する
      data = await (await fetch(serverUrl)).json();
      this.products = Array.from(data).map(p => new dProduct(p.id, p.name, p.price));
      this.newProduct = new dProduct("", "", 0);
      this.snackbar.isShow = true;
    },

    //削除のコールバックメソッド、引数に対象のオブジェクトを渡す
    remove: async function (product /** 削除したい要素 */) {
      //このメソッドをProductコンポーネントに渡して実行してもらう

      // 最新のデータを取得する
      const data = await (await fetch(serverUrl)).json();
      this.products = Array.from(data).map(p => new dProduct(p.id, p.name, p.price));

      await fetch(`${serverUrl}/${product.code}`, { method: "delete" });
      this.snackbar.text = "削除しました";
      this.snackbar.isShow = true;
    },

    //編集のコールバックメソッド、引数に対象のオブジェクトを渡す
    edit: async function (product /** 編集したい要素 */) {
      //このメソッドをProductコンポーネントに渡して実行してもらう

      // 最新のデータを取得する
      const data = await (await fetch(serverUrl)).json();
      this.products = Array.from(data).map(p => new dProduct(p.id, p.name, p.price));

      // オブジェクトのcode(id)をもとにフォームにセットする
      this.newProduct = this.products.find(p => p.code === product.code);
    },
  },
  mounted() {
    setInterval(async () => {
      const data = await (await fetch(serverUrl)
        .catch(() => {
          this.snackbar.text = "データの取得に失敗しました";
          this.snackbar.isShow = true;
          return "[]";
        })).json();
      this.products = Array.from(data).map(p => new dProduct(p.id, p.name, p.price));
    }, 500);
  }
};
</script>

<style>

</style>
