<template>
  <div class="home">
    <RequestedCounter />
  </div>
</template>

<script>
// @ is an alias to /src
import RequestedCounter from "@/components/RequestedCounter.vue";

export default {
  name: "Home",
  components: {
    RequestedCounter
  }
};
</script>
