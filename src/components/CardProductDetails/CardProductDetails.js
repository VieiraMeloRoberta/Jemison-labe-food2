import React, { useState, useContext } from "react";
import {
    Box,
    SecondaryCard,
} from "../CardRestaurantDetails/StyledCardRestaurantsDetails";
import Modal from "@mui/material/Modal";
import { UseForm } from "../../hooks/useForm";
import { GlobalContext } from "../../global/GlobalContext";

export function CardProductDetails({ product }) {
    const { GlobalStates, GlobalSetStates } = useContext(GlobalContext);

    //Desestruturação das variaveis e funções dos estados: carrinho e produto
    const carrinho = GlobalStates.carrinho;
    const setCarrinho = GlobalSetStates.setCarrinho;

    const produtos = GlobalStates.produtos;
    // const listProdutos = produtos && produtos
    const setProdutos = GlobalSetStates.setProdutos;

    const productList = GlobalStates.products;

     console.log(carrinho)

    const adicionaCarrinho = (id) => {
        
        const itemNoCarrinho = carrinho.find(item => id === item.id)
        if (itemNoCarrinho) {
            setProdutos(produtos.map(item => {
                if (id === item.id) {
                    return {
                        ...item,
                        'quantity': item.quantity + parseInt(form.quantity)
                    }
                }
                return item
            }))
            setCarrinho(carrinho.map(item => {
                if (id === item.id) {
                    return {
                        ...item,
                        'quantity': item.quantity + parseInt(form.quantity)
                    }
                }
                return item
            }))
        } else {

            const itemAdicionado = productList && productList.find(item => id === item.id)
            const novosItensCarrinho = [...carrinho, { ...itemAdicionado, 'quantity': parseInt(form.quantity) }]
            setCarrinho(novosItensCarrinho)

            const novosItem = [...produtos, { id: id, 'quantity': parseInt(form.quantity) }]
            setProdutos(novosItem)
        }

        handleClose()
    }








    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const [form, handleInputChange] = UseForm({
        'quantity': ''
    });

    const limpaCampo = (e) =>{
        e.preventDefailt()
    }






    // Lógica Modal
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Lógica Form Modal
    const onChangeValue = (e) => {
        setValue(Number(e.target.value));
    }; //mudar ára uma variavel com consigamos ver o carrinho

    // Lógica adicionar produto ao carrinho

    // Lógica remover produto do carrinho

    return (
        <SecondaryCard>
            <img src={product.photoUrl} />
            <figcaption>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>
                    {product.price.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
                {produtos > 0 ? (
                    <p className="view">{produtos}</p>
                ) : (
                    <p className="null">{null}</p>
                )}

                {produtos > 0 ? (
                    <button className="btn-remove">remover</button>
                ) : (
                    <button onClick={handleOpen}>adicionar</button>
                )}
            </figcaption>

            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <Box onSubmit={limpaCampo}>
                    <h2 id="parent-modal-title">
                        Selecione a quantidade desejada
                    </h2>
                    <select
                        id="parent-modal-description"
                        name='quantity'
                        onChange={handleInputChange}>
                        <option name='quantity'>1</option>
                        <option name='quantity'>2</option>
                        <option name='quantity'>3</option>
                        <option name='quantity'>4</option>
                        <option name='quantity'>5</option>
                        <option name='quantity'>6</option>
                        <option name='quantity'>7</option>
                        <option name='quantity'>8</option>
                        <option name='quantity'>9</option>
                        <option name='quantity'>10</option>
                        
                    </select>

                    <button onClick={()=>adicionaCarrinho(product.id)}>Adicionar ao carrinho</button>
                </Box>
            </Modal>
        </SecondaryCard>
    );
}
