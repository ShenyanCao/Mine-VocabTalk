# Part 1: Questions and Answers:
1. Various approaches to storage management on your platform of choice:
* I am working on cross-platform app with *React Native*. 
* Below is a list of ways to handle data or files for *React Native* apps.

    **1) Key-Value Pair Storage:** Often, while creating settings options, it can be useful to store a simple key/value pairings of serializable data (like *JSON*). In the web world, we'd use *localStorage*. Ideally, we'd like a simple data storage for string-based data that has a *get*, a *set*, and a *clear* method to handle data for us. *react-native-default-preference* is an easy-to-add dependency that provides what we're looking for. Under-the-hood, it utilized native methods for storing data in a key-value manner. These APIs it employs is the *SharedPreferences API* on *Android* and the *UserDefaults API* on *iOS*. This native code utilization should mean that not only is the data straightforward to access, but speedy as well. Such an conventional way of storing data can be easily accessed from external sources, which will lead to a security vulnerability with sensitive data. 

    **2) Secure Key-Value Pair Storage:** In case that we want to store a part of secure information or sensitive data to the device, for example, an access token from the *GitHub API*, then *Secure Key-Value Pair Storage* is needed. Both major mobile platforms have solution for *Secure Key-Value Pair Storage*: *iOS* has its *Keychain API* while *Android* provides a *KeyStore API*. Both can be accessed using the *react-native-secure-key-store npm* package.

    **3) AsyncStorage:** is the most common method for data persistence in React Native. It's presents asynchronous, unencrypted, persistent, key-value storage system. In other words, AsyncStorage stores data as simple strings and should never be used for storing sensitive informations AsyncStorage is the most recommended way to persist data in *React Native* apps as it is already built into *React Native*. Storage stays local to the device like in browser or mobile’s native storage location. The storage is deleted when We clean device’s storage or browser’s storage. Data available locally is unencrypted but we can apply some security options. It should be use as part of your device’s backups and persists during upgrades.

    **4) SQLite:** When *key-value storage* is not enough, we may need the power and flexibility that a full-scale database provides. This instance is where having a local *SQL* database comes into play. *React Native* has a few different options for utilizing an on-device *SQL* database, but the most popular is using the *react-native-sqlite-storage* package and manage the database within the app. *SQLite* can be integrated with mobile apps to directly access and perform database operations.

    **5) SQLite with ORM Option:** If we want the power and utility of a *SQL* database, but don't want to play with any of the *SQL* syntaxes by ourselves, then there is a myriad of options to build on top of *SQLite* using *React Native*. One option is *TypeORM*, which is useful for both *TypeScript* and *vanilla JS* usage, and provides a bunch of functionality that maps relatively directly to SQL. Alternatively, we can use WatermelonDB which is more of a framework feel, and utilized with RxJS to provide an event-based fast-as-fusion alternative to more conventional ORMs.

    **6) Firebase:** It is a popular service provided by Google that supports a real-time *NoSQL* cloud database for *React Native*. Cloud Storage for Firebase stores app files in a Google Cloud Storage bucket, making them accessible through both Firebase and Google Cloud. It allows seamless data synchronization and offline data modification with just a few lines of code. If the application is more into offline data updating and data synchronization, then *Firebase* will suit it best. Firebase can significantly manage MVC-based *React Native* apps that have high data requirements. Moreover, Firebase gives developers full access to data removal from the Google server whenever required.

    **7) MongoDB:** *MongoDB* is an open-source *NoSQL* database built for scalability and complex applications. *MongoDB* follows a combined logic of using key-value stores and a relational database to store data objects in *JSON* documents with dynamic schemas. Even when managing large amounts of data and objects, *MongoDB* allows modification of the schema without affecting the React Native application’s performance or behavior at runtime. Being a *NoSQL* database, it uses a simple *JavaScript* interface to query instead of *SQL* statements. We can simply pass a *JavaScript* object that partially describes the search target, and *MongoDB* will return the value.

    **8) Realm:** Realm Database was built for offline-first and real-time applications. Realm has its own database engine and does not just rely on key-value pairs. It is not just another ORM or SQL wrapper. Developers prefer to use Realm to handle large amounts of data as well as for high-performance applications. Realm allows developers to frequently undergo mapping classes, tables, foreign keys and the fields. Realm is an object-oriented database. The object-oriented model makes it 10x faster and saves We from having to run tons of queries, unlike typical relational or SQL databases.

    **9) Files storage library:** This is about some of the features available in React Native to store and retrieve files. 
    - Every app has its own storage, that other apps do not have access to, which is known as internal storage. *react-native-fs* library is the perfect tool to handle files in internal storage and move files from local storage to external storage. *react-native-document-picker* package is the tool to move file from internal storage to external storage. 


2. Pros/cons of each approach for your project:
    
    **1) Key-Value Pair Storage:**
    * Pros:
        * Simple data format makes write and read operations extremely fast.
        * Value can be anything, including JSON, flexible schemas.
    * Cons:
        * Optimized only for data with single key and value. A parser is required to store multiple values.
        * Not optimized for lookup. Lookup requires scanning the whole collection or creating separate index values.
        * Not secure, cannot handle sensitive date.

    **2) Secure Key-Value Storage:**
    * Pros:
        * Simple data format makes write and read operations extremely fast
        * Value can be anything, including JSON, flexible schemas
        * A secure method of data storing.
    * Cons
        * Optimized only for data with single key and value. A parser is required to store multiple values.
        * Not optimized for lookup. Lookup requires scanning the whole collection or creating separate index values.
    
    **3) AsyncStorage:** 
    * Pros:
        * Alleviates some of the need to rely on Server and External DB.
        * Readily-available and simple one-liner implementation.
        * Does not delay the loading of the app and can be quicker than data-fetching.
        * MVP Considerations — Possibly a simple solution for MVP/POC product — that could serve until switching to production-ready solution.
    * Cons:
        * Silently reaches storage size limit of 6MB. Is 6MB plenty for the needs of the app?
        * The 6MB storage can be wiped clean in the case of low memory on device.
        * The storage is deleted when we clean device’s storage or browser’s storage.
        * Requires data type conversion as it holds only strings data.
        * Requires serialisation/deserialisation and content-security-policies in place to maintain safety of data.

    **4) SQLite without ORM:**	
    * Pros:
        * It cleanly separates data.

    * Cons
        * Difficult to maintain code and table migrations manually.
        * Not very fast compared to key-value pairs.

    **5) SQLite with ORM Option:**
    * Pros:
        * It cleanly separates data.
        * Much more easy to maintain than writing SQL itself.
    * Cons:
        * Often slower than writing SQL by hand.
        * More work to get setup.

    **6) Firebase:**
    * Pros:
        * If the app runs on a centralized database and is updated by a lot of users, then it's more than capable of handling the real-time data updates between devices.
        * Stored in the cloud; so readily available everywhere.
        * *JSON (JavaScript Object Notation)* storage means no barrier between data and objects.
        * Cross-Platform API (If We are using this DB with an app).
        * Hosting is taken care by firebase reducing the hardware maintenance cost.
         Minimal setup, easy access to data, files, auth and more.
    * Cons:
        * Storage format is entirely different from SQL (Firebase uses JSON). Hence, migration presents a difficult challenge.
        * Unless the app runs on one centralized database updated by a vast quantity of users, it's an overkill. It is limited to 100 connections, 1GB of storage and 10 GB/month download. It also supports more connections and data storage in a subscription model, which is a paid service.

    **7) MongoDB:** 
    * Pros:
        * The database is highly flexible.
        * It can be distributed amongst multiple databases.
        * It is really fast and great for scalability.
        * It is easy to set up and implement.
    * Cons:
        * The database takes up a ton of memory.
        * It has a document size limit of 16 MB.
        * It has limitations of nesting to 100 levels.
        * There is a limit of 20,000 to your max connection number. 

    **8) Realm:**
    * Pros:
        * Performance is faster than SQLite and Core Data.
        * Minimal code is required to handle all the work.
        * Consistent speed and performance irrespective of large data sets and enormous storage.
        * No limit to data storage.
        * Scalable and works with large data in no time.
        * Good Documentation & Support.
        * Realm is completely free.
    * Cons:
        * Consumes more memory and space as compared to SQLite.
        * It’s not a native framework.


# Part 2: App that demonstrates:
1. After clicking 'Sign Up' button, users should 1) key in email address and password, and 2) upload a portrait picture. Then the app will store user account information and user uploaded picture locally. 
2. The app will show the dashboard with 'Logout' button. Upon clicking the 'Logout' button, we will go back to the login page.
3. At the login page, users can key in email address and password, then the app will show the portrait picture in accordance with the email address and allow user to login their accout if ther password is correct.


## Demo
<img alt="demo" src="./assets/Demo.gif">


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
1. https://plainenglish.io/blog/trending-storage-options-for-react-native-developers-8671fbffb686
2. https://unicorn-utterances.com/posts/data-storage-options-in-react-native
3. https://blog.codemagic.io/choosing-the-right-database-for-react-native-app/
4. https://www.mindinventory.com/blog/top-react-native-databases/
