const friends = require(`./data/friends`);

function apiRoutes(app) {
	app.get(`/api/friends`, (req, res) => {
		res.json(friends);
	});

	app.get(`/api/friends/bff`, (req, res) => {
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
	});

	app.post(`/api/friends`, (req, res) => {
		friends.push(req.body);
		res.json();
	});
}

module.exports = apiRoutes;
