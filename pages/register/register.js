document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn submit form mặc định

    // Lấy giá trị từ form
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Kiểm tra tính hợp lệ của dữ liệu nhập vào
    let isValid = true;

    if (username.length < 3) {
        document.getElementById('usernameError').textContent = 'Tên đăng nhập phải có ít nhất 3 ký tự.';
        isValid = false;
    } else {
        document.getElementById('usernameError').textContent = '';
    }

    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
        isValid = false;
    } else {
        document.getElementById('passwordError').textContent = '';
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Mật khẩu xác nhận không khớp.';
        isValid = false;
    } else {
        document.getElementById('confirmPasswordError').textContent = '';
    }

    if (!isValid) {
        return; // Dừng lại nếu dữ liệu không hợp lệ
    }

    // Tạo một đối tượng người dùng mới
    const newUser = {
        username: username,
        email: email,
        password: password
    };

    // Lưu người dùng vào localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Hiển thị thông báo đăng ký thành công
    document.getElementById('successMessage').textContent = 'Đăng ký thành công! Chuyển hướng đến trang đăng nhập...';

    // Sau 1 giây chuyển đến trang login.html
    setTimeout(function () {
        window.location.href = '../authenticate/login.html';
    }, 1000);
});
