<script setup lang="ts">
import { Hello } from "./module/hello";
let name: string = "testing";

enum Device {
  Desktop = "DESKTOP",
  Mobile = "MOBILE",
}

let stringDevice: Device = Device.Desktop;

// Distributive property of Typescript
type return_dis<D> = D extends number ? D : never;

type show = number;

// Conditional types for number
type new_number = return_dis<show>;

let n1: new_number = 88;

let state = reactive({
  name: "",
  age: "",
});

let setState = toRefs(state);

function testingHello(value: Hello): void {
  value.age = 52;
  state = value;
  setState.name.value = "hello";
}

async function testingFetch() {
  const fetchJSONCode = await $fetch("/fallback/posts/1");
  console.log(fetch, fetchJSONCode);
}

onMounted(() => {
  testingFetch();
  testingHello({
    name: "wewe",
    age: "12",
  });
});
</script>

<template>
  <div>
    <v-btn icon="mdi-heart" color="primary"></v-btn>
    <div>Navbar</div>
    {{ state }}
    {{ setState }}
    <div>
      {{ name }}
    </div>
  </div>
</template>
