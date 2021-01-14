package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "enable=true")
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
    private String password="Pa$$w0rd!";
    private String user_avatar="/admin/images/default/default-avatar.jpg";
    private String personal_code;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime starting_date=ZonedDateTime.now();

    private String role;
    private boolean enable = true;

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
