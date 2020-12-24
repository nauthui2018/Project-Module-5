package com.shopnow.model.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shopnow.model.Customer;
import com.shopnow.model.admin.Shop;
import com.shopnow.model.admin.User;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "provinces")
@Data
@Where(clause = "deleted=false")
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private boolean deleted=false;

    @OneToMany(mappedBy = "province")
    @JsonIgnore
    private Set<User> user=new HashSet<>();

    @OneToMany(mappedBy = "province")
    @JsonIgnore
    private Set<Shop> shops = new HashSet<>();

    @OneToMany(mappedBy = "province")
    @JsonIgnore
    private Set<Customer> customers = new HashSet<>();
}
