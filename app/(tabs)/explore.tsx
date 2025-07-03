import Form from "@/components/Form";
import MFAInput from "@/components/MFA";
import Profile from "@/components/Profile";
import { StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.sideBar}>
        <Form />
      </View>
      <View style={styles.middleSection}>
        <MFAInput />
      </View>
      <View style={styles.sideBar}>
        <Profile />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  pageContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  sideBar: {
    width: "30%",
    height: "100%",
  },
  middleSection: {
    width: "40%",
    height: "100%",
  },
});
