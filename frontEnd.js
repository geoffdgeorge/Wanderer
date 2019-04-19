/* HTML Variables */

const submitBtn = document.querySelector(`#submitBtn`);
const nameInput = document.querySelector(`#name`);
const picURLInput = document.querySelector(`#picURL`);
const surveyChoices = document.getElementsByName('choices')
const nameLabel = document.querySelector(`#nameLabel`);
const picURLLabel = document.querySelector(`#picURLLabel`);


/* Functions */

function handleClick(e) {
    event.preventDefault();
    if(!nameInput.value && !picURLInput.value) {
        nameLabel.textContent = `Please include a name`;
        nameLabel.style.color = `red`;
        picURLLabel.textContent = `Please include a valid image URL`;
        picURLLabel.style.color = `red`;
    } else if (!nameInput.value) {
        nameLabel.textContent = `Please include a name`;
        nameLabel.style.color = `red`;
        picURLLabel.textContent = `Link to Profile Image`;
        picURLLabel.style.color = `#000000`;
    } else if (!picURLInput.value) {
        nameLabel.textContent = `Name`;
        nameLabel.style.color = `#000000`;
        picURLLabel.textContent = `Please include a valid image URL`;
        picURLLabel.style.color = `red`;
    } else {
        nameLabel.textContent = `Name`;
        nameLabel.style.color = `#000000`;
        picURLLabel.textContent = `Link to Profile Image`;
        picURLLabel.style.color = `#000000`;

        const friend = {
            name: nameInput.value.trim(),
            profilePic: picURLInput.value.trim(),
            answers: []
        }

        surveyChoices.forEach(choice => {
            friend.answers.push(parseFloat(choice.value));
        })

        axios.post(`/api/friends`, friend).then(response => {
            getBestFriend();
        }).catch(err => {
            console.log(err);
        });

        function getBestFriend() {
            axios.get(`/api/friends/bff`).then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        }

    }

}

/* Calls */

submitBtn.addEventListener('click', handleClick);