package com.shopnow.model;

import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@Where(clause = "deleted=false")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "Bigserial")
    private Long id;

    private String user_fullname;
    private String user_phone;
    private String user_address;
    private String user_gender;
    private String user_email;
    private String password;
    private String user_avatar;
    private String personal_code;
    private LocalDate dob;
    private LocalDate starting_date;
    private String role;
    private boolean deleted = false;
}
