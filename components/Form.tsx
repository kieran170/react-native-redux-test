import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { setProfile } from "../app/features/profile/profile";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Form = () => {
  const profile = useAppSelector((state) => state.profile.value);
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    didClick: false,
  });

  const isProfileComplete =
    profile.firstName.length && profile.lastName.length && profile.age.length;

  const [error, setError] = useState<null | string>(null);

  const submitData = () => {
    const isValid =
      data.firstName.length && data.lastName.length && data.age.length;

    if (isValid) {
      dispatch(setProfile(data));
    } else {
      setError("Nope!");
    }
  };

  const handleTextInput = (
    field: "firstName" | "lastName" | "age",
    value: string
  ) => {
    setError(null);

    setData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!isProfileComplete) {
      setData({
        firstName: "",
        lastName: "",
        age: "",
        didClick: false,
      });
    }
  }, [isProfileComplete]);

  return (
    <View style={styles.formContainer}>
      {isProfileComplete ? (
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
      <View style={styles.formHeader}>
        <Text style={styles.text}>** Header Form **</Text>
      </View>
      <View style={styles.formMain}>
        <View style={styles.formSectionItem}>
          <Text style={styles.text}>First name</Text>
          <TextInput
            value={data.firstName}
            onChangeText={(string) => handleTextInput("firstName", string)}
            id="firstName"
            style={styles.inputBox}
          />
        </View>
        <View style={styles.formSectionItem}>
          <Text style={styles.text}>Last name</Text>
          <TextInput
            value={data.lastName}
            onChangeText={(string) => handleTextInput("lastName", string)}
            id="lastName"
            style={styles.inputBox}
          />
        </View>
        <View style={styles.formSectionItem}>
          <Text style={styles.text}>Age</Text>
          <TextInput
            value={data.age}
            onChangeText={(string) => handleTextInput("age", string)}
            id="age"
            style={styles.inputBox}
          />
        </View>
        <View style={styles.formSectionItem}>
          <Text style={styles.text}>Will you click?</Text>
          <TouchableOpacity
            onPress={() => {
              setError(null);
              setData((prev) => ({ ...prev, didClick: !prev.didClick }));
            }}
            style={
              data.didClick
                ? [styles.button, { backgroundColor: "orange" }]
                : styles.button
            }
          >
            <Text style={styles.buttonText}>
              {data.didClick ? "Clicked" : "Click me"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchButtonContainer}>
          {error ? <Text style={{ paddingBottom: 20 }}>{error}</Text> : null}
          <TouchableOpacity
            onPress={submitData}
            style={[styles.button, { width: "90%" }]}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.formFooter}>
        <Text style={styles.text}>** Footer **</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
  formHeader: {
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
  formMain: {
    height: "70%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    display: "flex",
    flexDirection: "column",
  },
  formFooter: {
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
  inputBox: {
    borderColor: "black",
    width: "30%",
    borderWidth: 1,
    height: 30,
    alignItems: "flex-end",
  },
  button: {
    width: "30%",
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
  searchButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
  },
});

export default Form;
