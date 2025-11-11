import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"danote-ba2cb","appId":"1:544130838753:web:7413921346a25234f7c7a0","storageBucket":"danote-ba2cb.firebasestorage.app","apiKey":"AIzaSyCQOv3ZZQLNW8bzo2M6WIqy7CVrI7-pqX4","authDomain":"danote-ba2cb.firebaseapp.com","messagingSenderId":"544130838753","measurementId":"G-T7DG4K4TS9"})), provideFirestore(() => getFirestore())]
};
