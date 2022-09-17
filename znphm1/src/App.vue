<template>
  <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
    ">
    <ProductForm @showSnackbar="showSnackbar" @setProductTable="setProductTable" @setProductFormSetter="setProductFormSetter" />
    <ProductTable @showSnackbar="showSnackbar" @setProductForm="setProductForm" @setProductTableSetter="setProductTableSetter" />
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
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm.vue";
export default {
  name: "App",
  components: {
    ProductTable,
    ProductForm
},
  data() {
    return {
      newProduct: new dProduct("", "", 0),
      snackbar: { isShow: false, text: "メッセージはありません" },
      error: false,
      rules: [
        value => {
          this.error = value.length < 1;
          return !!value || 'Required.';
        }
      ],
      setProductTable: function (){},
      setProductForm: function (){},
    };
  },
  methods: {
    // setterのsetterは意味が分からなすぎるので、
    // https://se-tomo.com/2018/11/03/vue-js-%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E9%96%93%E3%81%AE%E9%80%9A%E4%BF%A1/
    // イベントバス
    setProductTableSetter: function (productsSetter) {
      this.setProductTable = productsSetter;
    },
    showSnackbar: function (text) {
      this.snackbar.text = text;
      this.snackbar.isShow = true;
    },
    setProductFormSetter: function (productFormSetter) {
      this.setProductForm = productFormSetter;
    },
  },
};
</script>