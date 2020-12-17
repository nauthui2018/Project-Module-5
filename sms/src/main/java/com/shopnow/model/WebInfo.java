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

    private String hotline;
    private String email;
    private String address;
    private String slogan;
    private String description_slogan;
    private String about_us;
    private String background1;
    private String background2;
    private String background3;
    private String logo1;
    private String logo2;
    private boolean deleted=false;

}
