# vmeet-ionic

## To run and test locally

Install ionic:
```bash
npm install -g @ionic/cli
```
Install dependency:
```bash
npm install
```
Ionic can be called by **ionic**

### To run the application in browser:
```bash
ionic serve
```
Ionic app runs in **http://localhost:8100** by default.
Build the application (into www):
```bash
ionic build
```

### To run the application in Android Studio
Add android to the capacitor project:
```bash
ionic cap add android
```
Sync changes made in the code to Android:
```bash
ionic cap sync android
```
Open Emulator (Android Studio):
```bash
ionic cap open android
```

### To run the application in Xcode (ios)
Add android to the capacitor project:
```bash
ionic cap add ios
```
Sync changes made in the code to Android:
```bash
ionic cap sync ios
```
Open Emulator (Android Studio):
```bash
ionic cap open ios
```