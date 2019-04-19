const friends = require(`./friends`);

function apiRoutes(app) {

    app.get(`/api/friends`, (req, res) => {
        res.json(friends);
    })

    app.get(`/api/friends/bff`, (req, res) => {

        let bestFriend;
        let bestFriendDiff = 40;

        const newFriend = friends[friends.length - 1];

        for(i = 0; i < friends.length - 1; i++) {

            let friendDiff = 0;

            for(j = 0; j < friends[i].answers.length; j++) {
                if(friends[i].answers[j] > newFriend.answers[j]) {
                    friendDiff += (friends[i].answers[j] - newFriend.answers[j]);
                } else if(friends[i].answers[j] < newFriend.answers[j]) {
                    friendDiff += (newFriend.answers[j] - friends[i].answers[j]);
                }
            }

            console.log(friendDiff);

            if(friendDiff < bestFriendDiff) {
                bestFriendDiff = friendDiff;
                bestFriend = friends[i];
            }

        }

        res.json(bestFriend);

    })

    app.post(`/api/friends`, (req, res) => {
        friends.push(req.body);
        res.json();
    })

}

module.exports = apiRoutes;