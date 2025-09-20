//create a footer element
const footer = document.createElement("footer")
//Get today's date
const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p")
copyright.innerHTML = `&#169 Jennifer Peterson ${thisYear}`;

footer.appendChild(copyright)
document.body.appendChild(footer)


//create an array of skills to add to the page
const skills = ["Javascript", "HTML", "CSS", "React", "Node.js", "Cybersecurity"]

// Select the skills section using the ID
const skillsSection = document.getElementById("Skills")
const skillsList = skillsSection.querySelector("ul")

for(let i = 0; i < skills.length; i++){
    const skill = document.createElement("li")
    skill.innerText = skills[i]
    skillsList.appendChild(skill)
}

// form
const messageForm = document.forms["leave_message"]

messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // grab the values
    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    // message section and the list
    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");

    // show section once a message is added
    messageSection.style.display = "block";

    // create a new message
    const newMessage = document.createElement("li");

    // anchor tags for email
    const userLink = document.createElement("a");
    userLink.href = `mailto:${usersEmail}`;
    userLink.innerText = usersName;

    // span (for the message)
    const messageSpan = document.createElement("span");
    messageSpan.innerText = ` wrote: ${usersMessage}`;

    newMessage.appendChild(userLink);
    newMessage.appendChild(messageSpan);

    // remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function () {
        const entry = removeButton.parentNode;
        entry.remove();

        // hide messages section if list is empty
        if (messageList.children.length === 0) {
            messageSection.style.display = "none";
        }
    });

    // edit button
    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.type = "button";

    editButton.addEventListener("click", function () {
        if (editButton.innerText === "edit") {
            // turn span into input
            const input = document.createElement("input");
            input.type = "text";
            input.value = messageSpan.innerText.replace(" wrote: ", "").trim();

            newMessage.replaceChild(input, messageSpan);
            editButton.innerText = "save";
        } else {
            // save new message
            const input = newMessage.querySelector("input");
            messageSpan.innerText = ` wrote: ${input.value}`;

            newMessage.replaceChild(messageSpan, input);
            editButton.innerText = "edit";
        }
    });

    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);

    messageList.appendChild(newMessage);

    // clear the form
    event.target.reset();
});
