package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "shops")
@Data
@Where(clause = "deleted=false")
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String phone;
    private String email;
    private String address;
    private String shop_name;
    private String logo;
    private boolean deleted=false;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDate created_at=LocalDate.now();

    @OneToOne(mappedBy= "shop")
    private User user;

    @ManyToOne
    @JoinColumn(name = "province_id", referencedColumnName = "id")
    private Province province;

    @ManyToOne
    @JoinColumn(name = "line_of_business_id", referencedColumnName = "id")
    private LineOfBusiness lineOfBusiness;

}
