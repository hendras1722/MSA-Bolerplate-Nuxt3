export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("number", {
    created(el, binding, vnode, prevVnode) {
      // see below for details on arguments
    },
    // called right before the element is inserted into the DOM.
    beforeMount(el, binding, vnode, prevVnode) {},
    // called when the bound element's parent component
    // and all its children are mounted.
    mounted(el, binding, vnode, prevVnode) {},
    // called before the parent component is updated
    beforeUpdate(el, binding, vnode, prevVnode) {},
    // called after the parent component and
    // all of its children have updated
    updated(el, binding, vnode, prevVnode): Boolean {
      const html = el as HTMLInputElement;
      html.addEventListener("keypress", (evt) => {
        evt = evt || window.event;
        const charCode = evt.which ? evt.which : evt.keyCode;
        if (charCode < 48 || charCode > 57) evt.preventDefault();
        else return true;
      });
    },
    // called before the parent component is unmounted
    beforeUnmount(el, binding, vnode, prevVnode) {},
    // called when the parent component is unmounted
    unmounted(el, binding, vnode, prevVnode) {},
  });
});
