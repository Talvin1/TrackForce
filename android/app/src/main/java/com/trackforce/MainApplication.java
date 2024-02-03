package com.trackforce;

import android.location.LocationManager;
import android.location.LocationListener;
import android.location.Location;
import android.os.Bundle;
import android.content.Intent;
import android.content.Context;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost; // Add this import
import com.facebook.react.ReactPackage; // Add this import
import com.facebook.react.shell.MainReactPackage; // Add this import
import java.util.List; // Add this import
import java.util.Arrays; // Add this import
import android.app.Application;
import com.facebook.soloader.SoLoader;

public class MainApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();

        // Initialize SoLoader
        SoLoader.init(this, /* native exopackage */ false);

        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 2000, 1, listener);
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return new ReactNativeHost(this) {
            @Override
            public boolean getUseDeveloperSupport() {
                return BuildConfig.DEBUG;
            }

            @Override
            protected List<ReactPackage> getPackages() {
                return Arrays.<ReactPackage>asList(
                    new MainReactPackage()
                );
            }

            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
    }

    private final LocationListener listener = new LocationListener() {
        // @Override
        // public void onStatusChanged(String provider, int status, Bundle extras) {
        // }

        // @Override
        // public void onProviderEnabled(String provider) {
        // }

        // @Override
        // public void onProviderDisabled(String provider) {
        // }

        @Override
        public void onLocationChanged(Location location) {
          Intent myIntent = new Intent(getApplicationContext(), LocationService.class);
          getApplicationContext().startService(myIntent);
          System.out.println("Im here 2");
          HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
        }
    };
}
