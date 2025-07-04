import { useAppSelector } from "@/app/hooks";
import React, { createRef, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setOtp } from "../app/features/otp/otp";

const MFAInput = () => {
  const profile = useAppSelector((state) => state.profile.value);
  const isOtpCorrect = useAppSelector((state) => state.otp.value);

  const dispatch = useDispatch();

  const isProfileComplete =
    profile.firstName.length && profile.lastName.length && profile.age.length;

  const inputRefs = useRef([
    createRef<TextInput>(),
    createRef<TextInput>(),
    createRef<TextInput>(),
    createRef<TextInput>(),
    createRef<TextInput>(),
    createRef<TextInput>(),
  ]);

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpToEnter, setOtpToEnter] = useState<string[]>(["", "", ""]);
  const [error, setError] = useState<null | string>(null);
  const [generateNewOtp, setGenerateNewOtp] = useState(true);

  const handleTextChange = (text: string, index: number) => {
    setError("");
    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    setError("");
    if (key === "Backspace" && otpValues[index] === "" && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  const getRandomOTP = () => {
    const alpha = [...Array(26)].map((_, i) => String.fromCharCode(65 + i));
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const combine = [...alpha, ...numbers];

    const result = [];
    for (let i = 0; i < 6; i++) {
      result.push(combine[Math.floor(Math.random() * combine.length)]);
    }
    setOtpToEnter(result);
  };

  const handleSubmit = () => {
    const enteredOtp = otpValues.join("").toLowerCase();
    const correctOtp = otpToEnter.join("").toLowerCase();

    if (enteredOtp !== correctOtp) {
      setError("Invalid OTP. Please try again.");
    } else {
      setError("Correct OTP");
      dispatch(setOtp(true));
      setGenerateNewOtp(false);
    }
  };

  useEffect(() => {
    getRandomOTP();
  }, []);

  useEffect(() => {
    if (generateNewOtp) {
      const interval = setInterval(() => {
        getRandomOTP();
      }, 11000);

      return () => clearInterval(interval);
    }
  }, [generateNewOtp]);

  useEffect(() => {
    if (!isOtpCorrect) {
      getRandomOTP();
      setOtpValues(["", "", "", "", "", ""]);
      setGenerateNewOtp(true);
      setError(null);
    }
  }, [isOtpCorrect]);

  return (
    <View style={styles.mfaContainer}>
      {!isProfileComplete || isOtpCorrect ? (
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
      <View style={styles.mfaHeader}>
        <Text style={styles.text}>** Header OTP**</Text>
      </View>
      <View style={styles.mfaMain}>
        {isProfileComplete ? (
          <>
            <View style={styles.mfaMainSubHeader}>
              <Text style={styles.text}>Enter OTP</Text>
            </View>
            <View style={styles.otpSection}>
              <View style={styles.mfaInputSection}>
                {otpValues.map((value, index) => (
                  <TextInput
                    ref={inputRefs.current[index]}
                    maxLength={1}
                    value={value}
                    onChangeText={(text) => handleTextChange(text, index)}
                    onKeyPress={({ nativeEvent }) =>
                      handleKeyPress(nativeEvent.key, index)
                    }
                    key={`OTP_INPUT_${index}`}
                    style={styles.inputBox}
                    autoFocus={index === 0}
                  ></TextInput>
                ))}
              </View>
              <View style={styles.mfaInputSubmitSection}>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>

              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={{ marginTop: 24, color: "red" }}>{error}</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.otpContainer}>
              <Text style={styles.text}>{otpToEnter}</Text>
            </View>
          </>
        ) : null}
      </View>
      <View style={styles.mfaFooter}>
        <Text style={styles.text}>** Footer **</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mfaContainer: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    display: "flex",
    flexDirection: "column",
  },
  mfaHeader: {
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
  mfaMain: {
    display: "flex",
    flexDirection: "column",
    height: "70%",
  },
  mfaMainSubHeader: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  otpSection: {
    width: "100%",
    height: "55%",
  },
  mfaFooter: {
    height: "15%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mfaInputSection: {
    height: 100,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  mfaInputSubmitSection: {
    height: 100,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  mfaInputSubmit: {
    height: 100,
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    alignSelf: "center",
  },
  button: {
    width: 140,
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
  inputBox: {
    height: 70,
    width: 50,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    margin: 5,
    fontSize: 40,
    textAlign: "center",
    textTransform: "capitalize",
  },
  otpContainer: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default MFAInput;
