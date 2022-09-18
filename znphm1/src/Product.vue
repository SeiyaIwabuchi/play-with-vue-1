<template>
  <tr>
    <td>{{ product.code }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.price }}</td>
    <td>
      <v-btn @click="edit" style="margin: 10px">編集</v-btn>
      <v-btn @click="remove">削除</v-btn>
    </td>
  </tr>
</template>

<script>
import dProduct from "./dProduct";
import { serverUrl } from "./config";
export default {
  name: "Product",
  props: ["product"],
  computed: {
    products() {
      return this.$store.getters.products;
    }
  },
  methods: {
    setProductTable(products) {
      this.$store.commit("setProducts", products);
    },
    showSnackbar(text) {
      this.$store.commit("showSnackbar", text);
    },
    setProductForm(product) {
      this.$store.commit("setProductForm", product);
    },
    remove: async function () {

      // 最新のデータを取得する
      let data = await (await fetch(serverUrl)).json();
      this.setProductTable(Array.from(data).map(p => new dProduct(p.id, p.name, p.price)));

      await fetch(`${serverUrl}/${this.product.code}`, { method: "delete" });

      // 削除後のデータを取得する
      data = await (await fetch(serverUrl)).json();
      this.setProductTable(Array.from(data).map(p => new dProduct(p.id, p.name, p.price)));

      this.showSnackbar("削除しました");
    },

    edit: async function () {

      // 最新のデータを取得する
      let data = await (await fetch(serverUrl)).json();
      this.setProductTable(Array.from(data).map(p => new dProduct(p.id, p.name, p.price)));

      // オブジェクトのcode(id)をもとにフォームにセットする
      this.setProductForm(this.products.find(p => p.code === this.product.code));
    },
  },
};
</script>

<style>

</style>