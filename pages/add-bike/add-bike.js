document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Lấy dữ liệu từ form
    const bikeData = {
        bikeId: document.getElementById('bikeId').value,
        bikeTitle: document.getElementById('bikeTitle').value,
        bikeDescription: document.getElementById('bikeDescription').value,
        bikePrice: document.getElementById('bikePrice').value,
        bikeImg: document.getElementById('bikeImg').files[0]?.name // Lấy tên file ảnh
    };

    // Gửi dữ liệu đến server qua fetch API
    fetch('/add-bike', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bikeData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Xe đã được thêm thành công!');
            } else {
                alert('Có lỗi xảy ra khi thêm xe!');
            }
        })
        .catch(error => {
            console.error('Lỗi:', error);
            alert('Có lỗi xảy ra khi kết nối đến server!');
        });
});
