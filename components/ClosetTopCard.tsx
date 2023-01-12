import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Avatar, Card, Button } from "react-native-paper";

const TopCard = () => {
  const LeftContent = (props: { size: number }) => (
    <Avatar.Icon {...props} icon="tshirt-crew" />
  );
  return (
    <Card style={style.card}>
      <Card.Title
        title="정형진님의 옷장"
        subtitle="옷장 설정을 수정할 수 있어요."
        left={LeftContent}
      />
      <Card.Actions>
        <TouchableOpacity>
          <Button mode="contained">관리</Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button mode="outlined">닫기</Button>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const style = StyleSheet.create({
  card: {
    margin: 16,
  },
});

export default TopCard;
