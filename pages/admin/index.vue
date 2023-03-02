<script setup lang="ts">
import { useGetData } from "../../store/getData";
import { computed, ref } from "vue";
import type { Header, Item } from "vue3-easy-data-table";

// reff
let page = ref<number>(1);
const pageSelect = ref(10);
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

// const isFirstPage = computed(() => dataTable.value?.isFirstPage);
// const isLastPage = computed(() => dataTable.value?.isLastPage);

// const nextPage = () => {
//   dataTable.value.nextPage();
// };
// const prevPage = () => {
//   dataTable.value.prevPage();
// };

const updatePagePagination = () => {
  dataTable.value.updatePage(page.value);
};
// const updatePage = (paginationNumber: number) => {
//   console.log(paginationNumber, page.value);
//   dataTable.value.updatePage(paginationNumber);
// };

// rows per page related
const rowsPerPageOptions = computed(() => dataTable.value?.rowsPerPageOptions);
const rowsPerPageActiveOption = computed(
  () => dataTable.value?.rowsPerPageActiveOption
);

const handleChange = (e: number) => {
  dataTable.value.updateRowsPerPageActiveOption(e);

  if (maxPaginationNumber.value <= page.value) {
    page.value = maxPaginationNumber.value;
  }
};

const updateRowsPerPageSelect = (e: Event) => {
  dataTable.value.updateRowsPerPageActiveOption(
    Number((e.target as HTMLInputElement).value)
  );
};

const headers: Header[] = [
  { text: "Title", value: "title" },
  { text: "Description", value: "body" },
];

definePageMeta({
  layout: "admin",
});

const storeGetData = useGetData();
let computedGetDatas = computed(() => storeGetData.dataGetData);
onMounted(() => {
  storeGetData.getDatas();
});
const state = useState<Item[]>(() => []);
watch(
  computedGetDatas,
  (val, old) => {
    const value = toRaw(val);
    state.value = value;
  },
  { immediate: true }
);

watch(pageSelect, (val, old) => {
  handleChange(val);
});
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
        table-class-name="customize-table"
      />
      <div class="customize-footer">
        <div class="d-flex justify-space-between mt-5">
          <v-select
            v-model="pageSelect"
            :items="rowsPerPageOptions"
            variant="solo"
            class="select"
            :dense="true"
          ></v-select>

          <v-pagination
            v-model="page"
            :length="maxPaginationNumber"
            @click="updatePagePagination"
            :total-visible="5"
            class="page-table"
          ></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select {
  max-width: 100px !important;
  max-height: 30px !important;
}
</style>
