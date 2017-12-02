
function release {
    # Generate release apk
    cordova build --release --aot --minifyjs --minifycss --optimizejs android
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $base/my-release-key.keystore $base/android-release-unsigned.apk alias_name
    rm $base/$1.apk
    zipalign -v 4 $base/android-release-unsigned.apk $base/$1.apk
    cp $base/$1.apk $apk/$1.apk --force
}

base=platforms/android/build/outputs/apk
apk=apk


# run build
release SGP_sdk25