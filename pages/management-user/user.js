document.addEventListener('DOMContentLoaded', loadUsers);

// Hàm lấy dữ liệu user từ localStorage và hiển thị
function loadUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td class="admin-actions">
                <button class="edit" onclick="editUser(${index})">Edit</button>
                <button class="delete" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Hàm lưu user vào localStorage
function saveUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const userId = document.getElementById('userId').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (userId === '') {
        users.push({ username, email, role });
    } else {
        users[userId] = { username, email, role };
    }

    localStorage.setItem('users', JSON.stringify(users));
    closeModal();
    loadUsers();
}

// Hàm hiển thị modal thêm/sửa user
function showAddUserModal() {
    document.getElementById('userModal').style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Add User';
    document.getElementById('userId').value = '';
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('role').value = 'User';
}

// Hàm hiển thị modal chỉnh sửa user
function editUser(index) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users[index];

    document.getElementById('userModal').style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Edit User';
    document.getElementById('userId').value = index;
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('role').value = user.role;
}

// Hàm xóa user
function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

// Đóng modal
function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

function goToHomePage() {
    window.location.href = '../../index.html'; // Thay 'index.html' bằng URL của trang chủ
}
