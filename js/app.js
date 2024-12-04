const questions = document.querySelectorAll(`li`);

questions.forEach(q => {
   q.addEventListener("click", () => {
      q.classList.toggle("active");
      const answer = q.querySelector(`.answer`);
      if(q.classList.contains("active")) {
         answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
         answer.style.maxHeight = 0;
      }
   });
});



// AI code:
const contact_submit = document.getElementById("contact-form").addEventListener("submit", function (event) {
   event.preventDefault(); // Prevent form submission to server

   // Get input values
   const name = document.getElementById("name").value.trim();
   const email = document.getElementById("email").value.trim();
   const message = document.getElementById("message").value.trim();
   const termsAccepted = document.getElementById("check").checked;

   // Validate all inputs are filled
   if (!name || !email || !message || !termsAccepted) {
      alert("Please fill out all fields and accept the terms and conditions.");
      return;
   }

   // Process the data
   console.log("User Data:");
   console.log("Name:", name);
   console.log("Email:", email);
   console.log("Message:", message);

   // Clear the form (optional)
   document.getElementById("contact-form").reset();

   alert("Thank you for your message!");
});

