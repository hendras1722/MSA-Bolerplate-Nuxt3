import { defineStore } from "pinia";
import { DetailAPI } from "../api/detail";
import { Todo } from "../module/todo";

export const useGetTodo = defineStore("getTodo", {
  state: () => ({ datas: [] as Todo[] }),
  getters: {},
  actions: {
    async addData(value: Todo[]) {
      const res = await $fetch("/dummy/products/add", {
        method: "POST",
        body: value,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => true);

      return true;
      //   this.datas = this.datas.push(value);
    },
  },
});
