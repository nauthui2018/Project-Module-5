package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "stock_check_details")
@Data
@Where(clause = "deleted = false")
public class StockCheckDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean deleted = false;
    private int stock;
    private int actual_quantity;
    private int scrap;

    @ManyToOne
    @JoinColumn(name = "stock_check_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private StockCheck stock_check;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;
}
