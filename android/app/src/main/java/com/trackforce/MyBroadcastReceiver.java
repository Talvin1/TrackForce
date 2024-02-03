
package com.trackforce;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import com.trackforce.LocationService;

public class MyBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        System.out.println("Im here 4");
        Intent serviceIntent = new Intent(context, LocationService.class);
        context.startService(serviceIntent);
    }
}