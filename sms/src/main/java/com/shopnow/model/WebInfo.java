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

    private String about_us;
}
