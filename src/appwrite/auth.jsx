import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    try {
      console.log("Initializing Auth client with:", {
        endpoint: conf.appwriteurl,
        projectId: conf.appwriteProjectId
      });
      
      this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteProjectId);
      this.account = new Account(this.client);
      
      console.log("Auth client initialized successfully");
    } catch (error) {
      console.error("Error initializing Auth client:", error);
      throw error;
    }
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("getCurrentUser error:", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("logout error:", error);
    }
  }
}

const authService = new AuthService();
export default authService;
