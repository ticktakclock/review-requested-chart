<template>
  <div class="home">
    <RequestedReviewChart />
  </div>
</template>

<script>
// @ is an alias to /src
import RequestedReviewChart from "@/components/RequestedReviewChart.vue";

export default {
  name: "Home",
  components: {
    RequestedReviewChart
  }
};
</script>
