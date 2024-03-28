
// Ultimas noticias
document.addEventListener("DOMContentLoaded", function () {
    fetch('http://localhost:8080/postagem')
        .then(response => response.json())
        .then(data => {
            const postList = document.querySelector('.postsrecents');
            data.forEach(post => {
                const h2Element = document.createElement('h2');
                h2Element.textContent = post.title;
                h2Element.classList.add('items-news');
                h2Element.dataset.postId = post.id; 
                h2Element.addEventListener('click', function () {
                    displayPostDetails(post);
                });
                postList.appendChild(h2Element);
            });
        })
        .catch(error => {
            console.error('Error fetching post data:', error);
        });

    // Quando clicar na noticia ele exibe no post principal tudo
    function displayPostDetails(post) {
        const titlePost = document.querySelector('.titlePost');
        const contentPost = document.querySelector('.contentPost');
        const postImage = document.querySelector('.postImage');
        const idPost = document.querySelector('.idPost')
        
        titlePost.textContent = post.title;
        contentPost.textContent = post.descricao;
        postImage.src = post.image;
        idPost.textContent = post.id;
    }
});

// Postagem principal
document.addEventListener("DOMContentLoaded", function () {
    fetch('http://localhost:8080/postagem')
        .then(response => response.json())
        .then(data => {
            // Ordena os dados pelo ID em ordem decrescente
            data.sort((a, b) => b.id - a.id);

            // Seleciona o primeiro post (com maior ID)
            const post = data[0];

            const descriptionPost = document.querySelector('.descriptionPost');
            descriptionPost.querySelector('.titlePost').textContent = post.title;
            descriptionPost.querySelector('.contentPost').textContent = post.descricao;
            descriptionPost.querySelector('.idPost').textContent = post.id; 
            const postImage = descriptionPost.querySelector('.postImage');
            if (post.image != null) {
                postImage.src = post.image;
            } else {
                postImage.src = './assets/imagenone.png'; // Se não tiver imagem ele carrega a padrão do site
            }
        })
        .catch(error => {
            console.error('Error fetching post data:', error);
        });
});


// Post

document.addEventListener("DOMContentLoaded", function () {
    const formNewPost = document.querySelector('.formNewPost');
    formNewPost.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.querySelector('.title').value;
        const descricao = document.querySelector('.publication').value;
        const image = document.querySelector('.image').value

        const newPost = {
            title: title,
            descricao: descricao,
            image: image

        };

        // Envie uma requisição POST para a API
        fetch('http://localhost:8080/postagem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Nova postagem criada com sucesso!');
                    document.querySelector('.title').value = '';
                    document.querySelector('.publication').value = '';
                    document.querySelector('.image').value = '';
                } else {
                    console.error('Erro ao criar nova postagem:', response.statusText);
                }
                location.reload()
            })
            .catch(error => {
                console.error('Erro ao criar nova postagem:', error);
            });
        
    });
});

// PACTH 
document.addEventListener("DOMContentLoaded", function () {
    const formEditPost = document.querySelector('#formNewPost-modal--edit'); // Seleciona o formulário de edição
    
    formEditPost.addEventListener('submit', function (event) {
        event.preventDefault();

        // Definindo o postId após 2 segundos usando setTimeout
        setTimeout(function() {
            const postIdElement = document.querySelector('.idPost'); 
            const postId = parseInt(postIdElement.textContent);
            console.log(postId)

            const title = document.querySelector('#title-modal--edit').value;
            const descricao = document.querySelector('#publication-modal--edit').value;
            const image = document.querySelector('#image-modal--edit').value;

            const updatedPost = {
                title: title,
                descricao: descricao,
                image: image
            };

            // Envie uma requisição PATCH para a API
            fetch(`http://localhost:8080/postagem/update/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Postagem atualizada com sucesso!');
                    document.querySelector('#title-modal--edit').value = '';
                    document.querySelector('#publication-modal--edit').value = '';
                    document.querySelector('#image-modal--edit').value = '';
                } else {
                    console.error('Erro ao atualizar postagem:', response.statusText);
                }
                // Recarrega a página para mostrar a postagem atualizada
                location.reload();
            })
            .catch(error => {
                console.error('Erro ao atualizar postagem:', error);
            });
        }, 1000);
    });
});
