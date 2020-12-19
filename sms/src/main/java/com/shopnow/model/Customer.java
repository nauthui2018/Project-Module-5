package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "customers")
@Data
@Where(clause = "deleted=false")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customer_fullName;
    private String customer_phone;
    private String customer_email;
    private String customer_address;
    private String gender;
    private boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "customer_group_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CustomerGroup customer_group;

    @ManyToOne
    @JoinColumn(name = "province_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Province province;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private Set<Invoice> invoices;
}
