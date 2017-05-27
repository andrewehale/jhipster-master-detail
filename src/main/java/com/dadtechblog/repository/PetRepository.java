package com.dadtechblog.repository;

import com.dadtechblog.domain.Pet;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Pet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PetRepository extends JpaRepository<Pet,Long> {

    List<Pet> findByOwnerId(Long Id);
}
