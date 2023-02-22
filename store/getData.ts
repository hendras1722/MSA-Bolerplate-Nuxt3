import { defineStore } from "pinia";
import { DetailAPI } from "../api/detail";

export const useGetData = defineStore("getData", {
  state: () => ({ datas: [] as any, detail: {} }),
  getters: {
    // datasGet: (state) => state.datas,
    // detailGet: (state) => state.detail,
  },
  actions: {
    async getData(): Promise<void> {
      const fetchJSONCode = await $fetch(DetailAPI.GET_DATA);
      this.datas = fetchJSONCode;
      console.log(fetchJSONCode);
    },
  },
});
