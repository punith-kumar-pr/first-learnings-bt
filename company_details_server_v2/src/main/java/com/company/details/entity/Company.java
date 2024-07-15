package com.company.details.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

    @Getter
    @Setter
    @Entity
    public class Company {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long companyId;

        @Column(unique = true)
        private String companyCode;

        @Column(unique = true)
        private String companyName;

        @Column(unique = true)
        private Long legalEntityId;

        private String status;
        private String notes;

        @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
        private List<Site> sites;
}
