package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "invoiceDetails")
@Data
@Where(clause = "deleted=false")
public class InvoiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;
    private Long retail_price;

    private Long amount;

    @ManyToOne
    @JoinColumn(name="invoice_id")
    private Invoice invoice;

    private boolean deleted=false;
}
