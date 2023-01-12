import React, { useState } from "react";
import ClosetTitle from "../components/ClosetTitle";
import {
  Box,
  Button,
  CheckCircleIcon,
  ChevronDownIcon,
  HStack,
  Pressable,
  Select,
  Text,
  VStack,
} from "native-base";

type optionType = "카테고리별" | "이러쿵저러쿵별" | "어느새이별";
const options: optionType[] = ["카테고리별", "이러쿵저러쿵별", "어느새이별"];

const Closet: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("카테고리별");
  return (
    <VStack space="4" p="4">
      <ClosetTitle />
      <HStack alignItems="center" px="4" justifyContent="space-between">
        <Text color="muted.900">어떻게 보여드릴까요?</Text>
        <Box minW="150">
          <Select
            selectedValue={selectedValue}
            minWidth="150"
            accessibilityLabel="정렬 선택"
            placeholder="정렬 기준 선택"
            dropdownIcon={<ChevronDownIcon size="3" mr="2" />}
            _selectedItem={{
              bg: "muted.200",
              endIcon: <CheckCircleIcon size="4" mt="1" />,
            }}
            mt={1}
            onValueChange={(option) => setSelectedValue(option)}
          >
            {options.map((option, i) => (
              <Select.Item key={i} label={option} value={option} />
            ))}
          </Select>
        </Box>
      </HStack>
      <Box
        borderColor="muted.900"
        borderStyle="dashed"
        borderRadius="lg"
        // borderWidth="2"
        minH="2/3"
        justifyContent="center"
        alignItems="center"
      >
        <VStack></VStack>
      </Box>
      <Pressable>
        {({ isPressed }) => {
          return (
            <Box
              p="3"
              opacity={isPressed ? "0.8" : "1"}
              bgColor="muted.900"
              alignItems="center"
              borderRadius="md"
            >
              <Text fontWeight="bold" color="white">
                옷장에 옷 넣기
              </Text>
            </Box>
          );
        }}
      </Pressable>
    </VStack>
  );
};

export default Closet;
