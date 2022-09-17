<template>
  <tr>
    <td>{{ product.code }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.price }}</td>
    <td>
      <v-btn v-on:click="edit" style="margin: 10px">編集</v-btn>
      <v-btn v-on:click="remove">削除</v-btn>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Product",
  props: ["product", "events"],
  methods: {
    remove: function () {
      this.$emit("remove", this.product);
    },
    edit: function () {
      this.$emit("edit", this.product);
    },
  },
};
</script>

<style>
</style>