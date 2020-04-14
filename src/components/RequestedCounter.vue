<template>
  <div id="RequestedCounter">
    <div>
      <div>
        <span>token</span>
        <input type="text" v-model="token" />
        <span>organization</span>
        <input type="text" v-model="organization" />
        <span>team</span>
        <input type="text" v-model="team" />
        <button v-on:click="onClickButton">search</button>
      </div>
    </div>
    <div v-if="error">
      <span :style="errorStyle">error</span>
    </div>
    <div :style="chartContainerStyles">
      <ChartBar
        v-if="loaded"
        :chartData="chartData"
        :options="chartOption"
        :style="chartStyles"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Chart from "chart.js";
import { ApiFactory } from "./ApiFactory";
import ChartBar from "./ChartBar.vue";
import { AxiosInstance } from "axios";

@Component({ components: { ChartBar } })
export default class RequestedCounter extends Vue {
  @Prop() private msg!: string;
  private members = [];
  private loaded = false;
  private token = "";
  private organization = "";
  private team = "";
  private error = null;

  private chartData: Chart.ChartData = {};
  private chartOption: Chart.ChartOptions = {
    maintainAspectRatio: false
  };
  private chartStyles = {
    height: "100%",
    width: "100%"
  };
  private chartContainerStyles = {
    position: "relative",
    height: "40vh",
    width: "80vw",
    margin: "0 auto"
  };

  private errorStyle = {
    color: "red"
  };

  async onClickMember(member: any): Promise<void> {
    console.log("click" + member);
  }

  async onClickButton(): Promise<void> {
    try {
      const factory: ApiFactory = new ApiFactory(this.token);
      const api: AxiosInstance = factory.create();
      const res = await api(
        "/orgs/" + this.organization + "/teams/" + this.team + "/members"
      );
      const results = await Promise.all(
        res.data.flatMap(async member => {
          const res = await api(
            "search/issues?q=is:open+is:pr+org:" +
              this.organization +
              "+archived:false" +
              "+review-requested:" +
              member.login +
              "&sort=created&order=asc&page=1&per_page=10"
          );
          return { member: member, issues: res.data.items };
        })
      );

      console.log(results);

      this.chartData = {
        // 横軸のラベル
        labels: results.map(result => result.member.login),
        // データのリスト
        datasets: [
          {
            label: "Review件数", // データのラベル
            data: results.map(result => result.issues.length) // データの値。labelsと同じサイズ
          }
        ]
      };
      this.loaded = true;
    } catch (e) {
      console.log(e);
      this.error = e;
    }
  }
}
</script>
