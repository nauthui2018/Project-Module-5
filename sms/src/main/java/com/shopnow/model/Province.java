package com.shopnow.model;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;


@Entity
@Table(name = "provinces")
@Data
@Where(clause = "deleted=false")
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private boolean deleted=false;
}
