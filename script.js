
function addEventToBtns() {

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener("click", () => {
            const test = btn.parentElement.querySelector('p').innerText
            navigator.clipboard.writeText(test).then(() => {
                btn.innerText = "done"
                // btn.classList.add("success")
                setTimeout(() => {
                    btn.innerText = "content_copy"
                    // btn.classList.remove("success")
                }, 1000);

            }).catch(() => {
            })
        })
    })
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener("click", () => {
            const linkContainer = btn.parentElement;
            linkContainer.remove();

            // Update localStorage after deletion
            updateLocalStorage();
        });
    });
}
document.forms[0].addEventListener('submit', addNewLink)

function addNewLink(e) {
    e.preventDefault();
    let form = document.forms[0];
    let inputValue = form.elements.text.value;
    const newDiv = document.createElement('div');
    const newP = document.createElement('p');
    newP.textContent = inputValue;
    // alert(newP.textContent)
    const newCopyBtn = document.createElement('span');
    newCopyBtn.classList.add('material-symbols-outlined', 'copy-btn');
    newCopyBtn.textContent = 'content_copy';
    const newDeleteBtn = document.createElement('span');
    newDeleteBtn.classList.add('material-symbols-outlined', 'delete-btn');
    newDeleteBtn.textContent = 'delete';

    newDiv.appendChild(newP);
    newDiv.appendChild(newCopyBtn);
    newDiv.appendChild(newDeleteBtn);

    document.querySelector('section').appendChild(newDiv);
    addEventToBtns()
    // Save the link to localStorage
    saveLink(inputValue);
    form.elements.text.value = "";
}

addEventToBtns()

function saveLink(link) {
    let links = JSON.parse(localStorage.getItem('links')) || [];
    links.push(link);
    localStorage.setItem('links', JSON.stringify(links));
}

function loadLinks() {
    let links = JSON.parse(localStorage.getItem('links')) || [];
    let section = document.querySelector('section');

    links.forEach(link => {
        const newDiv = document.createElement('div');
        const newP = document.createElement('p');
        newP.textContent = link;

        const newCopyBtn = document.createElement('span');
        newCopyBtn.classList.add('material-symbols-outlined', 'copy-btn');
        newCopyBtn.textContent = 'content_copy';

        const newDeleteBtn = document.createElement('span');
        newDeleteBtn.classList.add('material-symbols-outlined', 'delete-btn');
        newDeleteBtn.textContent = 'delete';

        newDiv.appendChild(newP);
        newDiv.appendChild(newCopyBtn);
        newDiv.appendChild(newDeleteBtn);

        section.appendChild(newDiv);
    });

    addEventToBtns();
}

function updateLocalStorage() {
    let links = [];
    document.querySelectorAll('.copy-btn').forEach(btn => {
        links.push(btn.parentElement.querySelector('p').innerText);
    });
    localStorage.setItem('links', JSON.stringify(links));
}
// Load links on page load
loadLinks();