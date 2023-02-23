<script setup lang="ts">
import { Hello } from "../../module/hello";
import { DetailAPI } from "../../api/detail";
import { useGetData } from "../../store/getData";
import { GetData } from "../../module/GetData";

definePageMeta({
  layout: "admin",
});

const storeGetData = useGetData();
let getDatas = ref([]);
let computedGetDatas = computed(() => storeGetData.datas);
const headers: Array<{
  title: string;
  align: string;
  sortable: boolean;
  key: string;
}> = [
  {
    title: "User Id",
    align: "start",
    sortable: false,
    key: "userId",
  },
  { title: "Title", align: "start", key: "title" },
  { title: "Body", align: "start", key: "body" },
];
onMounted(() => {
  storeGetData.getData();
});
// unref(computedGetDatas).forEach((x) => console.log(x));
const state = useState(() => []);
watch(
  computedGetDatas,
  (val, old) => {
    const rawObject = Object.assign({}, val);
    state.value = [...state.value, rawObject];
  },
  { immediate: true }
);

// const stateData = useState(() => []);

// function divideArray(array, length) {
//   const newArray = [...array];
//   const divideRes = Math.floor(newArray.length / length);
//   let results = [];

//   for (let i = 0; i < length; i++) {
//     results.push(newArray.splice(0, divideRes));
//   }

//   for (let i = 0; i < newArray.length; i++) {
//     results[i].push(newArray[i]);
//   }

//   results = results.filter((itm) => itm.length);

//   return results;
// }

// stateData.value = storeGetData.getData();
// console.log(stateData.value, "inistatedata");
</script>

<template>
  <div>
    <div>
      <v-data-table
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
      </v-table>
      <!-- {{ computedGetDatas }} -->
    </div>
  </div>
</template>
