package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "productTypes")
@Data
@Where(clause = "deleted=false")
public class ProductType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate creatingDate;
    private Long wholesale_quantity;
    private boolean deleted = false;

    @OneToMany(targetEntity = Product.class)
    @JsonIgnore
    private Set<Product> products;
}
