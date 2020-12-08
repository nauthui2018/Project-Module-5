package com.shopnow.model;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "warehouses")
@Data
@Where(clause = "deleted=false")
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int product_quantity;
    private int coming_quantity;
    private int delivered_quantity;
    private int scrap_quantity;
    private boolean deleted = false;
    private LocalDate stock_check;

    @OneToOne
    @JoinColumn(name = "product_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;
}
