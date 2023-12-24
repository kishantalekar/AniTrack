import {Client, Account, Databases, ID} from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('658707bded959ffb36b8'); // Your project ID

export const appwrite = new Account(client);

export const appWriteDB = new Databases(client);

export const UniqueId = ID;
