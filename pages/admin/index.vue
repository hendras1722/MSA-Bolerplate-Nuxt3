<script setup lang="ts">
// import { Hello } from "../../module/hello";
// import { DetailAPI } from "../../api/detail";
import { useGetData } from "../../store/getData";
import { Header, Item } from "vue3-easy-data-table";
import { computed, ref } from "vue";
import { createSignal } from "../../module/state";
import { GetData } from "../../module/GetData";
// import {
//   usePagination,
//   useRowsPerPage,
//   UsePaginationReturn,
//   UseRowsPerPageReturn,
//   Header,
//   Item,
// } from "use-vue3-easy-data-table";

// const dataTable = ref();

// const {
//   currentPageFirstIndex,
//   currentPageLastIndex,
//   clientItemsLength,
//   maxPaginationNumber,
//   currentPaginationNumber,
//   isFirstPage,
//   isLastPage,
//   nextPage,
//   prevPage,
//   updatePage,
// }: UsePaginationReturn = usePagination(dataTable);

// const {
//   rowsPerPageOptions,
//   rowsPerPageActiveOption,
//   updateRowsPerPageActiveOption,
// }: UseRowsPerPageReturn = useRowsPerPage(dataTable);

// const updateRowsPerPageSelect = (e: Event) => {
//   updateRowsPerPageActiveOption(Number((e.target as HTMLInputElement).value));
// };

// const headers: Header[] = [
//   { text: "Name", value: "name" },
//   { text: "Address", value: "address" },
//   { text: "Height", value: "height", sortable: true },
//   { text: "Weight", value: "weight", sortable: true },
//   { text: "Age", value: "age", sortable: true },
//   { text: "Favourite sport", value: "favouriteSport" },
//   { text: "Favourite fruits", value: "favouriteFruits" },
// ];

const items: Item[] = [
  {
    name: "we",
  },
  {
    name: "we",
  },
  {
    name: "we",
  },
  {
    name: "we",
  },
  {
    name: "we",
  },
  {
    name: "we",
  },
  {
    name: "we",
  },
  {
    name: "we",
  },
  {
    name: "we",
  },
  {
    name: "we",
  },
];

const [page, setPage] = createSignal(0);

// $ref dataTable
const dataTable = ref();

// index related
const currentPageFirstIndex = computed(
  () => dataTable.value?.currentPageFirstIndex
);
const currentPageLastIndex = computed(
  () => dataTable.value?.currentPageLastIndex
);
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);

// pagination related
const maxPaginationNumber = computed(
  () => dataTable.value?.maxPaginationNumber
);
const currentPaginationNumber = computed(
  () => dataTable.value?.currentPaginationNumber
);

const isFirstPage = computed(() => dataTable.value?.isFirstPage);
const isLastPage = computed(() => dataTable.value?.isLastPage);

const nextPage = () => {
  dataTable.value.nextPage();
};
const prevPage = () => {
  dataTable.value.prevPage();
};
const pages = ref(1);
const updatePage = (paginationNumber: number) => {
  setPage(pages.value);

  dataTable.value.updatePage(page());
};

// rows per page related
const rowsPerPageOptions = computed(() => dataTable.value?.rowsPerPageOptions);
const rowsPerPageActiveOption = computed(
  () => dataTable.value?.rowsPerPageActiveOption
);

const updateRowsPerPageSelect = (e: Event) => {
  dataTable.value.updateRowsPerPageActiveOption(
    Number((e.target as HTMLInputElement).value)
  );
};

const headers: Header[] = [
  { text: "Name", value: "name" },
  { text: "Address", value: "address" },
  { text: "Height", value: "height", sortable: true },
  { text: "Weight", value: "weight", sortable: true },
  { text: "Age", value: "age", sortable: true },
  { text: "Favourite sport", value: "favouriteSport" },
  { text: "Favourite fruits", value: "favouriteFruits" },
];

definePageMeta({
  layout: "admin",
});

const storeGetData = useGetData();
let getDatas = ref([]);
let computedGetDatas = computed(() => storeGetData.datas) as any;
onMounted(() => {
  storeGetData.getData();
});
const state = useState(() => [] as GetData[]);
watch(
  computedGetDatas,
  (val, old) => {
    const value = toRaw(val).slice(0, 20);
    state.value = value;
  },
  { immediate: true }
);
</script>

<template>
  <div class="py-5">
    <div style="position: relative; z-index: 1">
      <easytable
        ref="dataTable"
        :headers="headers"
        :items="state"
        :rows-per-page="10"
        hide-footer
      />
      <div class="customize-footer">
        <div class="customize-rows-per-page">
          <select class="select-items" @change="updateRowsPerPageSelect">
            <option
              v-for="(item, i) in rowsPerPageOptions"
              :key="i"
              :selected="item === rowsPerPageActiveOption"
              :value="item"
            >
              {{ item }} rows per page
            </option>
          </select>
        </div>

        <div class="customize-index">
          Now displaying: {{ currentPageFirstIndex }} ~
          {{ currentPageLastIndex }} of {{ clientItemsLength }}
        </div>
        <v-pagination
          v-model="pages"
          :length="maxPaginationNumber"
          @click="updatePage"
          :total-visible="2"
        ></v-pagination>

        {{ maxPaginationNumber }}
        <div class="customize-buttons">
          <span
            v-for="paginationNumber in maxPaginationNumber"
            class="customize-button"
            :class="{ active: paginationNumber === currentPaginationNumber }"
            @click="updatePage(paginationNumber)"
          >
            {{ paginationNumber }}
          </span>
        </div>

        <div class="customize-pagination">
          <button class="prev-page" @click="prevPage" :disabled="isFirstPage">
            prev page
          </button>
          <button class="next-page" @click="nextPage" :disabled="isLastPage">
            next page
          </button>
        </div>
      </div>
      <!-- <v-data-table
        v-model:items-per-page="computedGetDatas.length"
        :headers="headers"
        :items="computedGetDatas"
        item-value="name"
        class="elevation-1"
      ></v-data-table>

      <v-table>
        <thead>
          <tr>
            <th class="text-left">User ID</th>
            <th class="text-left">Title</th>
            <th class="text-left">Body</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in computedGetDatas" :key="item.name">
            <td>{{ item.userId }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.body }}</td>
          </tr>
        </tbody>
      </v-table> -->
      <!-- {{ computedGetDatas }} -->
    </div>
  </div>
</template>
