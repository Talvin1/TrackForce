package com.trackforce;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
// import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled;
import com.facebook.react.defaults.DefaultReactActivityDelegate;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        System.out.println("Im here 3");
        return "trackforce";
    }
}