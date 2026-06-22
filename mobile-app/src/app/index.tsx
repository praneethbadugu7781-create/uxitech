import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { WebView, type WebViewNavigation } from 'react-native-webview';

const WEBSITE_URL = 'https://uxitech.in';
const WEBSITE_HOSTS = new Set(['uxitech.in', 'www.uxitech.in']);

export default function UxiWebsiteApp() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!canGoBack) {
        return false;
      }

      webViewRef.current?.goBack();
      return true;
    });

    return () => subscription.remove();
  }, [canGoBack]);

  const handleNavigationChange = useCallback((event: WebViewNavigation) => {
    setCanGoBack(event.canGoBack);
  }, []);

  const handleShouldStartLoad = useCallback((request: WebViewNavigation) => {
    try {
      const url = new URL(request.url);

      if (url.protocol === 'http:' || url.protocol === 'https:') {
        if (WEBSITE_HOSTS.has(url.hostname)) {
          return true;
        }

        Linking.openURL(request.url);
        return false;
      }

      Linking.openURL(request.url);
      return false;
    } catch {
      return true;
    }
  }, []);

  const reloadWebsite = useCallback(() => {
    setHasError(false);
    webViewRef.current?.reload();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" backgroundColor="#05070d" />
      <WebView
        ref={webViewRef}
        source={{ uri: WEBSITE_URL }}
        style={styles.webView}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        allowsBackForwardNavigationGestures
        pullToRefreshEnabled
        setSupportMultipleWindows={false}
        onLoadStart={() => setHasError(false)}
        onNavigationStateChange={handleNavigationChange}
        onShouldStartLoadWithRequest={handleShouldStartLoad}
        onError={() => setHasError(true)}
        onHttpError={(event) => {
          if (event.nativeEvent.statusCode >= 400) {
            setHasError(true);
          }
        }}
        renderLoading={() => (
          <View style={styles.centered}>
            <ActivityIndicator color="#208aef" size="large" />
          </View>
        )}
      />

      {hasError && (
        <View style={styles.errorPanel}>
          <Text style={styles.errorTitle}>Unable to load UXI Tech</Text>
          <Text style={styles.errorText}>Check your internet connection and try again.</Text>
          <Pressable style={styles.retryButton} onPress={reloadWebsite}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070d',
  },
  webView: {
    flex: 1,
    backgroundColor: '#05070d',
  },
  centered: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: '#05070d',
    justifyContent: 'center',
  },
  errorPanel: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: '#05070d',
    gap: 12,
    justifyContent: 'center',
    padding: 24,
  },
  errorTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorText: {
    color: '#a5b4c8',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#208aef',
    borderRadius: 8,
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
