/**
 * TÍNH TIỀN ĐƠN HÀNG TECHMART (LEGACY CODE)
 */

class Order {

    constructor(orderId, discountRate = 0.1) {
        this.orderId = orderId;
        this.discountRate = discountRate;
        this.items = [];
    }

    addItem(product) {
        if (product.price > 0 && product.quantity > 0) {
            this.items.push(product);
        } else {
            console.error('Sản phẩm không hợp lệ!')
        }
    }

    getSubtotal() {
        return this.items.reduce((total, items) => total + (items.price * items.quantity), 0);
    }

    getDiscountAmount() {
        return this.getSubtotal() * this.discountRate;
    }

    getTaxAmount() {
        const taxAmount = this.getSubtotal() - this.getDiscountAmount();
        return taxAmount * 0.1;
    }

    getFinalTotal() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscountAmount();
        const tax = this.getTaxAmount();

        return subtotal - discount + tax;
    }
}

// Mảng chứa 3 sản phẩm lỗi để test tính hợp lệ (Validation)
const badProducts = [
    { name: "Chuột lỗi số lượng", price: 150000, quantity: 0 },   // Số lượng bằng 0
    { name: "Bàn phím lỗi giá", price: -500000, quantity: 1 },    // Giá bị âm
    { name: "Tai nghe siêu lỗi", price: -250000, quantity: -2 }    // Cả giá và số lượng đều âm
];

// Khởi tạo một đơn hàng mới sạch sẽ (Không giảm giá)
const testOrder = new Order("#TM_TEST", 0);

console.log("--- Bắt đầu thêm sản phẩm lỗi vào đơn hàng ---");

// Duyệt qua mảng sản phẩm lỗi và đưa vào đơn hàng
badProducts.forEach(product => {
    console.log(`Đang thêm: ${product.name}...`);
    testOrder.addItem(product);
});

console.log("\n--- Kiểm tra kết quả tính toán ---");
console.log("Số lượng sản phẩm thực tế trong đơn hàng:", testOrder.items.length);
console.log("Tổng tiền thanh toán cuối cùng:", testOrder.getFinalTotal(), "VND");

// // ==========================================
// // 1. KHỞI TẠO ĐƠN HÀNG VÀ THÊM SẢN PHẨM BAN ĐẦU
// // ==========================================
// console.log("--- KỊCH BẢN 1: Khởi tạo đơn hàng ban đầu (Giảm giá 10%) ---");

// // Khởi tạo đơn hàng với mức giảm giá 10% (0.1)
// const myOrder = new Order("#TM123", 0.1);

// // Gọi phương thức addItem để thêm sản phẩm
// myOrder.addItem({ name: "Chuột không dây", price: 200000, quantity: 2 });
// myOrder.addItem({ name: "Bàn phím cơ", price: 800000, quantity: 1 });

// // GỌI DUY NHẤT getFinalTotal() ĐỂ IN RA SỐ TIỀN CUỐI CÙNG
// // (Hàm này tự động kích hoạt chuỗi tính toán ngầm getSubtotal và getTaxAmount)
// console.log("Số tiền thanh toán cuối cùng:", myOrder.getFinalTotal(), "VND");
// // KỲ VỌNG: 1,188,000 VND


// // ==========================================
// // 2. THỬ NGHIỆM: THÊM SẢN PHẨM MỚI
// // ==========================================
// console.log("\n--- KỊCH BẢN 2: Khách hàng mua thêm Tai nghe (400,000 VND) ---");

// myOrder.addItem({ name: "Tai nghe Gaming", price: 400000, quantity: 1 });

// // Gọi lại phương thức xem đối tượng có tự cập nhật không
// console.log("Số tiền thanh toán sau khi thêm tai nghe:", myOrder.getFinalTotal(), "VND");
// // GIẢI THÍCH:
// // - Subtotal mới: 1,200,000 + 400,000 = 1,600,000 VND
// // - Giảm giá 10%: 160,000 VND -> Còn lại: 1,440,000 VND
// // - Thuế VAT 10%: 144,000 VND
// // KỲ VỌNG: 1,440,000 + 144,000 = 1,584,000 VND


// // ==========================================
// // 3. THỬ NGHIỆM: THAY ĐỔI MỨC GIẢM GIÁ (Tăng lên 20%)
// // ==========================================
// console.log("\n--- KỊCH BẢN 3: Áp dụng mã giảm giá VIP (Giảm 20%) ---");

// // Thay đổi trực tiếp thuộc tính discountRate của đối tượng
// myOrder.discountRate = 0.2;

// // Gọi lại phương thức để kiểm tra tính linh hoạt
// console.log("Số tiền thanh toán sau khi tăng giảm giá lên 20%:", myOrder.getFinalTotal(), "VND");
// // GIẢI THÍCH:
// // - Subtotal vẫn là: 1,600,000 VND
// // - Giảm giá 20%: 320,000 VND -> Còn lại: 1,280,000 VND
// // - Thuế VAT 10%: 128,000 VND
// // KỲ VỌNG: 1,280,000 + 128,000 = 1,408,000 VND


// // ==========================================
// // 4. THỬ NGHIỆM: BỚT SẢN PHẨM (Xóa sản phẩm)
// // ==========================================
// console.log("\n--- KỊCH BẢN 4: Khách hủy không mua Chuột không dây nữa ---");

// // Vì items là mảng nội bộ, ta có thể lọc bỏ "Chuột không dây" ra khỏi danh sách
// myOrder.items = myOrder.items.filter(item => item.name !== "Chuột không dây");

// // Gọi lại phương thức để xem kết quả cuối cùng sau khi bớt hàng
// console.log("Số tiền thanh toán cuối cùng sau khi bỏ Chuột:", myOrder.getFinalTotal(), "VND");
// // GIẢI THÍCH:
// // - Danh sách còn: Bàn phím (800k) + Tai nghe (400k) -> Subtotal = 1,200,000 VND
// // - Giảm giá 20%: 240,000 VND -> Còn lại: 960,000 VND
// // - Thuế VAT 10%: 96,000 VND
// // KỲ VỌNG: 960,000 + 96,000 = 1,056,000 VND