import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import React from "react";

const Home: React.FC = () => {
  return (
    <Box bg="muted.800" m="4" py="4" px="3" borderRadius="5" rounded="md">
      <HStack justifyContent="space-between">
        <Box justifyContent="space-between">
          <VStack space="2">
            <Text fontSize="sm" color="white">
              Today @ 9PM
            </Text>
            <Text color="white" fontSize="xl">
              Let's talk about avatar!
            </Text>
          </VStack>
          <Pressable alignSelf="flex-start">
            {({ isPressed }) => {
              return (
                <Box
                  px="4"
                  py="1"
                  rounded="md"
                  bgColor={isPressed ? "amber.100" : "muted.400"}
                >
                  <Text
                    textTransform="uppercase"
                    fontSize="sm"
                    fontWeight="bold"
                    color={isPressed ? "amber.400" : "white"}
                  >
                    Remind me
                  </Text>
                </Box>
              );
            }}
          </Pressable>
        </Box>
        <Image
          source={{
            uri: "https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg",
          }}
          alt="Aang flying and surrounded by clouds"
          height="100"
          rounded="full"
          width="100"
        />
      </HStack>
    </Box>
  );
};

export default Home;
