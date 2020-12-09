package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private LocalDate creating_date=LocalDate.now();

    private boolean deleted = false;

    @OneToMany(mappedBy = "customerGroup")
    @JsonIgnore
    private Set<Customer> customers;
}
