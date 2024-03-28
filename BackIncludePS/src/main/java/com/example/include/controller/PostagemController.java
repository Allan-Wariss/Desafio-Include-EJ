package com.example.include.controller;

import com.example.include.postagem.Postagem;
import com.example.include.postagem.PostagemRepository;
import com.example.include.postagem.PostagemRequestDTO;
import com.example.include.postagem.PostagemResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("postagem")
public class PostagemController {

    @Autowired
    private PostagemRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void savePostagem(@RequestBody PostagemRequestDTO data){
        Postagem postagemData = new Postagem(data);
        repository.save(postagemData);
        return;
    }

    @Transactional
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/update/{id}")
    public void updatePostagem(@RequestBody PostagemRequestDTO data, @PathVariable Long id){
        Optional<Postagem> optionalPostagem = repository.findById(id);
        if (optionalPostagem.isPresent()) {
            Postagem postagemData = optionalPostagem.get();
            BeanUtils.copyProperties(data,postagemData);
            repository.save(postagemData);
        }


        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<PostagemResponseDTO> getAll(){
        List<PostagemResponseDTO> postagemList = repository.findAll().stream().map(PostagemResponseDTO::new).toList();
        return postagemList;
    }
}
