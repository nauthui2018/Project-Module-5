package com.shopnow.model;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Data
@Table(name = "line_of_businesses")
@Where(clause = "deleted=false")
public class LineOfBusiness {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private boolean deleted=false;
}
