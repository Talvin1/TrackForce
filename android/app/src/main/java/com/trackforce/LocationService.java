package com.trackforce;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;
import android.content.Context;

public class LocationService extends HeadlessJsTaskService {
    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        // Retrieve the Bundle object from the Intent
        Bundle extras = intent.getExtras();

        // Check if the Bundle object is null
        if (extras != null) {
            // Bundle object is not null, proceed with creating task configuration
            HeadlessJsTaskConfig taskConfig = new HeadlessJsTaskConfig(
                "sendLocation", // Name of your task
                Arguments.fromBundle(extras), // Task data
                5000, // Timeout in milliseconds
                true // Prevent app crash if in foreground
            );

            // Acquire wake lock
            acquireWakeLockNow(getApplicationContext());

            return taskConfig;
        } else {
            // Handle the case where the Bundle object is null
            // You can log an error message or return a default task configuration
            Log.e("LocationService", "Bundle object is null");
            return null;
        }
    }
}
