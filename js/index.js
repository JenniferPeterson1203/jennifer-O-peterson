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



// Fetch Call to My GitHub Repositories

// I’m using fetch to grab my GitHub repositories from the API
fetch("https://api.github.com/users/JenniferPeterson1203/repos")
  .then(response => {
    // The API sends back a response, but I need to turn it into JSON so I can work with it
    return response.json();
  })
  .then(repositories => {
    //UNCOMMENT IF I WANT TO PUT IN BY DATE OF CREATION INSTEAD OF ALPHABETICAL ORDER
     // Sort repositories by creation date (newest first)
    // repositories.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); 


    // Now I have my repositories in JSON format (basically an array of objects)
    // I want to check it in the console to see what it looks like
    console.log(repositories);

    // I’m selecting the "Projects" section from my HTML
    const projectSection = document.getElementById("Projects");
    // Inside that section, I’m grabbing the <ul> where my repos will go
    const projectList = projectSection.querySelector("ul");

    // I want to loop through all of my repositories
    for (let i = 0; i < repositories.length; i++) {
      // This is the current repository in the loop
      const repo = repositories[i];

      // I’m creating a new list item <li> for the repo
      const project = document.createElement("li");

      // I’m making an <a> tag so users can click and go to the repo
      const link = document.createElement("a");
      link.href = repo.html_url; // this is the link to the GitHub repo page
      link.innerText = repo.name; // this is the name of the repo
      link.target = "_blank";//this opens in a new tab (so my portfolio stays open)

      // Add the link inside the list item
      project.appendChild(link);

      // Finally, I’m adding this new <li> to the <ul> in my Projects section
      projectList.appendChild(project);
    }
  })
  .catch(error => {
    // If something goes wrong (like the API doesn’t load), I’ll see the error here
    console.error("Error fetching repositories:", error);

    // I’m grabbing the Projects section again
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");

    // Instead of just failing silently, I’ll show a message on my page
    const errorItem = document.createElement("li");
    errorItem.innerText = "⚠️ Unable to load projects at this time.";
    projectList.appendChild(errorItem);
  });
