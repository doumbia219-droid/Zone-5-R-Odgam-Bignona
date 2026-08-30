# La ZONE 5/R de l'ODGAM de Bignona

Application de gestion des résultats de football (Senior / Cadette) : poules,
rencontres, classement, buteurs, cartons.

## Construire l'APK automatiquement (GitHub Actions)

Ce dépôt contient un robot de compilation (`.github/workflows/build-apk.yml`)
qui génère l'APK Android automatiquement.

1. Allez dans l'onglet **Actions** de ce dépôt.
2. Le workflow **"Build Android APK"** se lance automatiquement après chaque
   envoi de fichier. Sinon, cliquez dessus puis **"Run workflow"**.
3. Patientez quelques minutes jusqu'à la coche verte ✅.
4. Ouvrez le run terminé, puis téléchargez l'artifact
   **zone5r-odgam-bignona-apk** en bas de page : il contient `app-debug.apk`.
5. Transférez cet APK sur un téléphone Android et installez-le (autoriser
   "sources inconnues" si demandé).
