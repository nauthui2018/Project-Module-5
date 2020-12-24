package com.shopnow.model.admin;

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

    private String hotline;
    private String email;
    private String address;
    private String slogan;
    private String description_slogan;
    private String about_us;
    private String background1="/admin/images/picture_default.png";
    private String background2="/admin/images/picture_default.png";
    private String background3="/admin/images/picture_default.png";
    private String logo1="/admin/images/picture_default.png";
    private String logo2="/admin/images/picture_default.png";
    private boolean deleted=false;

}
