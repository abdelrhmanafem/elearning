import { Client, Account, Databases } from 'appwrite';

// Note: The Appwrite backend should be hosted in a region of your choice.
// As requested, this configuration assumes deployment in a region like 'me-central2'
// on your preferred cloud provider.

// --- Appwrite Configuration ---
// It's recommended to use environment variables for these values.
// Replace with your Appwrite Project ID and Endpoint.
const APPWRITE_PROJECT_ID = 'learnify-test-project';
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';

// --- Database Configuration ---
export const APPWRITE_DATABASE_ID = 'learnify-db';
export const COURSES_COLLECTION_ID = 'courses';
export const PROGRESS_COLLECTION_ID = 'progress';


const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
