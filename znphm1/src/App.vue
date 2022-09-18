<template>
  <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
    ">
    <ProductForm />
    <ProductTable />
    <Snackbar />
  </div>
</template>

<script>
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm.vue";
import Snackbar from "./Snackbar.vue";
export default {
  name: "App",
  components: {
    ProductTable,
    ProductForm,
    Snackbar
},
  
};
</script>