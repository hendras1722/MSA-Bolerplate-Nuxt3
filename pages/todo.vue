<script setup lang="ts">
// import
import { useGetTodo } from "../store/todo";

// state menagement
const { datas, addData } = useGetTodo();
const state = reactive({
  title: "",
  description: "",
});

// function
const handleClick = async (): Promise<void> => {
  const stateRaw = JSON.parse(JSON.stringify(state));
  datas.push(stateRaw);
  const res = await addData(datas);
  if (res) {
    FunctionResetState(state);
  }
};

const handleClose = (value: number): void => {
  datas.splice(value, 1);
};
</script>

<template>
  <div>
    <div>Todo Apps</div>
    <v-text-field v-model="state.title" variant="outlined" solo></v-text-field>
    <v-text-field
      v-model="state.description"
      v-number
      variant="outlined"
      solo
    ></v-text-field>
    <!-- @change="handleChange" -->
    <v-btn
      rounded="md"
      color="#5eb233"
      elavation="1"
      class="white--text"
      variant="flat"
      @click="handleClick"
    >
      Add
    </v-btn>

    <div class="mt-5">
      <v-card class="mx-auto mt-3" v-for="(item, i) in datas" :key="i">
        <v-card-text class="d-flex align-center justify-space-between">
          <div>
            {{ item.title }}
          </div>
          <div>
            {{ item.description }}
          </div>
          <div>
            <v-btn
              rounded="md"
              color="error"
              elavation="1"
              variant="flat"
              @click="handleClose(i)"
            >
              <!-- -->
              Delete
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.white {
  &--text {
    color: white;
  }
}
</style>
