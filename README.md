
# **VocabTalk**
*Lilian Cao*

# Part 1: Project Design
## Summary of Project
It is crucial that children have explicit and robust instruction in vocabulary, to support their verbal and written communication. The existing apps in current market usually will let little kids view several pictures and meanwhile play a word sound to them, then ask them to select the correct picture that corresponds to the word they heard. These exsitng apps helps kids build up vocabulary and enhance their listening skills, but not oral skills. Our new app will show kids a picture and ask them to tell what it is. If they cannot speak out the correct word, they can hear the correct pronunciation of the word to learn from it. Our new app will not only help little kids build up vocabulary and enhance listening skills, but also improve their oral language skills. A survey shows that 43% of U.S. kids often use educational apps <sup>1</sup>, so there will be a big market for our educational game app.


## Project Analysis
### Target Audience
Once kids can talk, they are ready to fast expand their vocabulary. **Our target audience are kids that are over 4 years old and ready to talk**. Traditionally, little kids are educated with flashcards, our app is like interactive digital flashcards, so they will be interested in using our interactive app to learn new things. 

The first step to reach the audience is by introducing and discussing the app with preschool students in the neighbourhood. Then I plan to introduce the app in social media, like Facebook.

### Primary Purpose
A strong vocabulary is critical to language development. The idea of our vocabulary educational app for little kids is to encourage them to speak out new words, developing their oral language and vocabulary skills in a fun and interactive way.

### Value Proposition
Vocabulary is one of the early literacy skills that researchers say is important for children to have in order to learn to read<sup>2</sup>. The more vocabulary children have, the easier it will be for them to understand
what they are reading. However, vocabulary remains one of the most difficult skills to teach <sup>3</sup>. Research has also shown that early childhood teachers spend an average of only five minutes per day explicitly developing oral language and vocabulary skills<sup>3</sup>, which leaves little opportunity to engage kids inconversations that can promote vocabulary development. At home, parents can use traditional flashcards to help little kids expand their vocabulary, but it takes a lot of time and effort. The problem that little kids tend to have limited exposure to vocabulary-enhancing activities at home or in educational settings has led me to the idea to develop this new app. Little kids can have interative ways to learn vocabulary from our app and talk to our app to show that they know the words. They can develop their vocabulary and oral skills at the same time. Beside, teachers and parents can save time in teaching and communicating with kids.

### Success Criteria
1) Little kids can easily use the app to expand their vocabulary and improve oral communication skills.
2) Parents can easily track their kids' learning progress.
3) Littile kids are interested in using the app.
4) The app can be used without interent connection.

### Competitor Analysis
The existing MyVocabulary app is one of our competitor, who has about 2K ratings. It was developed by An Banh. In this app, words are grouped in different categories, like fruits, animals, vegetables and so on. For each word, the app would show several pictures and ask kids to select the correct one. This app helps little kids build up vocabulary and enhance their listening skills. This app is easy to use and includes thousands of words across 30+ levels. Kids needs to pass certain levels to unlock new levels and track their progress. The game mechanics would make kids want to keep learning. And no internet connection is required to play.

Similar to the existing MyVocabulary app, our new app will group words in different categories. But the interative method for each word will be different. Our app will show a picture to the kids, ask them to tell what it is. If they know the correct answer, they will see the next picture and learn next word. If their answer is wrong, kids can choose to try again or listen to the correct answer. If they do not know the answer, they can listen to the correct pronunciation before recording. Compared to MyVocabulary app, our app will not only help kids develop vocabulary and listening skills, but also oral skills. Besides, in our app, kids will have the right to choose any category to work on. Compared to MyVocabulary app, kids will have more freedom to choose what to work on based on their best interest when using our app.


### Monetization Model
- Advertisement
- In-app purchase if want customers want to remove advertisement.

### Initial Design
**MVP:**
- P0 - Young kids should be able to view a list of categories and choose one from the list.
- P0 - Young kids should be able to view one picture at a time via the app, and tell the app what it is. If their answer is correct, the kids can view the next picture. If their answer is wrong, the kids can choose to try again or listen to the correct answer.
- P1 - Kids should be able to choose to pass a word and continue to learn the next word if they really cannot make it correct.
- P2 - Kids should be able to use the app without interenet connection.
- P1 - Parents should be able to view their kid's learning progress.
- P1 - Administrators should be able to update the word-picture list contents via the online storage place.

**Expected limitations:**
- It takes time to create contents for the app. Using pictures on the internet may encounter copyright issues.
- Young kids typically pronunce words differently from adults. By 24 months (two years), 50 to 75% of their speech usually can be intelligible to familiar people. By 36 months (three years), 75 to 100% of their speech cound be intelligible to familiar people. By four years of age, a child should usually be understood, including by people who are unfamiliar to them<sup>4</sup>. So, it may be difficult for the app to check if the pronunciation of little kids (2 and 3 years) are correct or not.

### Initial UI/UX Design

**a) Screens**
- There would be seven screens: Login screen, Sign up screen, Dashboard screen, Picture screen, Setting screen, report screen and share screen.
   
   Design as shown below:
![This is an image](/images/updatedscreens.png)

**b) Sitemap**
- Below is the sitemap:
![This is an image](/images/Sitemap2.jpg)

- Once open the app, user can choose to login, or go to sign up screen.
- Then user can view dashboard, where they can choose to learn from different categories or click navigation menu button to see progress report or log out the account.

**c) Task Flow (Happy Path)**
- Below is the task flow (happy path) of young kids:
![This is an image](/images/TaskFlow.jpg)

- When young kids open the app, they will log into their account or ask their parents to help them log in. Then they would directly be able to access the dashboard and can choose to learn from a category. Then they would see a picture and hear the app asking them to record the pronunciation of the word that corresponds with the picture. With correct answer, they would see the next picture.

### Initial Technical Architecture Design
The initial architecture design diagram is shown as below:
![This is an image](/images/Architecture.png)

The overall design will base on MVC architecture.
- There will be four view components: Login View, Sign Up View, Category List View, and Picture View The Views are the part of the application that users can see and interact with.
- There will be three model components: User Model, Category List Model and Picture List Model. User Model represents and handles the user setting data (includes login information) that the app needs to run. Category List Model represents and handles the category list data that the app needs to run, including kids learning progress data in each category. Picture List Model represents and handles the word-picture list data in each category that the app needs to run. The user setting data, category list data and picture list data will be stored in interal database. These models will have API methods as interfaces with the internal database.
- There will be three controller components: Login Controller, Category List Controller, and Picture List Controller. The Controllers are the middleman that pulls data from the Models, and sends it to the Views to be rendered on the page. In the other direction, the Controllers receive UI events from the Views, processes them, and sends data to the Models if necessary.
- Category List Controller will have business logic to handle a list of categories. It will also record the learning progress of kids in each category. It needs to record how many words kid has answered correctly, how many words they choose to pass without learning, and how many words are still remaining.
- Picture List Controller will have business logic to handle a list of pictures associated with english words. It will also interect with a Voice Module to let the app to ask kids questions, and also handle the voice recorded by kids to check if their answer is correct or not.
- The word-picture contects would be stored in Gist as an online List database. The List Sync Controller will use API to interact with the online List database. The Category List Model will interact with List Sync Controller to syncronize the latest word-picture contects from online List database to the app.

# Part 2: Simple prototype
## Prototype animation via this link:
https://www.figma.com/proto/MNPCXbX2Q3kodanS1HIrGZ/VocabTalk?node-id=2%3A13&scaling=scale-down&page-id=0%3A1&starting-point-node-id=2%3A13

- UI/UX Design are in accordance with the mockup in Part 1, with seven screens: Login screen, Sign up screen, Dashboard screen, Picture screen, Setting screen, report screen and share screen.
- UI flow as below:
   - Upon open the app, if users have account already, they can enter email and password to login their account.
   - Users can go to sign up account page to sign up new account if they do not have any existing account.
   - At sign up page, users can go back to login page if they want.
   - Upon sign up or successful login, then users will view home dashboard with setting button and category list.
   - Upon clicking on one category button to choose a category, users will see a picture screen, where they can choose to record their answer and know if their answer is correct or not, or they can choose help to hear/learn correct answers, or they can choose to pass currect word-picture and go to the next word-picture.
   - In picture screen, users can go back to dashboard by clicking the home button.
   - In dashboard screen, users can click the setting button to view setting menu page.
   - In setting menu page, they can choose to view the learning progress report, or share the report to others via the other app on the same device, or log out.
   - On progress report page, users can go back to setting page by clicking the close/cross button.
   - On share page, users can go back to setting page by clicking the close/cross button.
   - On setting page, users can choose to log out account by clicking the log out button and they will be redirected to the login page.
- Data to be stored and retrieved includes: profile picture, user email and password, category list, word-pictures, and learning progress data.

## Features and Tasks needed for the MVP:
- Feature 1: The app should allow users to log in their accounts if they have exisitng accounts.
    * Task 1: Create user login page with textboxes for email and password, and a login button.
    * Task 2: Create readText method to read email and password text by user.
    * Task 3: Create login method – data access and business logic to validate information and retrieve profile picture.
    * Task 4: With valid login information, direct user on entering dashboard page.
    * Task 5: Direct user on entering signup page when user choose to signup.

- Feature 2: The app should allow users to sign up account if they do not have any existing account.
    * Task 1: Create signup page with textboxes for email and password, profile picture, and signup button.
    * Task 2: Create pictureUpload method to allow user to upload picture.
    * Task 3: Create readText method to read email and password text input by user.
    * Task 4: Create signup method – data access and business logic to store email, password and profile picture in local database.
    * Task 5: Upon successful signup, direct user on entering dashboard page.
    * Task 6: Direct user on entering login page when user choose to login.

- Feature 3: The app should show users a dashboard with list of categories upon login or signup, so that users can choose the category they want to learn. 
    * Task 1: Create/load a Category list into local database. 
    * Task 2: Create business logic to retrieve category list information from database and show in category screen page.
    * Task 3: Create an onClick method to recognize the click done by user to choose a category and then direct user to picture screen page. 

- Feature 4: The app should show users one picture at a time and test if they know the word that represented by the picture. If they do not know, the app should let users choose to listen to correct answer or again, or even pass to next question. If their answer is correct, then the app should show users the next picture in the list.
    * Task 1: Create a picture retrieve method to retrieve pictures and relevant information.
    * Task 2: Create picture screen page to show one picture at a time.
    * Task 3: Create a function to play sound by app to ask questions.
    * Task 4: Create business logic to recognize and translate user's speech into text.
    * Task 5: Create business logic to check the correctness of user's speech.
    * Task 6: Create Help method to play sound of correct pronunciation.
    * Task 7: Create nextPage method to direct users to the next picture page in same category.
    * Task 8: Create business logic to access and update database to record the progress if done with a picture.
    * Task 9: Create a home button with onClick method to direct user from picture page to dashboard. 


- Feature 5: The app should allow users to access the setting page from dashboard, so that users can choose to view progress report, share the app with others or log out.
    * Task 1: Create a setting button with onClick method on dashboard page to direct user from dashboard to setting page.
    * Task 2: Create a progress report link with an onClick method to direct user from setting page to progress report page.
    * Task 3: Create a share link with an onClick method to direct user from setting page to share page.
    * Task 4: Create a logout button with an onClick method to logout user account and redirect user on entering login page.
    * Task 5: Create business logic for logout process and store state information into database.

- Feature 6: The app should provide users a report about their learning process.
    * Task 1: Create a reportGeneration method for data access and business logic to retrieve information from database and present them in progress report.
    * Task 2: Create a cross button with onClick method on progress report page to redirect user from report page to setting page.

- Feature 7: The app should allow users to share this app with others.
    * Task 1: Create a shareApp method to access other apps in the same device.
    * Task 2: Create a cross button with onClick method on share page to redirect user from share page to setting page.


## Mapping between features and value(s) to be delivered by the app:
* Value 1: Young kids can use the app to expand their vocabulary and improve oral communication skills.
    - *Mapping* to Feature 4: The app should show users one picture at a time and test if they know the word that represented by the picture. If they do not know, the app should let users choose to listen to correct answer or again, or even pass to next question. If their answer is correct, then the app should show users the next picture in the list.
    - *Explanation*: Kids will see pictures from the app, and they need to tell the app what it is. If they know the correct answer, they will see the next picture and learn next word. If their answer is wrong, they can choose to try again or listen to the correct answer. If they do not know the answer, they can listen to the correct pronunciation before recording. In this way, kids can expand their vocabulary via a test-driven learning mode. Kids need to listen to questions and record their voice, which will help kids improve their oral skills.

* Value 2: Parents can easily track their kids' learning progress. 
    - *Mapping* to Feature 6: The app should provide users a report about their learning process; and Feature 1: The app should allow users to log in their accounts if they have exisitng accounts.
    - *Explanation*: Young kids will have their individual account and all the learning progress information are stored in their account and can be retreieved to produce progress report. 

* Value 3: Littile kids are interested in using the app.
    - *Mapping* to Feature 3: The app should show users a dashboard with list of categories upon login or signup, so that users can choose the category they want to learn; and Feature 4: The app should show users one picture at a time and test if they know the word that represented by the picture. If they do not know, the app should let users choose to listen to correct answer or again, or even pass to next question. If their answer is correct, then the app should show users the next picture in the list.
    - *Explanation*: Kids will hear the question and then record their voice as answer, which is an interactive way of learning. Kids will get interest in playing such an interactive education game app. Besides, if they do not have much interest in learning word-picture in a certain category, they can choose a different category any time as they like.


# Part 3: Implementation
## Language and Dev Platform
- **Language**: React Native
- **Dev Platform**: Mac OS
- **Running Platform**: iOS
- **Testing device:** iPad Air (4th generation) and iPhone 11

## Instructions to compile
- Follow [Expo EAS build instruction](https://docs.expo.dev/build/introduction/) to build a ready-to-submit binary of this app for the Apple App Store, and run a build for internal distribution.

## Functionality implemented:
Basically all the functions and features designed during project planning phase has been implemented accordingly. Only the progress report part is a bit different from what was designed. The progress report is directly shown in setting page, and there is no progress report screen any more. 

Below are the details of functionality implemented:
  - Sign up feature to sign up user account with / without user uploaded profile photo. (If user allows access permission to camera, he/she can take a photo from camera and upload to app as profile photo; if user allows access permission to photo library; he/she can choose a photo from photo library and upload to app as profile photo; if user denies access permission to camera and photo library, then default cat picture will be used as his/her profile photo.)
  - Signup screen navigate to dashboard upon successful account signup; or can navigate back to login screen.
  - Log in feature to verify user information and navigate to dashboard screen upon successful account login.
  - Log in screen navigate to sign up screen.
  - Dashboard navigate to setting screen.
  - Setting screen navigate to Dashboard screen.
  - Setting page with progress report and clear progress button to clear cache of user progress. 
  - Setting page with sharing button to access other app in the same device to share information with others. 
  - Setting page's logout button navigate to login screen.
  - Dashboard has category item buttons which upon click will navigate to Flash Card screen.
  - Flash Card screen has recording button to record user's audio message and then the app will perform speech recognition to check if user's input is correct or not. If correct, then the app will navigate to next Flash Card screen. If not correct, the app will play sound to ask user to try again or click question button for help. 
  - The app will ask for permission to access microphone and speech recognition, so that the recording function can work as designed. If without perssions, then the recording function will not work. 
  - Flash Card screen has the question button to play sound of the pronunciation of the word associate with the flash card picture. 
  - Flash Card screen has the next button to navigate to next Flash Card screen, if user want to skip currect flash card and jump to the next card. 
  - Flash Card screen has the home button to navigate to Dashboard screen, so that user can select to learn other catogories or choose to go to the setting screen.
  - When user re-enters a certain category, the app will direct user to the first flash card in this category which he/she did not pass previously. 
  - All data are fetched locally and the app is accessible without internet connection. 
  - When there's internet connection, the app will fetch the remote database to get the lastest updated contents and show in this app. 

## Demo with iPad and iPhone
1) Demo with Ipad Air 4:
(https://www.youtube.com/watch?v=3CwrsnWNLkM)
2) Demo with Iphone 11:
(https://www.youtube.com/watch?v=kyXiyhTP6Tc)

## Challenges solved
1) Date storage:
    - User account information is stored in local SQlite database. 
    - User progress information is stored in local SQlite database. 
    - Flash card contents are stored remotely on Gist website, then cached locally in data.json file. 
2) Sensor usage:
    - Microphone: for recording feature.
    - Camera: for profile uploading feature.
3) Permissions:
    - Microphone & Speech recognition permissions: the app will ask for user's permissions to access microphone and speech recognition, so that the app can record user's voice and then translate speech into text to verify if user's answers are correct. If user does not want to grant these two permissions, then the user cannot use the recording feature, but they can still have access to all other features. 
    - Camera and Photo library access permissions: When signing up account, user can choose to upload a profile photo. If user wants to take a photo to upload as their profile, the app will ask for permission to access camera before letting user to use the camera. If user wants to choose any existing photo from photo library to upload as their profile, the app will ask for permission to access photo library before letting user to choose any existing photo. If user does not want to grant any permission to access camera or photo library, then their profile photo will be a default picture upon signup. 
4) No access to intenet (caching consideration):
    - All data are cached locally and the app is accessible without internet connection. 
    - When there's internet connection, the app will fetch the remote database to get the lastest updated contents and show in this app. 
    - When there's no internet connection, the app will load the local cached contents,
5) Security and privacy:
    - User password is encryped with Base64.
    - User has the right to deny access permission to camera, photo library, microphone and/or speech recognition. Without these permissions, user can still use the app with limited functionality.
6) Interaction with other apps on the same device:
    - If user wants to share information with others via other apps on the same device, they can click the share button in setting screen to access other apps, such as what's app, email, message, and etc.
7) Form factor:
    - The app used _react-native-extended-stylesheet_ package to create styles for the app. The _rem_ unit makes it easy to scale the app depending on the device screen size. 
    - Percent values relative to screen width/height are used to calculate margin values, text input width, and button width.
    - Below is the picture showing the screens of *iPad Air 4* versus *iPhone 11*:
    ![This is an image](/images/formsize.jpg)
8) State management:
    - I used React's useState and useEffect for local state management throughout the whole project.
9) Cross-platform development:
    - As react native can be used to create cross-platform application, theoretically we can build for Android and iOS at the same time. However, I do not have any Android device, so I did not try any build for Android at this moment. But there is still the potential to build the app for both iOS and Android with current code package.

## Reference

*Reference 1: https://www.nbcnews.com/tech/gadgets/do-education-apps-keep-kids-sharp-or-just-plugged-n122581*

*Reference 2: Hoffman, J. L., Teale, W. H., & Paciga, K. A. (2014). Assessing vocabulary learning in early childhood. Journal of Early Childhood Literacy, 14(4), 459–481. https://doi-org.offcampus.lib.washington.edu/10.1177/1468798413501184*

*Reference 3: Barbara, A. W., Charlene, I. (2012). The Reading Teacher Vol. 66 Issue 2 pp. 321–332 DOI:10.1002/TRTR.01095. https://education.illinoisstate.edu/downloads/casei/Developing%20vocabulary%20through%20purposeful%20strategic%20conversations.pdf*

*Reference 4: https://vocalsaints.co.nz/speech-clarity-whats-normal-and-when-to-seek-help/*
