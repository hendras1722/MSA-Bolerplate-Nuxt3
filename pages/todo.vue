<script setup lang="ts">
const stateInput = useState(() => "");
const stateArray = useState(() => []);

const handleClick = (): void => {
  stateArray.value = [...stateArray.value, stateInput.value];
  stateInput.value = "";
};

const handleClose = (value: number): void => {
  let splice = stateArray.value.splice(value, 1);
  stateArray.value = stateArray.value.filter((item) => !splice.includes(item));
};
</script>

<template>
  <div>
    <div>Todo Apps</div>
    <v-text-field
      v-numeric
      v-model="stateInput"
      variant="outlined"
      solo
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
