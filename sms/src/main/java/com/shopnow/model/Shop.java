package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "shops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted=false")
public class Shop{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String phone;
    private String email;
    private String address;
    private String shop_name;
    private String logo = "/admin/images/default/default-image.jpg";

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime created_at;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime updated_at;

    @OneToMany(mappedBy = "shop")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "province_id")
    private Province province;

    @ManyToOne
    @JoinColumn(name = "line_of_business_id")
    private LineOfBusiness lineOfBusiness;

    private boolean deleted=false;
}
