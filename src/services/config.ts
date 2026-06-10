import {Platform} from 'react-native';

// Configuration for different environments
export const API_CONFIG = {
  // iOS Simulator
  IOS_SIMULATOR: 'http://localhost:3000',

  // Android Emulator (10.0.2.2 is Android's alias for localhost)
  ANDROID_EMULATOR: 'http://10.0.2.2:3000',

  // Physical device (your computer's IP address)
  PHYSICAL_DEVICE: 'http://192.168.10.112:3000',

  // Production API (if you deploy your backend)
  PRODUCTION: 'https://your-production-api.com',
};

// Automatically select the right API URL based on platform and environment
export const getApiUrl = (): string => {
  // For physical devices, use the PHYSICAL_DEVICE URL
  // To test on simulator, temporarily change this back to IOS_SIMULATOR

  if (Platform.OS === 'ios') {
    return API_CONFIG.PHYSICAL_DEVICE; // Using physical device IP
  }

  if (Platform.OS === 'android') {
    return API_CONFIG.ANDROID_EMULATOR;
  }

  return API_CONFIG.PHYSICAL_DEVICE;
};

// Export the selected API URL
export const API_BASE_URL = getApiUrl();
