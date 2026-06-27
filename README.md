# Novela-Releases
# 📖 Novela - Trình Đọc Sách & Nội Dung Số Đa Nguồn

Novela là một ứng dụng đọc sách và quản lý nội dung số hiệu năng cao dành cho hệ điều hành Android. Ứng dụng được xây dựng và tối ưu hóa dựa trên lõi đọc mã nguồn mở mạnh mẽ **Legado**, tích hợp phong cách thiết kế giao diện hiện đại Material Design 3, mang lại trải nghiệm đọc sách mượt mà, trực quan và tối ưu nhất cho người dùng.

---

## ⚡ Tính Năng Nổi Bật

### 🌐 1. Hệ Thống Nguồn Sách Tự Cấu Hình (Custom Book Sources)
* **Khả năng tương thích cực cao**: Hỗ trợ đầy đủ các quy tắc phân tích cú pháp nguồn sách của Legado và các tiện ích mở rộng VBook.
* **Nhập nguồn thông minh**: Nhập nguồn sách nhanh chóng qua mã QR, đường dẫn URL (nhập trực tuyến), hoặc nhập file JSON từ thiết bị.
* **Tự do tùy biến**: Cho phép người dùng tự chỉnh sửa, gộp nguồn tìm kiếm và kiểm tra trạng thái hoạt động của nguồn sách ngay trong ứng dụng.

### 📚 2. Trình Đọc Cao Cấp & Cá Nhân Hóa (Advanced Reader Engine)
* **Bố cục & Định dạng chuyên nghiệp**: Tùy chỉnh linh hoạt phông chữ (hỗ trợ thêm phông chữ ngoài), kích thước chữ, giãn dòng, lề trang, thụt dòng đầu dòng.
* **Hiệu ứng lật trang đa dạng**: Hỗ trợ hiệu ứng cuộn, trượt, mô phỏng lật trang giấy hoặc tắt hiệu ứng lật trang để tối ưu hiệu năng.
* **Chế độ màn hình chuyên dụng**:
  * **Chế độ Tối (Dark Mode)**: Tự động chuyển đổi theo giao diện hệ thống giúp bảo vệ mắt vào ban đêm.
  * **Chế độ E-Ink**: Tối ưu hóa giao diện phẳng, loại bỏ hiệu ứng chuyển động để tiết kiệm pin và mang lại trải nghiệm tốt nhất trên các thiết bị màn hình giấy điện tử.

### 🔊 3. Đọc Thành Tiếng (TTS - Text-To-Speech)
* Hỗ trợ đọc văn bản thành tiếng qua các công cụ TTS trên máy hoặc dịch vụ đọc trực tuyến.
* Tính năng hẹn giờ tắt, tăng/giảm tốc độ đọc linh hoạt.
* Tự động tạm dừng phát âm thanh khi có cuộc gọi đến và tiếp tục sau khi cuộc gọi kết thúc.

### 🔄 4. Đồng Bộ Hóa Đám Mây (Cloud Sync & WebDAV)
* Hỗ trợ đồng bộ hóa tủ sách, dấu trang, lịch sử đọc và cấu hình nguồn sách lên các dịch vụ lưu trữ cá nhân thông qua giao thức **WebDAV**.
* Sao lưu dữ liệu tự động hoặc thủ công ra bộ nhớ cục bộ để khôi phục bất cứ lúc nào.

### 🚀 5. Tự Động Cập Nhật Tiện Lợi (In-App Auto Update)
* Ứng dụng tích hợp trình kiểm tra cập nhật tự động mỗi khi khởi động.
* Phát hiện phiên bản mới nhất từ kho lưu trữ này và hỗ trợ tải xuống, cài đặt cập nhật trực tiếp bên trong ứng dụng mà không cần cài đặt lại thủ công.

---

## 🛠️ Cơ Chế Hoạt Động

Novela hoạt động như một **Trình duyệt nội dung số chuyên dụng** (tương tự trình duyệt web Chrome hoặc Firefox):
1. Ứng dụng ở trạng thái mặc định **hoàn toàn trống**, không tích hợp sẵn bất kỳ tác phẩm, tài liệu hay kho truyện nào.
2. Người dùng chủ động cung cấp nội dung đọc bằng cách nhập các quy tắc phân tích cú pháp (Nguồn sách) hoặc mở các tệp tài liệu cục bộ (EPUB, TXT, PDF, MOBI, v.v.).
3. Ứng dụng sẽ tải nội dung từ các trang web do người dùng chỉ định, tiến hành lọc quảng cáo, chuẩn hóa định dạng văn bản và trình bày lên màn hình đọc sách một cách đẹp mắt nhất.

---

## ⚖️ Tuyên Bố Pháp Lý & Bản Quyền (Disclaimer)

* **Không có máy chủ trung tâm**: Novela là ứng dụng hoạt động hoàn toàn ở môi trường cục bộ trên thiết bị của người dùng. Chúng tôi không vận hành bất kỳ máy chủ chứa nội dung truyện nào.
* **Không thu thập dữ liệu cá nhân**: Ứng dụng không thu thập, lưu trữ hay chia sẻ thông tin cá nhân, lịch sử đọc sách hoặc danh sách nguồn sách của bạn. Chúng tôi chỉ tích hợp Google Firebase ẩn danh để ghi nhận các báo cáo lỗi hệ thống nhằm mục đích cải thiện hiệu năng ứng dụng.
* **Miễn trừ trách nhiệm về bản quyền**:
  * Mọi tài nguyên truyện, bài viết và thông tin hiển thị trong ứng dụng đều được truy xuất trực tiếp từ các liên kết web do người dùng tự nhập.
  * Nhà phát triển ứng dụng **không chịu bất kỳ trách nhiệm pháp lý nào** đối với tính hợp pháp, bản quyền hoặc độ chính xác của nội dung được tải thông qua các nguồn sách do người dùng tự thêm.
  * Mọi khiếu nại về bản quyền tác phẩm vui lòng liên hệ trực tiếp với chủ sở hữu trang web nguồn hoặc cá nhân thiết lập/cung cấp tệp nguồn sách đó.

---

## 📥 Hướng Dẫn Cài Đặt

1. Vào tab [Releases](https://github.com/hongtrantiende/Novela-Releases/releases) của kho lưu trữ này.
2. Tải về file APK phù hợp với thiết bị của bạn:
   * **`Novela-arm64-v8a-debug.apk`**: Dành cho các thiết bị Android 64-bit hiện đại (hầu hết điện thoại hiện nay).
   * **`Novela-universal-debug.apk`**: Bản vạn năng chạy được trên mọi kiến trúc chip.
3. Tiến hành cài đặt file APK trên điện thoại của bạn. 
   *(Lưu ý: Bạn cần cấp quyền "Cài đặt ứng dụng từ nguồn không xác định" nếu được hệ thống Android yêu cầu).*
