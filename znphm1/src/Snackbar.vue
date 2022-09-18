<template>
    <v-snackbar v-model="snackbar.isShow">
        {{ snackbar.text }}

        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="close()">
                閉じる
            </v-btn>
        </template>
    </v-snackbar>
</template>
  
<script>
export default {
    name: "Snackbar",
    computed: {
        snackbar() {
            return this.$store.getters.snackbar;
        }
    },
    methods: {
        close() {
            this.$store.commit("setSnackbar", Object.assign(this.snackbar, { isShow: false }));
        }
    }
};
</script>