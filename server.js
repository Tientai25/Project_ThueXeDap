const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer'); // Để xử lý upload file

const app = express();
const PORT = 3000;

// Middleware để phân tích JSON từ body request
app.use(bodyParser.json());

// Cấu hình lưu trữ cho multer (lưu ảnh vào thư mục uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Lưu với tên gốc của file
    }
});

const upload = multer({ storage });

// Tạo thư mục nếu chưa có
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Route xử lý upload hình ảnh
app.post('/upload-image', upload.single('bikeImg'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Chưa có ảnh' });
    }
    res.json({ success: true, message: 'Ảnh đã được tải lên', fileName: req.file.filename });
});

// Route để xử lý thêm xe
app.post('/add-bike', (req, res) => {
    const newBike = req.body;

    // Đọc file data.json
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Lỗi đọc file' });
        }

        let bikes = [];

        if (data) {
            bikes = JSON.parse(data); // Chuyển dữ liệu thành mảng
        }

        // Thêm xe mới vào mảng
        bikes.push(newBike);

        // Ghi lại vào file data.json
        fs.writeFile('data.json', JSON.stringify(bikes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Lỗi ghi file' });
            }

            res.json({ success: true, message: 'Xe đã được thêm thành công!' });
        });
    });
});

// Chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy trên http://localhost:${PORT}`);
});
