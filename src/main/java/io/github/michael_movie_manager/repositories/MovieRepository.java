package io.github.michael_movie_manager.repositories;

import io.github.michael_movie_manager.models.Movie;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface MovieRepository extends CrudRepository<Movie, Long> {

    List<Movie> findAllByUsername(String username);

    Movie findOneByIdAndUsername(Long id, String username);

    @Transactional
    void deleteByIdAndUsername(Long id, String username);
}
