document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn form submit mặc định

    // Lấy giá trị từ form đăng nhập
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    // Lấy dữ liệu người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra người dùng với dữ liệu trong localStorage
    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

    if (user) {
        // Đăng nhập thành công - Chuyển hướng đến trang index.html
        alert('Đăng nhập thành công!');
        window.location.href = '../../index.html';
    } else {
        // Đăng nhập thất bại
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
});
