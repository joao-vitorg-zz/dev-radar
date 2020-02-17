# 🖥️ Backend

## 💿 Instalação e execução

Para configurar a **PORTA** do servidor ou o **PATH** do MongoDB, basta alterar o arquivo **.env**.

```bash
yarn
yarn start
```

### ou

```bash
npm
npm start
```

## 🛠️ Rotas

### Index

Para listar todos os Devs do banco de dados, basta mandar uma requisição **GET** para o servidor que ele retornara a listagem.

```javascript
api.get('/dev');
```

### Store

Para cadastrar um Dev, basta mandar uma requisição **POST** para o servidor com as informações do usuário (**login**, **techs**, **latitude** e **longitude**).

```javascript
api.post('/dev', {
 <login>,
 <techs>,
 <latitude>,
 <longitude>
});
```

### Update

Para editar um Dev do banco de dados, basta mandar uma requisição **PUT** para o servidor com o **id** e os dados do usuário a ser editado (**techs**, **latitude** e/ou **longitude**).

```javascript
api.put('/dev/<id>', {
 <techs>,
 <latitude>,
 <longitude>
 }
});
```

### Destroy

Para deletar um Dev do banco de dados, basta mandar uma requisição **DELETE** para o servidor com o **id** do usuário.

```javascript
api.delete('dev/<id>');
```
