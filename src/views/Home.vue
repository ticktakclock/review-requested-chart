<template>
  <div class="home">
    <RequestedReviewerChart />
  </div>
</template>

<script>
// @ is an alias to /src
import RequestedReviewerChart from "@/components/RequestedReviewerChart.vue";

export default {
  name: "Home",
  components: {
    RequestedReviewerChart
  }
};
</script>
