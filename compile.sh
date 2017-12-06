
function release {
    # Generate release apk
    cordova build --release --aot --minifyjs --minifycss --optimizejs android

    # Check if keystore exist (if not then create keystore)
    keystore="$base/my-release-key.keystore"
    if [ ! -f "$keystore" ]
    then
        # keystore does not exist | create keystore
        keytool -genkey -v -keystore $base/my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
    fi

    # Sign apk
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $base/my-release-key.keystore $base/android-release-unsigned.apk alias_name
    rm $base/$1.apk
    zipalign -v 4 $base/android-release-unsigned.apk $base/$1.apk
    
    # Copy to familiar folder
    cp $base/$1.apk $apk/$1.apk --force
}

base=platforms/android/build/outputs/apk
apk=apk


# run build
release SGP_sdk21