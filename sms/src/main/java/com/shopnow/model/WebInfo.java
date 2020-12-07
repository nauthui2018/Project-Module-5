package com.shopnow.model;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table (name = "webinfos")
@Data
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
    private String service;
    private String about_us;
    private String background;
    private String logo;
    private boolean deleted=false;

}
