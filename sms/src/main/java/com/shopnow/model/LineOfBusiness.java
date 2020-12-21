package com.shopnow.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

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

    @JsonFormat(pattern="dd/MM/yyyy HH:mm:ss")
    private ZonedDateTime created_at = ZonedDateTime.now();

    @OneToMany(mappedBy = "lineOfBusiness")
    @JsonIgnore
    private Set<Shop> shops=new HashSet<>();
}
