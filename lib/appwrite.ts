import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';


export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "66a0fe3b00039f9bfa6c",
  databaseId: '66a0fff1000b7bf5cb07',
  platform: "com.zwg.aora",
  userCollection: '66a1002900015b626a35',
  videoCollection: '66a0fff1000b7bf5cb07',
  storageId: '66a1029d0024aab1204f'
}

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);

const avatars = new Avatars(client);

const databases = new Databases(client);

// Register User
export async function createUser(email: string, password: string, username: string) {
  const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    username
  );
  if (!newAccount) throw Error
  const avatarUrl = avatars.getInitials(username);

  await signIn(email, password);

  const newUser = await databases.createDocument(
    config.databaseId,
    config.userCollection,
    ID.unique(),
    {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl
    }
  )

  return newUser;
}

export async function signIn(email: string, password: string) {
  const session = await account.createEmailPasswordSession(email, password);
  return session
}


// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw error;
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollection,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}