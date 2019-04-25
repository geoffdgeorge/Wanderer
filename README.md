# **Wanderer**

Wanderer is a full-stack app built for finding your ideal travel companion. Users are invited to take a short ten-question survey, and their scores are compared with the scores of every other user in the Wanderer database to find an ideal match (or matches, if two or more other users are evenly compared). Each match is then displayed for the user, with the match's picture, name, and their dream destination.

# Table of Contents

### [Dependencies](https://github.com/geoffdgeorge/Wanderer#dependencies-1)
### [How It Works](https://github.com/geoffdgeorge/Wanderer#how-it-works-1)
### [Future Plans](https://github.com/geoffdgeorge/Wanderer#future-plans-1)

# Dependencies

Wanderer was built with just a trio of common dependencies:

- [Axios](https://www.npmjs.com/package/axios) (to handle GET and POST requests on the front end)
- [Express](https://www.npmjs.com/package/express) (to handle request routing on the back end)
- [Path](https://nodejs.org/api/path.html) (to more easily work with file and directory paths on the back end)

# How It Works

A user navigates to the site and clicks through to the survey. If they fill out the survey correctly, with all required inputs populated, then a POST request is made to the path `/api/friends`, adding the user to the Wanderer API as a JSON object built like so:

```JS
{
    name: `Jamie Jones`,
    profilePic: `https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80.jpg`,
    dreamDestination: `Barbados`,
    answers: [3, 4, 3, 2, 1, 5, 4, 4, 5, 2]
}
```

Within the response function of the POST request, a second function is called that sends a GET request to `api/friends/bff`. The handling of this GET request on the back end is probably the most complex part of the entire app.

Essentially, what happens when the server receives a GET request to the `api/friends/bff` path is that it loops through each previously included user in the Wanderer API, and within each loop, it runs a nested loop through each user's survey scores, comparing their scores with those of the most recently included user (the person who just posted their survey info).

The whole process looks like this:

```JS
let bestFriends = [];
let bestFriendDiff = 40;

const newFriend = friends[friends.length - 1];

for (i = 0; i < friends.length - 1; i++) {
    let friendDiff = 0;

    for (j = 0; j < friends[i].answers.length; j++) {
        if (friends[i].answers[j] > newFriend.answers[j]) {
            friendDiff += friends[i].answers[j] - newFriend.answers[j];
        } else if (friends[i].answers[j] < newFriend.answers[j]) {
            friendDiff += newFriend.answers[j] - friends[i].answers[j];
        }
    }

    if (bestFriends === []) {
        if (friendDiff < bestFriendDiff) {
            bestFriendDiff = friendDiff;
            bestFriends.push(friends[i]);
        }
    } else {
        if (friendDiff < bestFriendDiff) {
            bestFriends = [];
            bestFriendDiff = friendDiff;
            bestFriends.push(friends[i]);
        } else if (friendDiff === bestFriendDiff) {
            bestFriends.push(friends[i]);
        }
    }
}

res.json(bestFriends);
```

The ideal match is found by tallying the total difference between the scores of each user and the scores of the most recent user, and the lowest difference between scores is the ideal match. If more than one previous user is tied for the lowest difference with the most recent user, then all previous users with tying lowest scores are returned in the GET response, which is returned as an array of JSON objects.

The information returned in the GET response is then used to populate a modal that pops up on the page, highlighting the users matched with the current user.

# Future Plans

### **1. Image uploading and better image validation**

At the moment, images are validated on the front end with a check for a valid file extension at the end of the link that each user submits. (I.e., the code checks for ".jpg," ".png," ".gif," and ".tiff") This isn't the best UX approach and can easily be fooled. (A user merely has to type ".jpg" or something similar at the end of the string they submit for photo URL, even if the string isn't an actual URL link to a photo.)

In the future, the URL input will be replaced with an input to upload a photo directly from the user.

### **2. Profile pages with saved matches**

Right now, once users fill out the survey and get entered into the Wanderer API, they are shown their closest matches once. In the future, it would be helpful to provide a profile page for each user, where they can track new matches as more people take the survey and add new information to the database.