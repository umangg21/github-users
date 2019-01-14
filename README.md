# Contact Manager APP

This is Github Users Serach UI App developed using React with TypeScript.

# Link 

Github Users Serach is also live on the following Link: https://umangg21.github.io/github-users/

# Functionality:

```sh
Search

Use search API (https://developer.github.com/v3/search/#search-users) to implement the search feature. Search results display avatars and usernames. It look similar to https://github.com/orgs/github/people. Clicking on a username or avatar display user’s profile page.

User ProfilePage

Use users API (https://developer.github.com/v3/users/#get-a-single-user) and repos API (https://developer.github.com/v3/repos/#list-user-repositories) to implement user profile page. It  display user info on left side and list of user repos on right side and look similar to https://github.com/octocat?tab=repositories. 
A dropdown is provided on top to select the sort parameter mentioned in the repos API documentation. Changing the dropdown value automatically update the repos list.
```

# How to run app locally:

```sh
1. Take the latest from Git
2. Run "npm install" in the root directory
3. Run "npm start"
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.