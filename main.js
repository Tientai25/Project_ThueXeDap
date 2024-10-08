const products = document.querySelector('.products')

const getData = async () => {
    const respone = await fetch('data.json');

    const data = await respone.json();

    console.log(data)
    if (data) {
        products.innerHTML = data.map(item => {
            return `
            <div class="product-item">
            <img src="${item.img}" alt="Road Bike">
            <div class="product-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="pages/detail/detail.html?id=${item.id}" class="btn">Thuê xe ngay</a>
            </div>
        </div>
        `
        }
        ).join('');
    }
}

getData();

let currentPage = 1; // Trang hiện tại
const itemsPerPage = 4; // Số lượng sản phẩm hiển thị trên mỗi trang

// Hàm lấy dữ liệu từ file JSON
const getDataJson = async () => {
    const response = await fetch('data.json');
    const data = await response.json();
    displayProducts(data, currentPage); // Hiển thị dữ liệu trang đầu tiên
    setupPagination(data); // Thiết lập phân trang
};

// Hàm hiển thị sản phẩm cho trang hiện tại
const displayProducts = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    products.innerHTML = paginatedData.map(item => {
        return `
        <div class="product-item">
            <img src="${item.img}" alt="Road Bike">
            <div class="product-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="pages/detail/detail.html?id=${item.id}" class="btn">Thuê xe ngay</a>
            </div>
        </div>
        `;
    }).join('');
};

// Hàm thiết lập phân trang
const setupPagination = (data) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    // Nút "Trước"
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Trước';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts(data, currentPage);
            updatePaginationButtons(totalPages);
        }
    });

    // Nút "Tiếp"
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Tiếp';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts(data, currentPage);
            updatePaginationButtons(totalPages);
        }
    });

    pagination.appendChild(prevButton);

    // Thông tin số trang
    const pageInfo = document.createElement('span');
    pageInfo.id = 'page-info';
    pagination.appendChild(pageInfo);
    updatePaginationButtons(totalPages);

    pagination.appendChild(nextButton);
    products.insertAdjacentElement('afterend', pagination);
};

// Hàm cập nhật trạng thái các nút phân trang
const updatePaginationButtons = (totalPages) => {
    const pageInfo = document.getElementById('page-info');
    pageInfo.textContent = `Trang ${currentPage} / ${totalPages}`;

    const pagination = document.querySelector('.pagination');
    pagination.querySelector('button:first-child').disabled = currentPage === 1;
    pagination.querySelector('button:last-child').disabled = currentPage === totalPages;
};

// Gọi hàm lấy dữ liệu
getDataJson();