package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "suppliers")
@Data
@Where(clause = "deleted=false")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;
    private String email;
    private String address;
    private boolean deleted = false;

    @OneToMany(mappedBy = "supplier")
    @JsonIgnore
    private Set<Order> orders;
}
