package com.example.include.postagem;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostagemRepository extends JpaRepository<Postagem, Long> {
    Optional<Postagem> findById(Long id);
}