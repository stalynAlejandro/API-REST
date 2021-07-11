### Instructions for installing (Windows)
ANDROID

-Instalar Java SDK 8 desde la pagina de Oracle. Me he tenido que registrar.

En variables de entorno poner JAVA_HOME apuntando a donde se ha instalado Java, en mi caso C:\Program Files\Java\jdk1.8.0_251.


-Install Android Studio. (AS)

Open Android Studio and Install SDK 7.0. (Nougat)  
  Settings -> Appearance & Behavior -> System Settings -> SDK Platforms -> Android 7.0 (Nougat)


-Install Node

If you do not have node install, you can install node from @ https://nodejs.org/es/download/ but avoid problematic versions v12.* versions with this bug  https://stackoverflow.com/questions/58120990/question-getting-error-on-react-native-start

So recommended version is v12.10.0.

For windows if you want to change easily from one version to other you can install nvm-windows follow uninstal and install instructions here https://github.com/coreybutler/nvm-windows
and execute. Info extra awui(https://medium.com/appseed-io/how-to-run-multiple-versions-of-node-js-with-nvm-for-windows-ffbe5c7a2b47): 
nvm install 12.10.0 64
nvm use 12.10.0


-Instala paquete cliente react native
npm install -g react-native-cli


-Clone the repo


------------ explicación de las herramientas y el proceso para entenderlo -------------

El gradle es una herramienta para automatizar la compilación, y es la que ha adoptado Android, sería un equivalente al make o cosas asi.

Gradle automatiza el build, va cogiendo todas las dependencias y lo va compilando todo, va buscando dentro de la carpeta nodemodules … (todo esto se configura en gradle.properties, gradle.settings y ficheros de esos que hay por ahí dentro de la carpeta android)

Se empieza con “npm install” en la carpeta raiz del proyecto, eso ya se baja todos los paquetes necesarios a la carpeta node_modules  y luego ya ejecutamos gradle (dentro de la carpeta android) (por ejemplo gradlew cleanBuildCache) para que compile haciendo uso de esos paquetes. Tanto npm como gradle tienen caches para hacer su faena más rápido, cuando estamos reintentando cosas que no nos funcionan es recomendable borrarlas cada vez con comandos tipo gradle cleanBuildcache y cosas así, para asegurarnos más de que lo que estamos probando esta limpio.

Es posible ejecutar el proyecto desde dentro de AndroidStudio (AS) o desde fuera por linea de comandos sin utilizar AS.

Si el gradle no da problemas, ya seguimos dandole a play en AS o desde línea de comandos en el path raiz del proyecto “react-native run-android”, ojo, hay que arrancar antes el servidor de paquetes (metro bundle server) con la instrucción “react-native start”

Esto debería iniciar la app en el emulador o en el dispositivo.

Hay que instalarse los drivers de tu dispositivo físico para poder enlazarlo, esta muy bien explicado en la web developer android. 

A mi se me iniciaba bien desde línea de comandos con run-android pero no desde AS. Al iniciar sale que no encuentra metro bundler -> ejecutar en el path android de dentro del proyecto  “adb reverse tcp:8081 tcp:8081” y se arregla.

Posibles problemas.

  -Al abrir AS, elegimos una carpeta que no es la correcta cuando le damos a importar proyecto.
  
  -Comprobar en AS, File->Project Structure->Project que estan elegidos el gradlew 6.4 y el plugin 3.6.3.
  
  -Comprobar en AS, File->Project Structure->SDK que esta correcto, donde se ha instalado el JDK (ejemplo C:\Program Files\Java\jdk1.8.0_251.) y el SDK de Android, que suele estar en users/xxx/appdata/...
  
  -No se encuentra debug.keystore  -> esto es un fichero que se ignora en el git, hay que generarlo para el proyecto o pedir a un compañero que te envíe el suyo y lo copias en el path donde te dice que no lo encuentra.
  
  -Puede que si tienes varios emuladores insalados te lance uno que no quieras o que no funcione bien. Con el comando "emulator -avd Pixel_2_API_28" (los nombres de emuladores los puedes obtener con un comando que no recuerdo o mirarlos en el AS) puedes lanzar el emulador que te interese, y luego ya haces el "react-native run-android"
  

-----------------------------------------

si esto falla, ir a android studio build/ rebuild
### Instructions to run/debug local
First install the app for your computer "React Native Debugger" from https://github.com/jhen0409/react-native-debugger
Open the Android Studio in order to help to recognise the device where you want to install the app.
Open a console and run the command "adb devices" to see the id of the device.
Open the run.bat archive and put the id of your device in 
C:\Users\"idUser"\AppData\Local\Android\Sdk\platform-tools\adb -s "idDevice" reverse tcp:5000 tcp:5000
Now you can run the ./run.bat with the console
Wait and when the app has been installed:
- If your device is an emulator, press ctrl+m
- If your device is a real mobile, shake it

Now press "Debug JS Remotely", "Enable Live Reload" and "Enable Hot Reloading"
If you want to see the Network Inspector, press "Toggle Inspector" and go to the Network slide.

### Instructions to set server URL

Rename envExample file to .env anc change API_BASE_URL to the server ulr

### Instructions to run local
First configure the end point to match the server.
srd -> store -> apis -> db.js
Add file local.properties on android folder with the following content(This file is ignored by git) If one of those doesn't exist from Android Studio: File-> Project Structure you can download it

sdk.dir=C:\\Users\\User\\AppData\\Local\\Android\\Sdk 

Access Android -> App directory and run command : keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

Run commands:
npx jetify
react-native run-android

### Problems executing or compiling
In the future if you experience problems don't forget to remove node_modules and reinstall
npm cache clean --force
rm -r node_modules => rmdir /s node_modules en windows
npm install

Another way of workaround problems is to delete app from the phone if it was installed previously and excute following commmands:
cd android 
gradlew clean
react-native start --reset-cache
react-native run-android in another terminal window

Anther alternative is:
cd android 
gradlew clean
gradlew.bat installDebug (this will end with error cause it cannot start adb server but it is not a problem)
gradlew.bat (de nuevo)
At Android studio click on "Sync Project with Gradle Files" and wait it ends sync
Then run project (select your device) If sdk needed for your device is not nstalled it will download it before continue

If appears an error from Android libraries or in the javac compiler step, make sure that you ran the command:
npx jetify
If the package jetify is not installed, install it with: npm i jetifier
If that don't fix the android library problems go to de Android Studio, and click in the package that is causing the problem with
a right click. Go to Refactor and do an AndroidX Migration.
After that wait, and run the following commands in the console:
cd android
gradlew clean
cd ..
npx jetify
react-native run-android

If that don't fix problems take a look to this page of common problems: https://blog.pusher.com/debugging-react-native-android/

If nothing of that work

### Instructions to run app locally on Android emulator with hot-reloading and debug
Install React Native Debugger from https://github.com/jhen0409/react-native-debugger/releases
Edit system and user variable Path and add the "adb" route. Example: C:\Users\User\AppData\Local\Android\Sdk\platform-tools
Add an Android device on AVD Manager. Create a virtual device. Select Pixel XL and Nougat(Android 7.0) as image. Click next,
on advanced settings choose graphics as software.
Then execute command react-native run-android. When the app is loaded press CTRL + M on the emulated device and allow Start Remote JS Debugging, Live Reload and Hot Reloading

When running on a physical device you may have problems connecting with your computer, you can try chaning the BASEURL located in the file BaseURL.ts from http://localhost:57960/ to your ip, you may also need to change the port ( to fit the one you have when you run the server side, so for example the project currently has defined BaseURL as http://localhost:57960/ but I have changed it to http://192.168.1.233:5000/


### IOS en MacOS

Aqui pone como preparar el entorno, al menos para la version 0.62 de RN que es la que tenemos ahora.
https://reactnative.dev/docs/environment-setup

Hemos elegido la opcion de "React Native CLI Quickstart"

Tenemos un Podfile y utilizamos CocoaPods
Esto es una utilidad que lo que hace es coger los paquetes que hay en el Podfile, buscarlos donde pone y enlazarlos al proyecto que hay dentro de la carpeta ios, esto crea un fichero de proyecto que es un workspace y a partir de aqui tenemos que elegir ese workspace al abrir XCode, en vez del proyecto de xcode.

Funciona parecido a Android, ejecutamos "npm install" en la carpeta raiz, luego nos metemos en la carpeta ios y ejecutamos pod install, si todo ha ido bien, ejecutamos react-native start y react-native run-ios y ya deberia lanzarnos el emulador y la aplicacion. 

Es importante leer la documentacion de arriba de Android para entender el proceso, mas o menos, cocoapods es el equivalente a gradle en Android. Ojo que he dicho mas o menos, pero para entender un poco donde se situa cada herramienta seria en ese nivel.

En la configuración del proyecto dentro de XCode, hay que elegir el team (KEFONET SOFTWARE ....)

En IOS las fuentes se tienen que añadir, aqui dejo un sitio donde esta bastante bien explicado.

Luego las fuentes que usemos propias hay que añadirlas asi:
https://codewithchris.com/common-mistakes-with-adding-custom-fonts-to-your-ios-app/

Con el script que pone aqui se ven las fuentes disponibles.
https://medium.com/react-native-training/adding-custom-fonts-to-react-native-b266b41bff7f

pod deintegrate (esto es un comando que sirve para resetear los Pods, asi luego ejecutas pod install y los vuelve a poner, es como limpiar cache)

Hemos puesto use_native_modules! en el podfile que es para que te añada automaticamente react-native-material-kit, react-native-… son unos 4 o 5 que te pone si pones ese comando. 
Luego hemos ido al proyecto y hemos quitado del cocoapods la libreria react-native-material-kit, ya que nos daba problemas de compilacion y no se utilizaba. 
Luego hemos ejecutado "pod install" , luego hemos abierto el workspace con XCode, quitamos a mano desde ketepongoProfesiona->Pods>pods-kete…debug.xconfig> le quito el react-native-material-kit ya que nos daba problemas de compilacion y no se utilizaba.


Hemos tenido que quitar la libreria react-native-material-kit porque nos daba errores de compilacion, dejo aqui un par de links que corregian algunas cosas, pero se quedaba alguna por ahi que no hemos sido capaces de corregir. Si algun dia la queremos incorporar quiza puedan hacer falta estos enlaces.

https://github.com/xinthink/react-native-material-kit/pull/416/commits/1f76d2bb6b0f8bcfea701cd3b336d6cdf97d48fd

https://github.com/xinthink/react-native-material-kit/pull/409/commits/5edcfdb768f680baa025c10a80adaed8ce360033

Para debugear hay que usar Comando +D . Ojo asegurarse que en el menu del emulador I/O / Input Set input keyboard to device está marcado o no funcionará. Aparte hay que meterse en Xcode y editar el info.plist. Aquí poner Allow Arbitrary Loads
a YES y añadir al diccionario "Exception Domains" la clave localhost. Poniendo el valor vacío funciona. En release estas opciones deben estar como estaba esto originalmente

Para debugear contra un servidor(KeTePongo server en visual studio por ejemplo) hay que usar la url con 127.0.0.1. Localhost no funciona. Por ejemplo BASE_URL = http://127.0.0.1:5001/"


### Current backend versions
Production at Azure theonesheng/server:0.1.5
Preproduction
Develop 

###Instructions to debug React Native source code
Open React Native Debugger go to sources and click  RNGDebuggerWorker.js. Then go to localhost and search for your files at the end.
At the moment to get a proper debug experience you need to use react-native run-android every time you change js code otherwise the source maps won't work.

### Instruction to run server in cloud
Run command react-native run android

### Instructions to use Google as login provider(Android)
Go to https://console.developers.google.com/apis/credentials and create a new project and an OAuth 2.0 Client id. There you will get a clientId and a secret key. Authorize a redirect uri with the format https://KetePongoServerBaseUrl/KeTePongo.CommerceWebAPI/google/oauth2 
Configure on KeTePongo server the Google options with credentials provided by Google in the step before.
Follow the instructions in https://github.com/react-native-community/react-native-google-signin/blob/master/docs/get-config-file.md to get google-services.json file android.
There you will the need to configura SHA fingerprints for the project. You can follow the instructions in https://developers.google.com/android/guides/client-auth to know how to do it.
Put that file in ketepongo-native\android\app
Create .env file on ketepongo-native and add GOOGLE_CLIENT_ID key.The value is the clientId that we got on the first step on Google Console. You can then read that variable in js code like Config.GOOGLE_CLIENT_ID with the package "react-native-config"

### Codepush push changes
appcenter codepush release-react -a theRealSheng/KeTePongo -d Production --description "comments"

### Keys
To Create Keys:
Android Studio -> Build -> Generate Signed Bundle -> APK -> Create New(Create new keys)

### Errors

If the node terminal not compilling:
1) cd android -> Run command: ./gradlew clean
2) back to main project folder: react-native start --reset-cache (Not require most of the times)
3) react-native run-android in another terminal window
4) Missing Keystore? Run command: keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000


On Mac:
watchman watch-del-all && rm -rf $TMPDIR/react-* && rm -rf node_modules/ && npm cache verify && npm install && npm start -- --reset-cache

### Naming 
#https://github.com/airbnb/javascript/tree/master/react#naming


##Naming
Extensions: Use .jsx extension for React components. eslint: react/jsx-filename-extension

Filename: Use PascalCase for filenames. E.g., ReservationCard.jsx.

Reference Naming: Use PascalCase for React components and camelCase for their instances. eslint: react/jsx-pascal-case

// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
Component Naming: Use the filename as the component name. For example, ReservationCard.jsx should have a reference name of ReservationCard. However, for root components of a directory, use index.jsx as the filename and use the directory name as the component name:

// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
Higher-order Component Naming: Use a composite of the higher-order component’s name and the passed-in component’s name as the displayName on the generated component. For example, the higher-order component withFoo(), when passed a component Bar should produce a component with a displayName of withFoo(Bar).

Why? A component’s displayName may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.

// bad
export default function withFoo(WrappedComponent) {
  return function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }
}

// good
export default function withFoo(WrappedComponent) {
  function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithFoo.displayName = `withFoo(${wrappedComponentName})`;
  return WithFoo;
}
Props Naming: Avoid using DOM component prop names for different purposes.

Why? People expect props like style and className to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

// bad
<MyComponent style="fancy" />

// bad
<MyComponent className="fancy" />

// good
<MyComponent variant="fancy" />

### How To update React
For upgrades take a look to https://docs.expo.io/versions/latest/sdk/overview/ to use compativle versions of Expo and React 
1) Change Packaga.json to wanted versions of Expo and React
2) Check the grawdle plugin required @ 
https://developer.android.com/studio/releases/gradle-plugin
3) Update the the plugin in root build.gradle
***
    dependencies {
        classpath 'com.android.tools.build:gradle:3.3.0' <---

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
***
4) Update the grawdle in android/grawdlw/wrapper/grawdle-wrapper.properties

distributionUrl=https\://services.gradle.org/distributions/-->gradle-4.10.1-all.zip<--(Update this with the gradlew version)

5) Clean project. If errors, check online for additonal need changes as it might change from version to version.

### Adding new React Native modules
You need to execute following command to add a new module, they will be added to android\settings.gradle file:
react-native link dependency-name


### Generate Bundle Release ANDROID

Dentro del directorio android

rm -rf .idea =>Windows rd /s /q .idea

rm -rf .gradle =>Windows rd /s /q .gradle

Acordarse si tenemos que incrementar el version Code en build.gradle. (No deja subir un bundle con un version code que ya se haya subido)

Despues abrimos el AndroidStudio y cuando termina de sincronizar el gradle, menu->build->generate signed bundle..> y seguimos los pasos eligiendo lo que nos va diciendo.

Hay un problema con el gradle que no reconoce bien la ubicacion del keystore para release y por eso no funciona por linea de comandos. Yo creo que es porque se usan variables que referencian a gradle.properties y eso no esta bien escrito en el script. Desde Android Studio funciona porque te pide la ubicacion y pwd del keystore y lo puedes mirar en gradle.properties que estan escritos.

### KeTePongoConsumer

Supports native code which works the same way Commerce App does.
Also works with react-native-web to generate web code. To execute on server you run npm run-script web:build . That generates a bundle in web-bundle folder. Put that in wwwroot/js in ConsumerWebAPI on server-side.
The production code will execute on controll via urls http://serverURL/businessQR/commerceCode or http://serverURL/KeTePongo.ConsumerWebAPI/BusinessCarte. First one loads commerce data that belongs to {commerceCode} parameter. Second one goes to initial page where you put the code unless you had previous commerce data saved.
To work in development you have to execute npm run-script web:dev. You have a custom index.html and the app always starts on initial screen unless you have stored some commerce data from before.
The fonts are loaded from GoogleAPI on development.
Notice that BASE URL is loaded from .env if executing on native. But on web the url is "/" to call API from inside(since the bundle will be on the same server the API is initially). In dev you will have to change the url. 
