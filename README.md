# Novela Releases

Kho lưu trữ phát hành chính thức cho ứng dụng Novela trên nền tảng Android.

---

## Liên kết chính thức

- Trang chủ: [hongtrantiende.github.io/novela-app](https://hongtrantiende.github.io/novela-app/)
- Tải xuống APK: [hongtrantiende.github.io/novela-app/download.html](https://hongtrantiende.github.io/novela-app/download.html)
- Danh sách phát hành GitHub: [github.com/hongtrantiende/Novela-Releases/releases](https://github.com/hongtrantiende/Novela-Releases/releases)

---

## Giới thiệu

Novela là trình đọc sách mã nguồn mở hiệu năng cao dành cho hệ điều hành Android, được phát triển trên ngôn ngữ thiết kế Material 3 Expressive hiện đại. Ứng dụng cung cấp giải pháp đọc sách toàn diện, hỗ trợ các định dạng tệp cục bộ (TXT, EPUB, MOBI) cùng hệ thống nguồn sách tùy biến linh hoạt, đọc thành tiếng (TTS), đồng bộ WebDAV và cơ chế cập nhật tự động bên trong ứng dụng.

---

## Lựa chọn phiên bản APK

Các bản phát hành chính thức được biên dịch, tối ưu hóa kích thước qua R8/ProGuard và ký số bảo mật. Vui lòng chọn gói cài đặt phù hợp với kiến trúc vi xử lý của thiết bị:

| Kiến trúc | Tên tệp mẫu | Thiết bị áp dụng | Ghi chú |
| :--- | :--- | :--- | :--- |
| **ARM64** | `Novela-<version>-arm64-v8a.apk` | Android 64-bit | Khuyên dùng cho hầu hết các điện thoại và máy tính bảng hiện nay. Tối ưu kích thước tệp và hiệu năng khởi chạy. |
| **ARMv7a** | `Novela-<version>-armeabi-v7a.apk` | Android 32-bit | Dành riêng cho các thiết bị đời cũ hoặc hệ máy chạy hệ điều hành 32-bit. |
| **Universal** | `Novela-<version>-universal.apk` | Toàn bộ kiến trúc | Tương thích với tất cả kiến trúc chip (bao gồm x86_64). Dung lượng tệp lớn hơn do tích hợp đa thư viện native. |

Để tải bản phát hành mới nhất, truy cập [Releases mới nhất](https://github.com/hongtrantiende/Novela-Releases/releases/latest).

---

## Hướng dẫn cài đặt

1. Truy cập mục [Releases](https://github.com/hongtrantiende/Novela-Releases/releases/latest) và tải tệp APK tương ứng với thiết bị.
2. Mở tệp vừa tải về. Nếu hệ điều hành Android xuất hiện hộp thoại cảnh báo bảo mật, chọn "Cài đặt" và cho phép "Cài đặt ứng dụng không rõ nguồn gốc" đối với trình duyệt hoặc trình quản lý tệp đang dùng.
3. Hoàn tất cài đặt và khởi chạy Novela. Các bản cập nhật trong tương lai có thể được kiểm tra và cài đặt trực tiếp ngay trong ứng dụng (Cài đặt -> Giới thiệu -> Kiểm tra cập nhật).

---

## Đặc tính cốt lõi

### Giao diện Material 3 Expressive
- Bảng màu thích ứng Dynamic Color theo màu nền hệ thống Android hoặc tùy chỉnh Seed Color.
- Tối ưu hóa cho các điều kiện đọc: Chế độ sáng (Light), chế độ tối tuyệt đối (OLED Dark Mode) và chế độ E-Ink dành riêng cho màn hình mực điện tử.
- Bố cục Edge-to-Edge liền mạch, thanh điều hướng mờ và hoạt ảnh chuyển trang tự nhiên.

### Động cơ nguồn sách & Đa định dạng
- Mở và quản lý trực tiếp các định dạng sách ngoại tuyến: TXT, EPUB, MOBI.
- Tương thích với các bộ quy tắc nguồn sách dạng JSON từ Legado và VBook Extensions.
- Phân tích cú pháp linh hoạt với Rhino JavaScript Engine, XPath, Jsoup và biểu thức chính quy (Regex).

### Trải nghiệm đọc & Đọc thành tiếng (TTS)
- Tùy chỉnh chi tiết kiểu chữ, kích thước, khoảng cách dòng, độ thụt dòng và căn lề.
- Đa dạng hiệu ứng chuyển trang: Mô phỏng trang sách thực, cuộn dọc liên tục, trượt ngang.
- Tích hợp công cụ Text-To-Speech (TTS) của hệ thống hoặc dịch vụ trực tuyến với hẹn giờ và tự động dừng khi có cuộc gọi.

### Đồng bộ & Ngoại tuyến
- Quản lý tủ sách ngoại tuyến với cơ chế tải dữ liệu nền.
- Sao lưu và phục hồi dữ liệu hoàn chỉnh qua dịch vụ đám mây WebDAV hoặc xuất tệp dự phòng cục bộ.
- Tự động kiểm tra phiên bản mới và cập nhật trực tiếp với thanh tiến độ thời gian thực.

---

## Quyền riêng tư & Tuyên bố pháp lý

- **Không máy chủ lưu trữ nội dung**: Novela hoạt động như một trình duyệt và trình phân tích nội dung số cục bộ trên thiết bị của người dùng. Nhà phát triển không lưu trữ, quản lý hay phân phối bất kỳ nội dung sách hoặc tài liệu có bản quyền nào.
- **Quyền riêng tư tuyệt đối**: Ứng dụng không yêu cầu đăng ký tài khoản, không thu thập lịch sử đọc, dấu trang hay danh sách nguồn sách của người dùng.
- **Mã nguồn mở**: Dự án được xây dựng trên nền tảng mã nguồn mở, tuân thủ các quy định cấp phép của Legado with Material Design 3.
