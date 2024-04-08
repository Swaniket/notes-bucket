# Notes Bucket

Notes bucket is a feature rich notes application, where user can create, edit, view and delete notes.

### Features

- Full authentication system (login and signup).
- Emogi and Markdown support for notes.
- Organization of notes by tags.
- Ability to pin and archive notes.
- Search Notes & Filter notes by tags
- User Profile page for some quick KPI and ability to update user profile.

### Screens

1. Login

![](Screens/Login.png)

2. Signup

![](Screens/Signup.png)

3. Home Page

![](Screens/HomePage.png)

4. Home Page - Filter by Tag

![](Screens/HomePage_FilterByTag.png)

5. Home Page - Search

![](Screens/HomePage_Search.png)

6. Create New Note

![](Screens/CreateNote.png)

7. Create Note - Immersive Mode

![](Screens/CreateNote_ImmersiveMode.png)

8. Edit Note

![](Screens/EditNote.png)

9. View Note

![](Screens/ViewNotes.png)

10. Delete a note

![](Screens/DeleteNote.png)

6. Quick Settings menu

![](Screens/QuickSettings.png)

7. Manage Tags Page

![](Screens/ManageTagsPage.png)

8. Manage Tags Page - Search

![](Screens/ManageTagsPage_Search.png)

9. Manage Tags Page - Add a tag

![](Screens/ManageTagsPage_AddTag.png)

10. Manage Tags Page - Remove a tag

![](Screens/ManageTagsPage_Delete.png)

11. Profile Page

![](Screens/ProfilePage.png)

### Tech Stack

- ReactJS + Vite
- Redux-Toolkit
- Axios
- Bootstrap
- Node + ExpressJS
- MySQL

### How to run on the local machine

You need to have the following installed in your system to run the project

1. NodeJS
2. MySQL

After installing these -

1. Go to the `dbScripts` folder and run the `createTables.sql` file to create the tables locally.
2. Go to the `api` folder and run `npm install`.
3. After the installation is done, run `npm run dev` to run the express server locally.
4. Go to the `ui` folder and run `npm install`.
5. After the installation is done, run `npm run dev` to run the vite server locally.

### Roadmap

- ~~Add notes encryption in the database~~.
- Add the forgot password module.
- Edit Password module.
- First Login Instructions - Add a tag to get started.
- Animations.
