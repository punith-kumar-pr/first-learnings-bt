package com.company.details.controller;

import com.company.details.dto.RequestDto;
import com.company.details.entity.Company;
import com.company.details.repository.SpecificationRepository;
import com.company.details.service.FiltersSpecification;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/companies")
//@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class CompanyController {

    @Autowired
    private SpecificationRepository specificationRepository;
    @Autowired
    private FiltersSpecification<Company> companyFiltersSpecification;


    @GetMapping
    private String run(){
        return "Hello";
    }

   /* @PostMapping("/specification")
    public List<Company> getCompanies() {
        Specification<Company> specification = new Specification<Company>() {
            @Override
            public Predicate toPredicate(Root<Company> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.equal(root.get("status"), "active");
            }
        };

        List<Company> all = companyRepository.findAll(specification);
        return all;
    }*/

    @PostMapping("/specification")
    public List<Company> getCompanies(@RequestBody RequestDto requestDto) throws Exception {
        try {

            if (requestDto == null || requestDto.getSearchRequestDto() == null) {
                // Handle null input, log the issue, and return an appropriate response
                throw new IllegalArgumentException("Invalid input: RequestDto or SearchRequestDto is null");
            }

            Specification<Company> searchSpecification = companyFiltersSpecification.getSearchSpecification(requestDto.getSearchRequestDto());
            return specificationRepository.findAll(searchSpecification);
        } catch (Exception e) {
            // If an exception occurs, log the error for debugging purposes
            e.printStackTrace();
            throw new RuntimeException(e);


        }
    }

}
