import axios, { AxiosInstance } from "axios";

export class ApiFactory {
  private token = "";

  constructor(token: string) {
    this.token = token;
  }

  create(): AxiosInstance {
    return axios.create({
      baseURL: "https://api.github.com",
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + this.token
      },
      responseType: "json"
    });
  }
}
