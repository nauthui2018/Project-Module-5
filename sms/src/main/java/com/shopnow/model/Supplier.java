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

    private String supplier_name;
    private String supplier_phone;
    private String supplier_email;
    private String supplier_address;
    private boolean deleted = false;

    @OneToMany(targetEntity = Order.class)
    @JsonIgnore
    private Set<Order> orders;
}
