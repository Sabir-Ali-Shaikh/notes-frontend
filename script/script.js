let selectForm = document.querySelector(".form");
let modForm = document.querySelector(".Modformhide");
let btn = document.querySelector(".btn-toggle");
let subNote = document.querySelector(".subnote");
let nextNote = document.querySelector(".prev-notes");
let cancelBtn = document.querySelector(".Cancel");
let modBtn = document.querySelector(".subModify");
let modCancle = document.querySelector(".mod-Cancel");

btn.addEventListener("click", function () {
  selectForm.classList.toggle("hide");
});

modCancle.addEventListener("click", function () {
  modForm.classList.toggle("mod-hide");
});

cancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  selectForm.classList.toggle("hide");
  form.title.value = "";
  form.description.value = "";
});

subNote.addEventListener("click", (e) => {
  if (
    form.title.value.trim().length > 0 &&
    form.description.value.trim().length > 0
  ) {
    e.preventDefault();
    fetch("http://localhost:5000/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: form.title.value,
        description: form.description.value,
      }),
    }).then((res) => {
      console.log("data potsed", res);
      subNote.textContent = "Submitted";
      form.title.value = "";
      form.description.value = "";
      window.location.reload();
    });
  } else {
    alert("Fill the form Correctly");
  }
});

const fetchNotes = async () => {
  await fetch("http://localhost:5000/get")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      showNotes(data);
    });
};

// function to Show Previous Notes

function showNotes(d) {
  d.data.forEach((d) => {
    const notePost = document.createElement("div");
    notePost.classList.add("added-note");
    notePost.innerHTML = `
    <h4>${d.title}</h4>
    <p>${d.description}</p>
    <button class="delete">Delete</button>
    <button class="modify">Modify</button>
    `;

    // Api For Deleting Selected Notes

    notePost.querySelector(".delete").addEventListener("click", (e) => {
      console.log(e.target.classList);
      fetch("http://localhost:5000/delete", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          id: d._id,
        }),
      }).then((res) => {
        console.log("data deleted", res);
        window.location.reload();
      });
    });

    // Modifying notes Starts here

    let modifybtn = notePost.querySelector(".modify");

    modifybtn.addEventListener("click", function () {
      modForm.classList.toggle("hide");
      newform.Newtitle.value = d.title;
      newform.Newdescription.value = d.description;
      modBtn.addEventListener("click", (e) => {
        console.log(e.target);
        console.log(d._id);
        if (
          newform.Newtitle.value.trim().length > 0 &&
          newform.Newdescription.value.trim().length > 0
        ) {
          e.preventDefault();
          fetch("http://localhost:5000/modify", {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              id: d._id,
              title: newform.Newtitle.value,
              description: newform.Newdescription.value,
            }),
          }).then((res) => {
            console.log("data potsed", res);
            modifybtn.textContent = "Submitted";
            newform.Newtitle.value = "";
            newform.Newdescription.value = "";
            window.location.reload();
          });
        } else {
          alert("Fill the form Correctly");
        }
      });
    });

    nextNote.appendChild(notePost);
  });
}
fetchNotes();
