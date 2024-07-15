package com.company.details.repository;

import com.company.details.entity.Company;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface SpecificationRepository extends CrudRepository<Company,Long>, JpaSpecificationExecutor<Company>{

}
