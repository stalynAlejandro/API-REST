cd .\android
start .\gradlew clean
cd ..
timeout 20
start npx jetify
timeout 20
start react-native start --reset-cache
timeout 30
start react-native run-android
timeout 90
adb -s ZL6222X24F reverse tcp:5000 tcp:5000
