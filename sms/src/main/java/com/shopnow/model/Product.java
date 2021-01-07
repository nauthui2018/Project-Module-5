package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Table(name = "products")
@Data
@Where(clause = "deleted=false")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private String image = "/admin/images/picture_default.png";
    private String unit;
    private String barcode;
    private String description;
    private boolean deleted = false;

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime creating_date;

    @ManyToOne
    @JoinColumn(name = "product_type_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductType product_type;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Warehouse warehouse;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<OrderDetail> order_details;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<StockCheckDetail> stock_check_details;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<InvoiceDetail> invoice_details;
}
