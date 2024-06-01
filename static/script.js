
// Funzioni per il salvataggio dei dati
function saveData() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const birthplace = document.getElementById('birthplace').value;

    const data = {
        name: name,
        surname: surname,
        birthplace: birthplace
    };

    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Dati salvati con successo!');
        } else {
            alert('Errore nel salvataggio dei dati.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function generatePassword() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const birthplace = document.getElementById('birthplace').value;

    if (!name || !surname || !birthplace) {
        alert('Compila tutti i campi per generare una password.');
        return;
    }

    const rawPassword = name + surname + birthplace + new Date().getTime();
    const password = CryptoJS.MD5(rawPassword).toString().substr(0, 12);

    document.getElementById('password').value = password;
}

function verifyAccess() {
    const appPasswordInput = document.getElementById('appPassword').value;
    const generatedPassword = document.getElementById('password').value;
    const protectedPassword = document.getElementById('protectedPassword').value;

    if (appPasswordInput === generatedPassword) {
        if (protectedPassword === 'cd34') {
            window.location.href = 'protected_cd34.html';
        } else if (protectedPassword === 'cd88') {
            window.location.href = 'protected_cd88.html';
        } else {
            alert('Password protetta non valida.');
        }
    } else {
        alert('App Password Generata non corretta. Riprova.');
    }
}

function privateAccess() {
    const privatePassword = document.getElementById('privateAccessPassword').value;

    if (privatePassword === 'nk3') {
        window.location.href = 'controllo.html';
    } else {
        alert('Password privata non valida.');
    }
}

function toggleData() {
    const generatedPasswordInput = document.getElementById('generatedPassword').value;
    const dataDisplay = document.getElementById('dataDisplay');

    if (generatedPasswordInput) {
        fetch('/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: generatedPasswordInput })
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                document.getElementById('nameDisplay').innerText = data.name;
                document.getElementById('surnameDisplay').innerText = data.surname;
                document.getElementById('birthplaceDisplay').innerText = data.birthplace;
                dataDisplay.style.display = dataDisplay.style.display === 'none' ? 'block' : 'none';
            } else {
                alert('Password generata non valida.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Inserisci una password generata.');
    }
}

function toggleAccessFields() {
    const accessFields = document.getElementById('accessFields');
    accessFields.style.display = accessFields.style.display === 'none' ? 'block' : 'none';
}

function togglePasswordVisibility(fieldId) {
    const field = document.getElementById(fieldId);
    if (field.type === 'password') {
        field.type = 'text';
    } else {
        field.type = 'password';
    }
}
