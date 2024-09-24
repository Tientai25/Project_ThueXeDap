document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn không cho form gửi đi

    // Xóa các thông báo lỗi trước đó
    resetErrors();

    // Lấy giá trị của các trường nhập liệu
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    let hasError = false;

    // Kiểm tra tên đăng nhập
    if (username.length < 3) {
        document.getElementById('usernameError').innerText = 'Tên đăng nhập phải có ít nhất 3 ký tự';
        document.getElementById('usernameError').style.display = 'block';
        hasError = true;
    }

    // Kiểm tra định dạng email
    if (!validateEmail(email)) {
        document.getElementById('emailError').innerText = 'Email không hợp lệ';
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
    }

    // Kiểm tra mật khẩu
    if (password.length < 6) {
        document.getElementById('passwordError').innerText = 'Mật khẩu phải có ít nhất 6 ký tự';
        document.getElementById('passwordError').style.display = 'block';
        hasError = true;
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = 'Mật khẩu xác nhận không khớp';
        document.getElementById('confirmPasswordError').style.display = 'block';
        hasError = true;
    }

    // Nếu không có lỗi, hiển thị thông báo thành công
    if (!hasError) {
        document.getElementById('successMessage').innerText = 'Đăng ký thành công!';
        document.getElementById('successMessage').style.display = 'block';
        // Sau đó có thể gửi form hoặc xử lý tiếp tục tùy nhu cầu
    }
});

// Hàm xóa các thông báo lỗi
function resetErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (message) {
        message.style.display = 'none';
    });
    document.getElementById('successMessage').style.display = 'none';
}

// Hàm kiểm tra định dạng email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
