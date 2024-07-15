package com.company.details.service;

import com.company.details.dto.SearchRequestDto;
import com.company.details.entity.Company;
import com.company.details.repository.SpecificationRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FiltersSpecification<T> {
    @Autowired
    private SpecificationRepository specificationRepository;

//    ----> written for single specification
//    public Specification<T> getSearchSpecification(SearchRequestDto searchRequestDto) {
//      return new Specification<T>() {
//            @Override
//            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
//                return cb.equal(root.get(searchRequestDto.getColumn()), searchRequestDto.getValue());
//            }
//        };
//    }

    public Specification<T> getSearchSpecification(List<SearchRequestDto> searchRequestDtos) {
        return (root, query, cb) -> {
        try {
            List<Predicate> predicates = new ArrayList<>();
            for( SearchRequestDto requestDto : searchRequestDtos) {
                Predicate equal = cb.equal(root.get(requestDto.getColumn()), requestDto.getValue());
                predicates.add(equal);
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        } catch (Exception e) {
            // If an exception occurs, log the error for debugging purposes
            e.printStackTrace();

            // Throw a runtime exception with a descriptive message
            throw new RuntimeException("Error creating search specification");
        }
        };
    }

}
