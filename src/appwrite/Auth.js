import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65aab4a9d42dba77b7c4"); // Replace with your project ID

export const account = new Account(client);

export const databases = new Databases(client,);
export { ID } from "appwrite";
