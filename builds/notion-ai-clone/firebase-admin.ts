import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApp, getApps, App, cert } from "firebase-admin/app";
import { ServiceAccount } from "firebase-admin";

import serviceKey from "@/service_key.json";

let app: App;

if (getApps().length === 0) {
  app = initializeApp({ credential: cert(serviceKey as ServiceAccount) });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
