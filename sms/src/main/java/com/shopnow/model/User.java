package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@Where(clause = "deleted=false")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "Bigserial")
    private Long id;

    private String user_fullname;
    private String user_phone;
    private String user_address;
    private String user_gender;
    private String email;
    private String password;
    private String user_avatar="/admin/images/default/default-avatar.jpg";
    private String personal_code;

    @JsonFormat(pattern="dd/MM/yyyy")
    private ZonedDateTime dob;

    @JsonFormat(pattern="dd/MM/yyyy")
    private ZonedDateTime starting_date;

    private String role;
    private boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "shop_id")
    private Shop shop;

    @ManyToOne
    @JoinColumn(name = "province_id")
    private Province province;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<Invoice> invoices=new HashSet<>();
}
