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
@Table(name = "orders")
@Data
@Where(clause = "deleted=false")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float discount;
    private Long total_amount;
    private LocalDate ordered_date;
    private boolean finished = false;
    private boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Supplier supplier;

    @OneToMany(targetEntity = OrderDetail.class)
    @JsonIgnore
    private Set<OrderDetail> orderDetails;
}
