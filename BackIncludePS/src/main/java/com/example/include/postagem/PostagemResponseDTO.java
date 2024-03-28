package com.example.include.postagem;

public record PostagemResponseDTO(Long id, String title, String image, String descricao) {
    public PostagemResponseDTO(Postagem food){
        this(food.getId(), food.getTitle(), food.getImage(), food.getDescricao());
    }

}
