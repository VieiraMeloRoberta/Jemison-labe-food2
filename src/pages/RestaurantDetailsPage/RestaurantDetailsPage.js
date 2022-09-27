import React, { useContext, useEffect } from "react";
import { Contents } from "../FeedPage/StyledFeedPage";
import { Container } from "../../Styled";
import { Navbar } from "../../components/Navbar/Navbar";
import { CardRestaurantDetails } from "../../components/CardRestaurantDetails/CardRestaurantDetails";
import { GlobalContext } from "../../global/GlobalContext";
import { useParams } from "react-router-dom";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { CardProductDetails } from "../../components/CardProductDetails/CardProductDetails";
import { CircularProgress } from "@mui/material";
import { TitleCard } from "../../components/CardRestaurantDetails/StyledCardRestaurantsDetails";

export function RestaurantDetailsPage() {
    useProtectedPage();
    const id = useParams();
    const { GlobalRequests, GlobalStates } = useContext(GlobalContext);
    const productList = GlobalStates.products;
    const productCondition = productList && productList.length > 0;
    const categorys =
        productList &&
        productList.map((productInformation) => {
            return productInformation.category;
        });

    const categorysNoRepeat = [...new Set(categorys)];

    useEffect(() => {
        GlobalRequests.getRestaurantDetails(id.id);
    }, []);

    return (
        <Container>
            <Navbar text="Restaurante" />

            {!productCondition ? (
                <CircularProgress
                    size={64}
                    color={"inherit"}
                    className="CircularProgress"
                />
            ) : (
                <Contents>
                    <CardRestaurantDetails />

                    {categorysNoRepeat.map((category) => {
                        const products =
                            productList &&
                            productList.filter((product) => {
                                return product.category === category;
                            });
                        return (
                            <>
                                <TitleCard>{category}</TitleCard>

                                {products &&
                                    products.map((product) => {
                                        return (
                                            <CardProductDetails
                                                key={product.id}
                                                produto={product}
                                            />
                                        );
                                    })}
                            </>
                        );
                    })}
                </Contents>
            )}
        </Container>
    );
}
