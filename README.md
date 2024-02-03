A React Native Project That's used to sample location of the device every 5 seconds and write the data to the device's local storage.
The app will sample location if it's open in the foreground or if it's in the background\the screen was turned off.

The App was tested on a Pixel 7 Pro (Android): API 34 - Android 14

Current state: 
The App launches and has 3 interactable pieces:
* Switch : Toggles between calling the library location getter function and the (Not implemented yet) Native android code location getter function.
* Start Operation Button: Start location sampling intervals and a background timer to call the function.
* Stop Operation Button: Stops location sampling intervals and the background timer to call the function, thus, resetting the application to the start state.

Features missing\ Room for improvement:
* Integration of native Android code to use for the location sampling and possibly if it were to work, handle background activity.
* Take into account edge cases, for example: a fuction that relies on a previous function to finish it's process, calls itself before the previous task finished.
* Design.
