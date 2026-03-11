async function generatePlan() {

  const subject = document.getElementById("subject").value;
  const examDate = document.getElementById("examDate").value;
  const hours = document.getElementById("hours").value;

  if (!subject || !examDate || !hours) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subject: subject,
        examDate: examDate,
        hoursPerDay: hours
      })
    });

    const data = await response.json();

    document.getElementById("result").innerHTML = `
       Subject: <b>${subject}</b><br>
       Days Left: <b>${data.daysLeft}</b><br>
       Study Hours/Day: <b>${hours}</b><br>
       Plan Generated Successfully!
    `;

  } catch (error) {
    console.error("Error:", error);
    alert("Backend not connected! Make sure server is running.");
  }
}