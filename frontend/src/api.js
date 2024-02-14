import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class CoffeeApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CoffeeApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // Get the current user
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // Get products
  static async getProducts(searchTerm = "") {
    let res = await this.request(
      `products?search=${encodeURIComponent(searchTerm)}`
    );
    return res.products;
  }

  // Get product by id
  static async getProduct(id) {
    let res = await this.request(`products/${id}`);
    return res.product;
  }

  // Signup for site
  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  // Get token for login from username, password
  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  // Save user profile edits
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  // Delete user profile
  static async deleteProfile(username) {
    await this.request(`users/${username}`, {}, "delete");
  }

  // Add a transaction
  static async addTransaction(username, transactionData) {
    let res = await this.request(
      `users/${username}/transactions`,
      transactionData,
      "post"
    );
    return res.transaction;
  }

  // Get transactions of a user
  static async getTransactions(username) {
    let res = await this.request(`users/${username}/transactions`);
    return res.transactions;
  }
}

// for now, put token ("testuser" / "password" on class)
CoffeeApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default CoffeeApi;
