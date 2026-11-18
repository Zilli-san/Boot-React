package org.zerock.mallapi.repository;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.mallapi.dto.CartItemListDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class CartRepositoryTests {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Test
    public void testListOfMember() {

        String email = "user1@aaa.com";

        List<CartItemListDTO> cartItemList = cartItemRepository.getItemsOfCartDTOByEmail(email);

        for (CartItemListDTO dto : cartItemList) {
            log.info(dto);
        }
    }
}