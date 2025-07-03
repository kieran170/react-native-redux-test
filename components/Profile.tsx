import { useAppSelector } from "@/app/hooks";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { resetOtp } from "../app/features/otp/otp";
import { resetProfile } from "../app/features/profile/profile";

const Profile = () => {
  const dispatch = useDispatch();

  const profile = useAppSelector((state) => state.profile.value);
  const isOtpCorrect = useAppSelector((state) => state.otp.value);

  const isProfileComplete =
    profile.firstName.length && profile.lastName.length && profile.age.length;

  const handleReset = () => {
    dispatch(resetOtp());
    dispatch(resetProfile());
  };

  return (
    <View style={styles.profileContainer}>
      {!isProfileComplete || !isOtpCorrect ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            opacity: 0.5,
            zIndex: 1,
          }}
        />
      ) : null}
      <View style={styles.profileHeader}>
        <Text style={styles.text}>** Header Profile **</Text>
      </View>
      <View style={styles.profileMain}>
        {isProfileComplete && isOtpCorrect ? (
          <>
            <View style={styles.formSectionItem}>
              <Text
                style={styles.text}
              >{`First name - ${profile.firstName}`}</Text>
            </View>
            <View style={styles.formSectionItem}>
              <Text
                style={styles.text}
              >{`Last name - ${profile.lastName}`}</Text>
            </View>
            <View style={styles.formSectionItem}>
              <Text style={styles.text}>{`Age - ${profile.age}`}</Text>
            </View>
            <View style={styles.formSectionItem}>
              <Text
                style={styles.text}
              >{`Did you click? - ${profile.didClick}`}</Text>
            </View>
            <View style={styles.resetButtonContainer}>
              <TouchableOpacity onPress={handleReset} style={styles.button}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>
      <View style={styles.profileFooter}>
        <Text style={styles.text}>** Footer **</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
  profileHeader: {
    height: "15%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontStyle: "italic",
  },
  profileMain: {
    height: "70%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    display: "flex",
    flexDirection: "column",
  },
  profileFooter: {
    height: "15%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formSectionItem: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "90%",
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontStyle: "italic",
  },
  resetButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
  },
});

export default Profile;
