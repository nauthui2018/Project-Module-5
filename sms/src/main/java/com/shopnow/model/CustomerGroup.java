package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "customer_groups")
@Data
@Where(clause = "deleted=false")
public class CustomerGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate creatingDate;
    private boolean deleted = false;

    @OneToMany(targetEntity = Customer.class)
    @JsonIgnore
    private Set<Customer> customers;
}
