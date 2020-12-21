package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products")
@Data
@Where(clause = "deleted=false")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String product_name;
    private String brand;
    private String image="/admin/images/picture_default.png";
    private String unit;
    private int quantity;
    private String barcode;
    private String description;
    private Long retail_price;
    private Long wholesale_price;
    private Long prime_cost;

    @ManyToOne
    @JoinColumn(name = "productype_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductType productType;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Warehouse warehouse;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<OrderDetail> orderDetails = new HashSet<>();

    private LocalDate creating_date;
    private boolean deleted = false;
}
