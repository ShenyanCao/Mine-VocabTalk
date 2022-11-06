# Part 1: Document
### Q1: The various states that an app can enter on your platform of choice.
I am developing a cross-platform app, which will be on both iOS and android platform.

1. **Various states that an app enter on iOS platform:**

    In iOS 13 and later, the app needs to respond to scene-based life-cycle events. A scene represents one instance of the app’s UI running on a device. The user can create multiple scenes for each app, and show and hide them separately. Because each scene has its own life cycle, each can be in a different state of execution. For example, one scene might be in the foreground while others are in the background or are suspended.

    A scene can be in one of these states:
    - *Unattached*: The scene always starts in the unattached state. It has two routes from here. If requested by a user, it goes into the foreground state. If requested by the system, it stays in the background to process an event. The system may detach the scene from the background or suspended states at any time to reclaim its resources.
    - *Suspended*: In the suspended state the scene is not performing any work and can be considered sleeping. The scene may be detached or woken up from this state. When woken up, the scene moves into the background to process certain tasks. The system may suspend the scene at any time when it’s in the background.
    - *Background*: In the background state the scene is not visible to the user and is limited in tasks it’s allowed to perform. From the background state the scene may take 3 different routes: become unattached, become suspended and move to the foreground.
    - *Foreground Active or Inactive*:In the foreground state the scene is presented to the user. It has two sub-states: active and inactive. The scene is processing system and user interaction events when it’s foreground-active. The scene may become inactive when it’s interrupted, e.g. by a phone call, or because it is transitioning to or from the background. When foreground-inactive, the scene is not receiving system and user interaction events.

2. **Various states that an app enter on Android platform:**

    The Activity class is a crucial component of an Android app. The Android system initiates code in an Activity instance by invoking specific callback methods that correspond to specific stages of its lifecycle. Activity states include *Resumed*, *Started*, *Paused*,*Stopped*,*Destroyed*.
    - When final Activity state is *Resumed*, then process state is *Foreground*. The Activity in this state is visible to the user and the user is able to interact with it. Android Runtime treats the Activity in this state with the highest priority and never tries to kill it.
    - When final Activity state is *Started/Paused*, then process state is *Visible (no focus)*. When an Activity is in Started states, the Activity is not yet rendered on screen but is about to become visible to the user. When an Activity is in Paused states, the user can still see the Activity in the background such as behind a transparent window or a dialog box i.e it is partially visible. The user cannot interact with the Activity in Started or Paused states until the Activity changes to Resumed state. Android Runtime usually does not kill an Activity in Started/Paused states but may do so in an extreme case of resource crunch.
    - When final Activity state is *Stopped*, then process state is *Background (Invisible)*. From the active state, when a new Activity is started on top of the current one or when a user hits the Home key, the Activity goes to the background and changes to Stopped state. The Activity in this state is invisible, but it is not destroyed. Android Runtime may kill such an Activity in case of resource crunch.
    - When final Activity state is *Destroyed*, then process state is *Empty*. When a user hits a Back key or Android Runtime decides to reclaim the memory allocated to an Activity i.e in the paused or stopped state, It goes into the Destroyed state. The Activity is out of the memory and it is invisible to the user.


### Q2: The various states that you must consider for your app, why you must consider it, and what must happen in each state.
The various states that my app must consider are as below: 
1. *Active state* - iOS scene state is Foreground Active and Android Activity state is Resumed. My app at this state is running in the foreground and fully visible, and users can see it and interact with it and it will respond to users right away. I need to consider this state, because this is the state when user can interact with the app benefit from using it. The app in this state should create its user interface, must be visible to user, listen to user interaction events and respond to user right awary. 

2. *Inactive or paused state* - iOS scene state is Foreground inactive and Android Activity state is Paused and can be seen in background. The iOS scene or Android Activity may become inactive when it’s interrupted, e.g. by a phone call, or because it is transitioning to or from the background. In this state, the iOS scene or Android Activity is not receiving user interaction events. I need to consider this state, because when there's interuptions like a phone call, the app needs step behind and let the phone call go on first. The app in this state must be paused and must not receive or respond to any user interaction events. 

3. *Background or stopped state* - iOS scene state is Background and Android Activity state is Stopped and Android process state is Background/Invisible. The app in this state is running in the background. The user is either in another app, or on the home screen, or if on Android platform on another Activity. I need to consider this state, because even though the app in this state is not visible to the user, it still can perform tasks it is allowed to perform in the background, such as updating the local database regularly by loading contents from remote database in the background. Doing tasks in the background is important towards the performance of the app and good user experience. The app in this state must be invisible to users, and must not receive or respond to any user interaction events. But it can perform some tasks that it is allowed to perform in the background.


# Part 2: App that demonstrates tombstone management
- **Demo:**

- <img alt="demo" src="./assets/HW3Demo.gif">

1. When user key in email address or password, and then go away and enter another app, then come back to this app, the app is at the same state as when the user left the app without exiting the app. The information keyed in by user is still there, the same as when the user left this app.
2. When user viewing dashboard, and  then go away and enter another app, then come back to this app, the app is still at the dashboard screen as when the user left the app without exiting the app.

## Language and Dev Platform
- **Language**: React Native
- **Dev Platform**: Mac OS
- **Running Platform**: iOS

## Instructions to compile
**_Prerequisites_**
- install xcode 14
  - Set Preferences => Locations => Command Line Tools to be xcode 14
- install npm
- clone this github folder
- follow [react native instruction](https://reactnative.dev/docs/environment-setup) to compile and run, one way as follows:
    - open terminal
    - go to this project folder by running `cd 01-skill-checks-ShenyanCao`
    - run `npm start`
    - press `i`
    - wait for ios simulater to start and install this app

# Reference:
1. https://reactnative.dev/docs/appstate#currentstate
2. https://developer.apple.com/documentation/uikit/app_and_environment/managing_your_app_s_life_cycle
3. https://developer.android.com/guide/components/activities/Activity-lifecycle#asem
4. https://www.vadimbulavin.com/ios-13-ipados-app-life-cycle-with-uiscene-scene-session-and-scene-delegate/

