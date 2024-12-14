import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URL,
  token_uri: process.env.TOKEN_URL,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_PROVIDER_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN, 
} as unknown as admin.ServiceAccount; 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;


