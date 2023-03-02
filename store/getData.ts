import { defineStore } from "pinia";
import { DetailAPI } from "../api/detail";

export const useGetData = defineStore("getData", {
  state: () => ({ dataGetData: [] as any, detail: {} }),
  getters: {
    // datasGet: (state) => state.datas,
    // detailGet: (state) => state.detail,
  },
  actions: {
    async getDatas(): Promise<void> {
      const fetchJSONCode = await $fetch(DetailAPI.GET_DATA);
      this.dataGetData = fetchJSONCode;
    },
  },
});
