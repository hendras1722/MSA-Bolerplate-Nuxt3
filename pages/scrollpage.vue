<template>
  <div>
    <main>
      <section id="section-1">
        <div>1</div>
      </section>
      <section id="section-2">
        <div>2</div>
      </section>
      <section id="section-3">
        <div>3</div>
      </section>
      <section id="section-4">
        <div>4</div>
      </section>
      <section id="section-5">
        <div>5</div>
      </section>
    </main>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
main {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  /* scroll-snap-type: y proximity; */
}

main > section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #7c68ee;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

main > section:nth-child(odd) {
  background: #80ffd4;
}

main > section > div {
  font-size: 80px;
  font-weight: 700;
  color: #fff;
}
</style>
