import React, { useState } from "react";
import { Modal, useColorScheme } from "react-native";
import styled from "styled-components/native";
import ClosetTitle from "../components/ClosetTitle";
import { Ionicons } from "@expo/vector-icons";

type optionType = "카테고리별" | "이러쿵저러쿵별" | "어느새이별";
const options: optionType[] = ["카테고리별", "이러쿵저러쿵별", "어느새이별"];

const Closet: React.FC = () => {
  const isDark = useColorScheme() === "dark";
  const [selectedOption, setSelectedOption] =
    useState<optionType>("카테고리별");
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const onOptionPressed = (option: optionType) => {
    // setSelectedOption(option);
    closeModal();
  };
  return (
    <Container>
      <Modal animationType="fade" transparent visible={modalVisible}>
        <ModalContainer>
          <ModalBox>
            {options.map((option, i) => (
              <ModalOption
                key={i}
                onPress={(option) => onOptionPressed(option)}
              >
                <Text>{option}</Text>
              </ModalOption>
            ))}
          </ModalBox>
          <Overlay onPress={closeModal} />
        </ModalContainer>
      </Modal>
      <ClosetTitle />
      <Sorter>
        <Text>어떻게 보여드릴까요?</Text>
        <Select onPress={showModal}>
          <SelectText>{selectedOption}</SelectText>
          <Ionicons
            name="chevron-down"
            size={18}
            color={isDark ? "white" : "black"}
          />
        </Select>
      </Sorter>
    </Container>
  );
};

const Container = styled.View`
  padding: 22px;
`;
const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Overlay = styled.Pressable`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const ModalBox = styled.View`
  z-index: 1;
  width: 300px;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 8px;
`;
const ModalOption = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
`;
const Sorter = styled.View`
  margin-top: 18px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;
const Select = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  border: solid 1px ${({ theme }) => theme.textColor};
  padding: 6px 12px;
  border-radius: 8px;
`;
const SelectText = styled.Text`
  margin-right: 8px;
  color: ${({ theme }) => theme.textColor};
`;

export default Closet;
