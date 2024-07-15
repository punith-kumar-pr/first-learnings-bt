package com.company.details;

import com.company.details.controller.CompanyController;
import com.company.details.dto.RequestDto;
import com.company.details.dto.SearchRequestDto;
import com.company.details.entity.Company;
import com.company.details.repository.SpecificationRepository;
import com.company.details.service.FiltersSpecification;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class CompanyControllerTest {

    @Mock
    private SpecificationRepository specificationRepository;

    @Mock
    private FiltersSpecification<Company> companyFiltersSpecification;

    @InjectMocks
    private CompanyController companyController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetCompanies() throws Exception {
        // Create valid test data
        List<SearchRequestDto> searchRequestDtos = new ArrayList<>();
        searchRequestDtos.add(new SearchRequestDto("status", "active"));
        RequestDto requestDto = new RequestDto();
        requestDto.setSearchRequestDto(searchRequestDtos);

        // Mock dependencies and set up behavior
        List<Company> companies = new ArrayList<>();
        when(companyFiltersSpecification.getSearchSpecification(requestDto.getSearchRequestDto())).thenReturn(mock(Specification.class));
        when(specificationRepository.findAll(any(Specification.class))).thenReturn(companies);

        // Invoke the method under test
        List<Company> result = companyController.getCompanies(requestDto);

        // Verify the result
        assertEquals(companies, result);
        verify(companyFiltersSpecification).getSearchSpecification(requestDto.getSearchRequestDto());
        verify(specificationRepository).findAll(any(Specification.class));
    }


    @Test
    public void testSearchRequestDtoGetterAndSetter() {
        SearchRequestDto searchRequestDto = new SearchRequestDto();
        searchRequestDto.setColumn("status");
        searchRequestDto.setValue("active");

        assertEquals("status", searchRequestDto.getColumn());
        assertEquals("active", searchRequestDto.getValue());
    }

    @Test
    public void testRequestDtoGetterAndSetter() {
        RequestDto requestDto = new RequestDto();
        List<SearchRequestDto> searchRequestDtoList = new ArrayList<>();
        SearchRequestDto searchRequestDto = new SearchRequestDto();
        searchRequestDto.setColumn("status");
        searchRequestDto.setValue("active");
        searchRequestDtoList.add(searchRequestDto);
        requestDto.setSearchRequestDto(searchRequestDtoList);

        assertEquals(1, requestDto.getSearchRequestDto().size());
        assertEquals("status", requestDto.getSearchRequestDto().get(0).getColumn());
        assertEquals("active", requestDto.getSearchRequestDto().get(0).getValue());
    }

}

