//create a footer element
const footer = document.createElement("footer")
//Get today's date
const today = new Date();
// console.log(today)
const thisYear = today.getFullYear();
// console.log(thisYear)

const copyright = document.createElement("p")
// the assignment asks for the unicode but this is the html entity code: &copy;
copyright.innerHTML = `&#169 Jennifer Peterson ${thisYear}`;

// Append the copyright to the footer
// when it is a variable, remember not to put it into quotations
footer.appendChild(copyright)
document.body.appendChild(footer)


//create an array of skills to add to the page
const skills = ["Javascript", "HTML", "CSS", "React", "Node.js", "Cybersecurity"]

// Select the skills section using the ID
const skillsSection = document.getElementById("Skills")

const skillsList = skillsSection.querySelector("ul")


//loop through the skills array and add each skill as an li to the ul

for(let i = 0; i < skills.length; i++){
    const skill = document.createElement("li")
    skill.innerText = skills[i]
    skillsList.appendChild(skill)
}

