package com.company.details.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

    @Getter
    @Setter
    @Entity
    public class Site {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long siteId;

        @Column(unique = true)
        private String siteName;
        private String type;
        private String certified;

        private Date certifiedDate;

        private String watch;
        private String status;

        @JsonBackReference
        @ManyToOne
        @JoinColumn(name = "companyId")
        private Company company;

}
