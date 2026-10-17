const API_URL = 'http://localhost:3000/api/clubs';

const form = document.getElementById('clubForm');
const table = document.getElementById('clubsTable');
const message = document.getElementById('message');

async function loadClubs() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Could not load clubs');

        const clubs = await response.json();
        table.innerHTML = '';

        clubs.forEach(club => {
            const row = document.createElement('tr');

            [
                club.id,
                club.name,
                club.category,
                club.president || '',
                club.email || '',
                club.meeting_day || ''
            ].forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });

            const actions = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit';
            editButton.onclick = () => editClub(club);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            deleteButton.onclick = () => deleteClub(club.id);

            actions.append(editButton, deleteButton);
            row.appendChild(actions);
            table.appendChild(row);
        });

        message.textContent = `Loaded ${clubs.length} clubs successfully.`;
    } catch (error) {
        message.textContent =
            'Could not connect to the API. Make sure the backend is running.';
        console.error(error);
    }
}

form.addEventListener('submit', async event => {
    event.preventDefault();

    const id = document.getElementById('clubId').value;

    const club = {
        name: document.getElementById('name').value.trim(),
        category: document.getElementById('category').value.trim(),
        description: document.getElementById('description').value.trim(),
        president: document.getElementById('president').value.trim(),
        email: document.getElementById('email').value.trim(),
        meeting_day: document.getElementById('meeting_day').value.trim()
    };

    try {
        const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(club)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Could not save club');
        }

        message.textContent = id
            ? 'Club updated successfully!'
            : 'Club added successfully!';

        form.reset();
        document.getElementById('clubId').value = '';
        document.getElementById('formTitle').textContent = 'Register a Club';

        await loadClubs();
    } catch (error) {
        message.textContent = error.message;
    }
});

function editClub(club) {
    document.getElementById('clubId').value = club.id;
    document.getElementById('name').value = club.name || '';
    document.getElementById('category').value = club.category || '';
    document.getElementById('description').value = club.description || '';
    document.getElementById('president').value = club.president || '';
    document.getElementById('email').value = club.email || '';
    document.getElementById('meeting_day').value = club.meeting_day || '';

    document.getElementById('formTitle').textContent = 'Edit Club';
    form.scrollIntoView({ behavior: 'smooth' });
}

async function deleteClub(id) {
    if (!confirm('Are you sure you want to delete this club?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Could not delete club');

        message.textContent = 'Club deleted successfully!';
        await loadClubs();
    } catch (error) {
        message.textContent = error.message;
    }
}

document.getElementById('cancelEdit').addEventListener('click', () => {
    form.reset();
    document.getElementById('clubId').value = '';
    document.getElementById('formTitle').textContent = 'Register a Club';
    message.textContent = '';
});

loadClubs();