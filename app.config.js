module.exports = {
  expo: {
    name: "Sage-Vote",
    slug: "sage-vote",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "sage-vote",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/logo.png",
      resizeMode: "contain",
      backgroundColor: "#F5F9F2"
    },
    ios: {
      supportsTablet: false,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      bundleIdentifier: "com.carolyn.sagevote.app",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      "package": "com.carolyn.sagevote.app"
    },
    plugins: [
      "expo-router",
      "expo-splash-screen",
      "@react-native-firebase/app",
      ["expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "1a7b9a3c-d661-425e-93a7-bb24c09688f0"
      }
    },
    owner: "carolyn.dev",
    runtimeVersion: {
      policy: "appVersion"
    },
    updates: {
      url: "https://u.expo.dev/1a7b9a3c-d661-425e-93a7-bb24c09688f0"
    }
  }
};