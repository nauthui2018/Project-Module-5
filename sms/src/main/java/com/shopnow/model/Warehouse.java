package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "warehouses")
@Data
@Where(clause = "deleted=false")
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int product_quantity;
    private int coming_quantity = 0;
    private int delivered_quantity = 0;
    private int scrap_quantity = 0;
    private boolean deleted = false;
    private String stock_check;

    @OneToMany(mappedBy = "warehouse")
    @JsonIgnore
    private Set<Product> products;
}
