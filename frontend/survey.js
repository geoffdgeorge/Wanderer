/* HTML Variables */

const submitBtn = document.querySelector(`#submitBtn`);
const nameInput = document.querySelector(`#name`);
const picURLInput = document.querySelector(`#picURL`);
const destInput = document.querySelector(`#destination`);
const surveyChoices = document.getElementsByName(`choices`);
const nameLabel = document.querySelector(`#nameLabel`);
const picURLLabel = document.querySelector(`#picURLLabel`);
const destLabel = document.querySelector(`#destLabel`);
const modal = document.querySelector(`.modal`);
const modalInterior = document.querySelector(`.modal-interior`);

/* Functions */

function handleClick(e) {
	event.preventDefault();
	if (!nameInput.value && !picURLInput.value && !destInput.value) {
		nameLabel.textContent = `Please include a name`;
		nameLabel.style.color = `red`;
		picURLLabel.textContent = `Please include a valid image URL`;
		picURLLabel.style.color = `red`;
		destLabel.textContent = `Please include a dream destination`;
		destLabel.style.color = `red`;
	} else if (!nameInput.value && !picURLInput.value) {
		nameLabel.textContent = `Please include a name`;
		nameLabel.style.color = `red`;
		picURLLabel.textContent = `Please include a valid image URL`;
		picURLLabel.style.color = `red`;
		destLabel.textContent = `Your Dream Vacation Destination`;
		destLabel.style.color = `#000000`;
	} else if (!picURLInput.value && !destInput.value) {
		nameLabel.textContent = `Name`;
		nameLabel.style.color = `#000000`;
		picURLLabel.textContent = `Please include a valid image URL`;
		picURLLabel.style.color = `red`;
		destLabel.textContent = `Please include a dream destination`;
		destLabel.style.color = `red`;
	} else if (!nameInput.value && !destInput.value) {
		nameLabel.textContent = `Please include a name`;
		nameLabel.style.color = `red`;
		picURLLabel.textContent = `Link to Profile Image`;
		picURLLabel.style.color = `#000000`;
		destLabel.textContent = `Please include a dream destination`;
		destLabel.style.color = `red`;
	} else if (!nameInput.value) {
		nameLabel.textContent = `Please include a name`;
		nameLabel.style.color = `red`;
		picURLLabel.textContent = `Link to Profile Image`;
		picURLLabel.style.color = `#000000`;
		destLabel.textContent = `Your Dream Vacation Destination`;
		destLabel.style.color = `#000000`;
	} else if (!picURLInput.value) {
		nameLabel.textContent = `Name`;
		nameLabel.style.color = `#000000`;
		picURLLabel.textContent = `Please include a valid image URL`;
		picURLLabel.style.color = `red`;
		destLabel.textContent = `Your Dream Vacation Destination`;
		destLabel.style.color = `#000000`;
	} else if (!destInput.value) {
		nameLabel.textContent = `Name`;
		nameLabel.style.color = `#000000`;
		picURLLabel.textContent = `Link to Profile Image`;
		picURLLabel.style.color = `#000000`;
		destLabel.textContent = `Please include a dream destination`;
		destLabel.style.color = `red`;
	} else {
		const fileExt = new RegExp(
			`(jpg)+$|(png)+$|(gif)+$|(tiff)+$|(JPG)+$|(PNG)+$|(GIF)+$|(TIFF)+$`
		);

		if (!fileExt.test(picURLInput.value.trim())) {
			nameLabel.textContent = `Name`;
			nameLabel.style.color = `#000000`;
			picURLLabel.textContent = `Please include a valid image URL with an extension of "jpg," "png," "tiff," or "gif" at the end`;
			picURLLabel.style.color = `red`;
			destLabel.textContent = `Your Dream Vacation Destination`;
			destLabel.style.color = `#000000`;
		} else {
			nameLabel.textContent = `Name`;
			nameLabel.style.color = `#000000`;
			picURLLabel.textContent = `Link to Profile Image`;
			picURLLabel.style.color = `#000000`;
			destLabel.textContent = `Your Dream Vacation Destination`;
			destLabel.style.color = `#000000`;

			const friend = {
				name: nameInput.value.trim(),
				profilePic: picURLInput.value.trim(),
				dreamDestination: destInput.value.trim(),
				answers: []
			};

			surveyChoices.forEach(choice => {
				friend.answers.push(parseFloat(choice.value));
			});

			axios
				.post(`/api/friends`, friend)
				.then(response => {
					getBestFriend();
				})
				.catch(err => {
					console.log(err);
				});

			function getBestFriend() {
				axios
					.get(`/api/friends/bff`)
					.then(response => {
						const friends = response.data;

						if (friends.length === 1) {
							const friend = response.data[0];

							const modalDiv = document.createElement(`div`);
							modalDiv.classList.add(`modal-div`);

							const textDiv = document.createElement(`div`);
							modalDiv.classList.add(`modal-text-div`);

							const newH3 = document.createElement(`h3`);
							newH3.textContent = friend.name;
							const newH4 = document.createElement(`h4`);
							newH4.textContent = `Dream destination: ${friend.dreamDestination}`;

							const newImg = document.createElement(`img`);
							newImg.src = friend.profilePic;
							newImg.classList.add(`modal-img`);

							textDiv.appendChild(newH3);
							textDiv.appendChild(newH4);
							modalDiv.appendChild(newImg);
							modalDiv.appendChild(textDiv);
							modal.appendChild(modalDiv);
							modal.classList.add(`modal-open`);
						} else if (friends.length > 1) {
							friends.forEach(friend => {
								const modalDiv = document.createElement(`div`);
								modalDiv.classList.add(`modal-div`);

								const textDiv = document.createElement(`div`);
								modalDiv.classList.add(`modal-text-div`);

								const newH3 = document.createElement(`h3`);
								newH3.textContent = friend.name;
								const newH4 = document.createElement(`h4`);
								newH4.textContent = `Dream destination: ${friend.dreamDestination}`;

								const newImg = document.createElement(`img`);
								newImg.src = friend.profilePic;
								newImg.classList.add(`modal-img`);

								textDiv.appendChild(newH3);
								textDiv.appendChild(newH4);
								modalDiv.appendChild(newImg);
								modalDiv.appendChild(textDiv);
								modal.appendChild(modalDiv);
								modal.classList.add(`modal-open`);
							});
						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	}
}

function closeModal(e) {
	// Borrowed from this source for detecting click outside the modal: https://stackoverflow.com/questions/14188654/detect-click-outside-element-vanilla-javascript
	const clickedInside = modal.contains(e.target);
	if (!clickedInside) {
		modal.classList.remove(`modal-open`);
		while (modal.firstChild) {
			modal.removeChild(modal.firstChild);
		}
	}
}

/* Calls */

document.addEventListener(`click`, closeModal);
submitBtn.addEventListener(`click`, handleClick);
