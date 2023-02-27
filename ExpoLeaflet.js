import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import isEqual from "lodash.isequal";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
export const ExpoLeaflet = ({ backgroundColor, loadingIndicator, onMessage, onMapLoad, ...rest }) => {
    var _a;
    const [key, setKey] = useState(0);
    const mapProps = rest;
    const webViewRef = useRef(null);
    const [webViewContent, setWebviewContent] = useState();
    const [isLoadingHtmlFile, setLoadingHtmlFile] = useState(true);
    const [isWebviewReady, setWebviewReady] = useState(false);
    const previousPropsRef = useRef({});
    useEffect(() => {
        let isNotCancelled = true;
        const loadHtmlFile = async () => {
            try {
                const path = require(`./assets/index.html`);
                const htmlFile = await Asset.fromModule(path);
                await htmlFile.downloadAsync();
                const webviewContent = await FileSystem.readAsStringAsync(htmlFile.localUri);
                if (isNotCancelled) {
                    setWebviewContent(webviewContent);
                    onMessage({
                        tag: "DebugMessage",
                        message: "WebView content loaded",
                    });
                }
            }
            catch (error) {
                if (isNotCancelled) {
                    onMessage({ tag: "Error", error });
                }
            }
        };
        loadHtmlFile().catch(() => { });
        return () => {
            isNotCancelled = false;
        };
    }, []);
    useEffect(() => {
        var _a;
        if (!isWebviewReady) {
            return;
        }
        const previousProps = previousPropsRef.current;
        const newMapProps = {};
        if (!isEqual(mapProps.shouldFitToBounds, previousProps.shouldFitToBounds)) {
            newMapProps.shouldFitToBounds = mapProps.shouldFitToBounds;
        }
        if (!isEqual(mapProps.mapCenterPosition, previousProps.mapCenterPosition)) {
            newMapProps.mapCenterPosition = mapProps.mapCenterPosition;
        }
        if (!isEqual(mapProps.mapLayers, previousProps.mapLayers)) {
            newMapProps.mapLayers = mapProps.mapLayers;
        }
        if (!isEqual(mapProps.mapMarkers, previousProps.mapMarkers)) {
            newMapProps.mapMarkers = mapProps.mapMarkers;
        }
        if (!isEqual(mapProps.mapOptions, previousProps.mapOptions)) {
            newMapProps.mapOptions = mapProps.mapOptions;
        }
        if (!isEqual(mapProps.mapShapes, previousProps.mapShapes)) {
            newMapProps.mapShapes = mapProps.mapShapes;
        }
        if (mapProps.maxZoom !== previousProps.maxZoom) {
            newMapProps.maxZoom = mapProps.maxZoom;
        }
        if (mapProps.zoom !== previousProps.zoom) {
            newMapProps.zoom = mapProps.zoom;
        }
        previousPropsRef.current = {
            ...previousProps,
            ...mapProps,
        };
        const payload = JSON.stringify(newMapProps);
        (_a = webViewRef.current) === null || _a === void 0 ? void 0 : _a.injectJavaScript(`window.postMessage(${payload}, '*');`);
    }, [
        isWebviewReady,
        mapProps.mapCenterPosition,
        mapProps.mapLayers,
        mapProps.mapMarkers,
        mapProps.mapOptions,
        mapProps.mapShapes,
        mapProps.maxZoom,
        mapProps.zoom,
        mapProps.shouldFitToBounds
    ]);
    return (<View style={[
            StyleSheet.absoluteFill,
            {
                backgroundColor: backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : "white",
                position: "relative",
                flex: 1,
            },
        ]} renderToHardwareTextureAndroid={true}>
      {webViewContent != null && (<WebView key={key} allowFileAccess={true} allowUniversalAccessFromFileURLs={true} allowFileAccessFromFileURLs={true} nestedScrollEnabled={true} renderToHardwareTextureAndroid={true} containerStyle={{
                height: "100%",
                width: "100%",
                opacity: 0.99 //https://github.com/react-native-webview/react-native-webview/issues/811#issuecomment-748611465
            }} domStorageEnabled={true} javaScriptEnabled={true} ref={webViewRef} onRenderProcessGone={() => { var _a; return (_a = webViewRef.current) === null || _a === void 0 ? void 0 : _a.reload(); }} onContentProcessDidTerminate={() => {
                var _a;
                setWebviewReady(false);
                (_a = webViewRef.current) === null || _a === void 0 ? void 0 : _a.reload();
                setKey(key + 1);
                previousPropsRef.current = {};
                console.log("onContentProcessDidTerminate");
            }} onLoadEnd={() => {
                setLoadingHtmlFile(false);
                console.log("End loading html file");
            }} onLoadStart={() => {
                setLoadingHtmlFile(true);
                console.log("Start loading html file");
            }} onMessage={(event) => {
                if (event && event.nativeEvent && event.nativeEvent.data) {
                    try {
                        const message = JSON.parse(event.nativeEvent.data);
                        if (message.tag === "MapComponentMounted") {
                            setWebviewReady(true);
                            onMapLoad === null || onMapLoad === void 0 ? void 0 : onMapLoad();
                        }
                        onMessage(message);
                    }
                    catch (error) {
                        onMessage({
                            tag: "Error",
                            error: { error, data: event.nativeEvent.data },
                        });
                    }
                }
            }} onError={(error) => {
                onMessage({ tag: "Error", error });
            }} originWhitelist={["*"]} renderLoading={loadingIndicator} source={{ html: webViewContent }} startInLoadingState={true}/>)}
      {(webViewContent == null || isLoadingHtmlFile || !isWebviewReady) && (<View style={StyleSheet.absoluteFill}>
          {(_a = loadingIndicator === null || loadingIndicator === void 0 ? void 0 : loadingIndicator()) !== null && _a !== void 0 ? _a : null}
        </View>)}
    </View>);
};
