package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "order_details")
@Data
@Where(clause = "deleted = false")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long prime_cost;
    private int order_quantity;
    private int stock = 0;
    private int scrap = 0;
    private boolean deleted = false;
    private boolean finished = false;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime finished_date;

    private String remark;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Warehouse warehouse;
}
