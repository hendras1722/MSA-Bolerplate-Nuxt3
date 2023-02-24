<script setup lang="ts">
import { createSignal } from "../module/state";
import { Hello } from "../module/hello";
const stateInput = useState(() => "");
const stateArray = useState(() => []);
const [page, setPage] = createSignal(0);

const handleClick = (): void => {
  stateArray.value = [...stateArray.value, stateInput.value];
  handleAdd(stateArray.value);
  stateInput.value = "";
};

const handleClose = (value: number): void => {
  let splice = stateArray.value.splice(value, 1);
  stateArray.value = stateArray.value.filter((item) => !splice.includes(item));
};
const handleChange = (e) => {
  setPage(e.target.value);
};

const formData = reactive({
  email: "",
  password: "",
  confirmPassword: null,
});

const handleAdd = async (value: Hello): Promise<void> => {
  const res = await $fetch("/dummy/products/add", {
    method: "POST",
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res, "inires");
};
</script>

<template>
  <div>
    <div>Todo Apps</div>
    <v-text-field
      v-model="stateInput"
      v-number
      variant="outlined"
      solo
      @change="handleChange"
    ></v-text-field>
    <v-btn
      rounded="md"
      color="#5eb233"
      elavation="1"
      class="white--text"
      variant="flat"
      @click="handleClick()"
    >
      Add
    </v-btn>

    <div class="mt-5">
      <v-card class="mx-auto mt-3" v-for="(item, i) in stateArray" :key="i">
        <v-card-text class="d-flex align-center justify-space-between">
          <div>
            {{ item }}
          </div>
          <div>
            <v-btn
              rounded="md"
              color="error"
              elavation="1"
              variant="flat"
              @click="handleClose(i)"
            >
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
