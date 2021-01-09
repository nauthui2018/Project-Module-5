package com.shopnow.model;

import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table (name = "webinfos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted=false")
public class WebInfo {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "Bigserial")
    private Long id;

    private String hotline="19006868";
    private String email="shopnow@codegym.vn";
    private String address="28 Nguyễn Tri Phương, Tp Huế";
    private String slogan="Doanh nghiệp số hóa";
    private String description_slogan="Công cụ quản lý doanh số, bán hàng tốt nhất hiện nay";

    private String background1="/fe/ui/assets/images/slider/1.png";
    private String background2="/fe/ui/assets/images/slider/2.png";
    private String background3="/fe/ui/assets/images/slider/3.png";
    private String logo1="/fe/ui/assets/images/logo.svg";
    private String logo2="/fe/ui/assets/images/logo-2.svg";
    private boolean deleted=false;

    private String about_us="<div class=\"function\"\n" +
            "   style=\"padding: 120px 0px 45px; text-align: center; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; position: relative; margin-top: -100px; margin-bottom: 100px;\"\n" +
            "   helvetica=\"\" neue\",=\"\" helvetica,=\"\" arial,=\"\" sans-serif;=\"\" font-size:=\"\" 20.8px;\"=\"\">\n" +
            "   <div class=\"container\" style=\"width: 1170px; padding-right: 15px; padding-left: 15px; max-width: 1170px;\">\n" +
            "      <div class=\"tabpanel d-none d-sm-block\" style=\"\">\n" +
            "         <div id=\"tabcontent-1\" class=\"tab-content active one\" style=\"\">\n" +
            "            <div class=\"row\" style=\"margin-right: -15px; margin-left: -15px;\">\n" +
            "               <div class=\"col-lg-6 block-content\"\n" +
            "                  style=\"width: 585px; padding-right: 50px; padding-left: 15px; text-align: left;\">\n" +
            "                  <h3 style=\"margin-top: 10px; margin-bottom: 30px; font-weight: bold; font-size: 20px;\">\n" +
            "                     <font color=\"#0000ff\" style=\"background-color: rgb(255, 255, 255);\">Kiểm soát chính xác số\n" +
            "                        lượng mặt hàng trong kho</font>\n" +
            "                  </h3>\n" +
            "                  <ul style=\"color: rgb(66, 70, 78); margin-bottom: 35px; padding-left: 0px;\">\n" +
            "                     <li style=\"list-style: none; font-size: 16px; position: relative; background: url(\" themes=\"\"\n" +
            "                        portal=\"\" default=\"\" stylesv2=\"\" images=\"\" function=\"\" sellatstore=\"\" checked.png?v=\"1\" )\"=\"\"\n" +
            "                        no-repeat;=\"\" padding-left:=\"\" 30px;=\"\" margin-bottom:=\"\" text-align:=\"\" justify;\"=\"\">Biết ngay\n" +
            "                        sản phẩm nào còn hay hết vì hàng hóa trong kho\n" +
            "                        được quản lý chi tiết từng mẫu mã theo màu sắc, kích thước, chất liệu...</li>\n" +
            "                     <li style=\"list-style: none; font-size: 16px; position: relative; background: url(\" themes=\"\"\n" +
            "                        portal=\"\" default=\"\" stylesv2=\"\" images=\"\" function=\"\" sellatstore=\"\" checked.png?v=\"1\" )\"=\"\"\n" +
            "                        no-repeat;=\"\" padding-left:=\"\" 30px;=\"\" margin-bottom:=\"\" text-align:=\"\" justify;\"=\"\">Mỗi khi có\n" +
            "                        giao dịch phát sinh, số lượng sản phẩm sẽ được tự\n" +
            "                        động cộng/trừ trên <a href=\"https://www.sapo.vn/phan-mem-quan-ly-kho.html\">phần mềm\n" +
            "                           quản lý kho</a>, giúp kiểm soát chính xác hàng hóa trong kho</li>\n" +
            "                     <li style=\"list-style: none; font-size: 16px; position: relative; background: url(\" themes=\"\"\n" +
            "                        portal=\"\" default=\"\" stylesv2=\"\" images=\"\" function=\"\" sellatstore=\"\" checked.png?v=\"1\" )\"=\"\"\n" +
            "                        no-repeat;=\"\" padding-left:=\"\" 30px;=\"\" margin-bottom:=\"\" text-align:=\"\" justify;\"=\"\">Dễ dàng\n" +
            "                        biết được mặt hàng nào sắp hết hay tồn kho quá lâu\n" +
            "                        để bạn có kế hoạch nhập hàng hoặc xả hàng kịp thời</li>\n" +
            "                  </ul>\n" +
            "                  <div class=\"reviews\"\n" +
            "                     style=\"color: rgb(66, 70, 78); position: relative; display: flex; align-items: flex-start; padding-left: 23px;\">\n" +
            "                     <img\n" +
            "                        src=\"https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/function/sellatstore/reviews-tab-1.png?v=1\"\n" +
            "                        data-src=\"/Themes/Portal/Default/StylesV2/images/function/sellatstore/reviews-tab-1.png?v=1\"\n" +
            "                        alt=\"Khách hàng\" class=\"fade show\">\n" +
            "                     <div style=\"padding-left: 15px;\">\n" +
            "                        <p style=\"margin-bottom: 0px; font-size: 14px; color: rgb(34, 89, 173); font-style: italic;\">\n" +
            "                           Khi dùng phần mềm bán lẻ Shop Now, tôi theo dõi được đầu vào, đầu ra, thông tin sản\n" +
            "                           phẩm từ nhà cung cấp như số lượng, màu sắc, tồn kho thực tế</p><b\n" +
            "                           style=\"font-weight: bold; font-size: 14px; text-transform: uppercase;\">ANH VIỆT\n" +
            "                           ANH <span style=\"font-weight: 400; text-transform: initial;\">- Chủ cửa hàng xe\n" +
            "                              điện Lan Anh</span></b>\n" +
            "                     </div>\n" +
            "                  </div>\n" +
            "               </div>\n" +
            "               <div class=\"col-lg-6 block-img\"\n" +
            "                  style=\"color: rgb(66, 70, 78); width: 585px; padding-right: 15px; padding-left: 15px;\"><img\n" +
            "                     src=\"https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/function/sellatstore/img-tab-1-2.png?v=1\"\n" +
            "                     data-src=\"/Themes/Portal/Default/StylesV2/images/function/sellatstore/img-tab-1-2.png?v=1\"\n" +
            "                     alt=\"Phần mềm quản lý kho\" class=\"fade show\" style=\"margin-right: -50px;\"></div>\n" +
            "            </div>\n" +
            "         </div>\n" +
            "      </div><a data-href=\".title-feature\" class=\"scroll-down\"\n" +
            "         style=\"color: rgb(0, 123, 255); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; position: absolute; left: 674.5px; animation: 2s ease 0s infinite normal none running bounce; width: auto; height: unset; display: block; border-radius: 50%; bottom: 0px; transform: translateX(-50%); cursor: pointer; z-index: 9;\"><span\n" +
            "            class=\"ti-arrow-down\" aria-hidden=\"true\"\n" +
            "            style=\"font-family: themify; speak: none; font-variant-numeric: normal; font-variant-east-asian: normal; line-height: 1; -webkit-font-smoothing: antialiased; animation: 2s ease 0s infinite normal none running bounce; display: block;\"></span></a>\n" +
            "   </div>\n" +
            "</div>\n" +
            "<br>\n" +
            "<div class=\"col-lg-6 block-content\" style=\"width: 585px; padding-right: 50px; padding-left: 15px;\" helvetica=\"\"\n" +
            "   neue\",=\"\" helvetica,=\"\" arial,=\"\" sans-serif;=\"\" font-size:=\"\" 20.8px;\"=\"\">\n" +
            "   <h3\n" +
            "      style=\"box-sizing: border-box; margin-top: 10px; margin-bottom: 30px; font-family: inherit; font-weight: bold; line-height: 1.2; font-size: 20px;\">\n" +
            "      <font color=\"#0000ff\" style=\"background-color: rgb(255, 255, 255);\">Dễ dàng theo dõi báo cáo doanh thu, lãi lỗ\n" +
            "         chi tiết mọi lúc mọi nơi</font>\n" +
            "   </h3>\n" +
            "   <h3 style=\"margin-top: 10px; margin-bottom: 30px; font-weight: bold; font-size: 20px;\">\n" +
            "      <div class=\"function\"\n" +
            "         style=\"padding: 120px 0px 45px; text-align: center; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; position: relative; margin-top: -100px; margin-bottom: 100px; font-size: 20.8px; font-weight: 400;\">\n" +
            "         <div class=\"container\" style=\"width: 1170px; padding-right: 15px; padding-left: 15px; max-width: 1170px;\">\n" +
            "            <div class=\"tabpanel d-none d-sm-block\" style=\"\">\n" +
            "               <div id=\"tabcontent-4\" class=\"tab-content four active\" style=\"\">\n" +
            "                  <div class=\"row\" style=\"margin-right: -15px; margin-left: -15px;\">\n" +
            "                     <div class=\"col-lg-6 block-content\"\n" +
            "                        style=\"width: 585px; padding-right: 50px; padding-left: 15px; text-align: left;\">\n" +
            "                        <ul style=\"margin-bottom: 35px; padding-left: 0px;\">\n" +
            "                           <li style=\"list-style: none; font-size: 16px; position: relative; background-image: url(\"\"); background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\"\n" +
            "                              themes=\"\" portal=\"\" default=\"\" stylesv2=\"\" images=\"\" function=\"\" sellatstore=\"\"\n" +
            "                              checked-four.png?v=\"1\")\" 0px=\"\" center=\"\" no-repeat;=\"\" padding-left:=\"\" 30px;=\"\"\n" +
            "                              margin-bottom:=\"\" text-align:=\"\" justify;\"=\"\">\n" +
            "                              <font style=\"background-color: rgb(255, 255, 255);\" color=\"#424242\">Hệ thống báo\n" +
            "                                 cáo được thể h</font>\n" +
            "                              <font color=\"#42464e\" style=\"background-color: initial;\">iện dưới dạng biểu đồ\n" +
            "                                 trực quan dễ hiểu giúp chủ shop theo dõi doanh thu, lợi nhuận tức thì của\n" +
            "                                 cửa hàng</font>\n" +
            "                           </li>\n" +
            "                           <li style=\"color: rgb(66, 70, 78); list-style: none; font-size: 16px; position: relative; background: url(\"\");\"\n" +
            "                              themes=\"\" portal=\"\" default=\"\" stylesv2=\"\" images=\"\" function=\"\" sellatstore=\"\"\n" +
            "                              checked-four.png?v=\"1\")\" 0px=\"\" center=\"\" no-repeat;=\"\" padding-left:=\"\" 30px;=\"\"\n" +
            "                              margin-bottom:=\"\" text-align:=\"\" justify;\"=\"\">Quản lý sổ quỹ, công nợ\n" +
            "                              của khách hàng, nhà cung cấp, dòng tiền vào ra chính xác trên phần mềm quản lý\n" +
            "                              cửa hàng</li>\n" +
            "                           <li style=\"color: rgb(66, 70, 78); list-style: none; font-size: 16px; position: relative; background: url(\"\");\"\n" +
            "                              themes=\"\" portal=\"\" default=\"\" stylesv2=\"\" images=\"\" function=\"\" sellatstore=\"\"\n" +
            "                              checked-four.png?v=\"1\")\" 0px=\"\" center=\"\" no-repeat;=\"\" padding-left:=\"\" 30px;=\"\"\n" +
            "                              margin-bottom:=\"\" text-align:=\"\" justify;\"=\"\">So sánh hiệu quả kinh\n" +
            "                              doanh theo sản phẩm, thời gian, kênh bán hàng, từ đó có chiến lược kinh doanh\n" +
            "                              phù hợp</li>\n" +
            "                        </ul>\n" +
            "                        <div class=\"reviews\"\n" +
            "                           style=\"color: rgb(66, 70, 78); position: relative; display: flex; align-items: flex-start; padding-left: 23px;\">\n" +
            "                           <img\n" +
            "                              src=\"https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/function/sellatstore/reviews-tab-4.png?v=1\"\n" +
            "                              data-src=\"/Themes/Portal/Default/StylesV2/images/function/sellatstore/reviews-tab-4.png?v=1\"\n" +
            "                              alt=\"Khách hàng\" class=\"fade show\">\n" +
            "                           <div style=\"padding-left: 15px;\">\n" +
            "                              <p\n" +
            "                                 style=\"margin-bottom: 0px; font-size: 14px; color: rgb(96, 115, 230); font-style: italic;\">\n" +
            "                                 Shop Now rất tuyệt vời. Nó hỗ trợ cho tôi hầu hết công việc mà trước đây tôi\n" +
            "                                 phải tự thống kê làm việc.</p><b\n" +
            "                                 style=\"font-weight: bold; font-size: 14px; text-transform: uppercase;\">CHỊ\n" +
            "                                 THỦY <span style=\"font-weight: 400; text-transform: initial;\">- Giám\n" +
            "                                    đốc thương hiệu Viethands</span></b>\n" +
            "                           </div>\n" +
            "                        </div>\n" +
            "                     </div>\n" +
            "                     <div class=\"col-lg-6 block-img\"\n" +
            "                        style=\"color: rgb(66, 70, 78); width: 585px; padding-right: 15px; padding-left: 15px;\">\n" +
            "                        <img\n" +
            "                           src=\"https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/function/sellatstore/phan-mem-quan-ly-cua-hang-ban-le-2.png?v=1\"\n" +
            "                           data-src=\"/Themes/Portal/Default/StylesV2/images/function/sellatstore/phan-mem-quan-ly-cua-hang-ban-le-2.png?v=1\"\n" +
            "                           alt=\"phần mềm quản lý cửa hàng bán lẻ\" class=\"fade show\" style=\"margin-right: -50px;\"></div>\n" +
            "                  </div>\n" +
            "               </div>\n" +
            "            </div>\n" +
            "         </div>\n" +
            "      </div>\n" +
            "   </h3>\n" +
            "</div>";
}
