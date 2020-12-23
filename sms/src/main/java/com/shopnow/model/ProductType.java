package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Table(name = "product_types")
@Data
@Where(clause = "deleted=false")
public class ProductType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime creating_date;

    private Long wholesale_quantity;
    private boolean deleted = false;

    @OneToMany(mappedBy = "product_type")
    @JsonIgnore
    private Set<Product> products;
}
