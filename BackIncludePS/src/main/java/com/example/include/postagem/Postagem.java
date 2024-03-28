package com.example.include.postagem;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "postagem")
@Entity(name = "postagem")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Postagem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String descricao;
    private String image;

    public Postagem(PostagemRequestDTO data){
        this.image = data.image();
        this.descricao = data.descricao();
        this.title = data.title();
    }

}
