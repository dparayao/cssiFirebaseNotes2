let googleUser;

window.onload = event => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      getNotes(user.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
}

function getNotes(userId) {
    console.log('getting notes for', userId);
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (db) => {
        const data = db.val();
        console.log(data);
        renderData(data);
    });
}

function renderData(data)
{
    let html = '';

    for(const dataKey in data)
    {
        const note = data[dataKey];
        const cardHtml = renderCard(note);
        console.log(cardHtml);
        html += cardHtml;
    }

    document.querySelector('#app').innerHTML = html;
}

function renderCard(note)
{
    //convert note to html and return
    console.log(note);

    const color = chooseColor();
return `
   <div class = "column is-one-quarter">
        <div style="background-color:${color}; border-radius: 5%;" class="card">
            <header style = "color: #22223b;" class = "card-header">
                <span class = "card-header-title">${ note.title }</span>
            </header>
            <div class = "card-content">
                <div class = "tags">
                <span class = "tag is-rounded is-normal is-light">${ note.tag }</span>
                </div>
                <div class = "content">${ note.text }</div>
            </div>
            <footer style = "padding: 5%" class = "card-footer">
                <p id = "footer-text">created by</p1>
                <p style = "color: #22223b;" id = "footer-textUser"><br>${ googleUser.displayName }</p>
            </footer>
        </div>
    </div>
    `;
}

function chooseColor()
{
    const colors = ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d"];
    const pickColor = Math.floor(Math.random() * 3);
    const chosenColor = colors[pickColor];
    console.log(chosenColor);

    return chosenColor;
}