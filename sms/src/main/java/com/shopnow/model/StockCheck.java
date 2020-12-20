package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "stock_checks")
@Data

public class StockCheck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String checking_date;
    private int quantity_in_stock;
    private int actual_quantity;
    private int scrap_quantity;
    private boolean finished = false;
    private boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Warehouse warehouse;

    @OneToMany(mappedBy = "stock_check")
    @JsonIgnore
    private Set<Product> products;
}
